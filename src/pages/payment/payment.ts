import { Component, Inject } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController, ToastController, App } from 'ionic-angular';
import { PlacedPage } from '../placed/placed';
import { PaymentGateway } from "../../models/payment-gateway.models";
import { Constants } from "../../models/constants.models";

import { WordpressClient } from '../../providers/wordpress-client.service';
import { Global } from '../../providers/global';
import { Subscription } from "rxjs/Subscription";
import { CartItem } from "../../models/cart-item.models";
import { OrderRequest } from "../../models/order-request.models";
import { Address } from "../../models/address.models";
import { ShippingLine } from "../../models/shipping-line.models";
import { UserResponse } from "../../models/user-response.models";
import { OrderResponse } from "../../models/order-response.models";
import { Currency } from "../../models/currency.models";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { OrderUpdateRequest } from '../../models/order-update-request.models';
import { Coupon } from '../../models/coupon.models';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';
import { sha512 } from 'js-sha512';

@Component({
	selector: 'page-payment ',
	templateUrl: 'payment.html',
	providers: [WordpressClient]
})

export class PaymentPage {
	private loading: Loading;
	private loadingShown: Boolean = false;
	private placedPagePushed: Boolean = false;
	private paymentDone: Boolean = false;
	private paymentFailAlerted: Boolean = false;

	private subscriptions: Array<Subscription> = [];
	private paymentGateways = new Array<PaymentGateway>();
	private cartItems: Array<CartItem>;
	private selectedPaymentGateway;
	private selectedAddress: Address;
	private orderRequest: OrderRequest;
	private orderResponse: OrderResponse;
	private user: UserResponse;
	private totalItems = 0;
	private total = 0;
	private couponApplied = false;

	constructor(@Inject(APP_CONFIG) private config: AppConfig, public translate: TranslateService, private iab: InAppBrowser, private toastCtrl: ToastController, public navCtrl: NavController, private navParams: NavParams, private service: WordpressClient, private loadingCtrl: LoadingController, private alertCtrl: AlertController, public appCtrl: App) {
		this.cartItems = this.navParams.get('cart');
		this.totalItems = this.navParams.get('totalItems');
		this.total = this.navParams.get('total');
		let paymentGateways = JSON.parse(window.localStorage.getItem(Constants.PAYMENT_GATEWAYS));
		this.selectedAddress = JSON.parse(window.localStorage.getItem(Constants.SELECTED_ADDRESS));
		if (paymentGateways) {
			console.log(paymentGateways);
			for (let pg of paymentGateways) {
				if (pg.enabled && this.paymentImplemented(String(pg.id))) {
					this.paymentGateways.push(pg);
				}
			}
		}
	}

	ionViewWillLeave() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
		this.dismissLoading();
	}

	paymentImplemented(id) {
		return id == "pumcp" || id == "payuindia" || id == "cod";
	}

	paymentMethod(paymentGateway) {
		this.selectedPaymentGateway = paymentGateway;
	}

	placedPage() {
		if (this.selectedPaymentGateway == null) {
			this.translate.get('field_error_payment_method').subscribe(value => {
				this.showToast(value);
			});
		} else {
			this.orderRequest = new OrderRequest();
			this.orderRequest.payment_method = this.selectedPaymentGateway.id;
			this.orderRequest.payment_method_title = this.selectedPaymentGateway.title;
			this.orderRequest.set_paid = false;
			this.orderRequest.status = 'processing';
			this.orderRequest.billing = this.selectedAddress;
			this.orderRequest.shipping = this.selectedAddress;
			this.user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
			this.orderRequest.customer_id = String(this.user.id);
			this.orderRequest.line_items = this.cartItems;
			for (let item of this.orderRequest.line_items) {
				item.product = null;
			}

			this.translate.get('order_creating').subscribe(value => {
				this.presentLoading(value);
			});
			let subscription: Subscription = this.service.createOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), this.orderRequest).subscribe(data => {
				this.orderResponse = data;
				let coupon: Coupon = JSON.parse(window.localStorage.getItem(Constants.SELECTED_COUPON));
				if (coupon) {
					let couponSubs: Subscription = this.service.applyCouponCode(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.orderResponse.id), coupon.code).subscribe(data => {
						this.couponApplied = true;
						window.localStorage.removeItem(Constants.SELECTED_COUPON);
						this.translate.get('confirm_order_coupon_applied').subscribe(value => {
							this.showToast(value);
						});
						this.orderPlaced();
					}, err => {
						console.log(err);
						this.dismissLoading();
					});
					this.subscriptions.push(couponSubs);
				} else {
					this.orderPlaced();
				}
			}, err => {
				this.dismissLoading();
				this.translate.get('order_failed').subscribe(value => {
					this.showToast(value);
				});
				this.appCtrl.getRootNav().setRoot(HomePage);
			});
			this.subscriptions.push(subscription);
		}
	}

	orderPlaced() {
		this.dismissLoading();
		if (this.selectedPaymentGateway.id === "pumcp" || this.selectedPaymentGateway.id === "payuindia") {
			this.initPayUMoney();
		} else if (this.selectedPaymentGateway.id === "cod") {
			this.clearCart();
			this.navCtrl.setRoot(PlacedPage);
		} else {
			this.translate.get('order_placed_cod').subscribe(value => {
				this.showToast(value);
			});
			this.clearCart();
			this.navCtrl.setRoot(PlacedPage);
		}
	}

	initPayUMoney() {
		let name = this.user.first_name && this.user.first_name.length ? this.user.first_name : this.user.username;
		let mobile = this.user.username;
		let email = this.user.email;
		let bookingId = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(this.orderResponse.id);
		let productinfo = this.orderResponse.order_key;
		let salt = this.config.payuSalt;
		let key = this.config.payuKey;
		let amt = this.couponApplied ? this.total : this.totalItems;
		let string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
		let encrypttext = sha512(string);

		let url = "payumoney/payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&hash=" + encrypttext + "&salt=" + salt + "&key=" + key;

		let options: InAppBrowserOptions = {
			location: 'yes',
			clearcache: 'yes',
			zoom: 'yes',
			toolbar: 'no',
			closebuttoncaption: 'back'
		};
		const browser: any = this.iab.create(url, '_blank', options);
		browser.on('loadstop').subscribe(event => {
			browser.executeScript({
				file: "payumoney/payumoneyPaymentGateway.js"
			});

			if (event.url == "http://localhost/success.php") {
				this.paymentSuccess();
				browser.close();
			}
			if (event.url == "http://localhost/failure.php") {
				this.paymentFailure();
				browser.close();
			}
		});
		browser.on('exit').subscribe(event => {
			if (!this.paymentDone && !this.paymentFailAlerted) {
				this.paymentFailure();
			}
		});
		browser.on('loaderror').subscribe(event => {
			this.translate.get('something_went_wrong').subscribe(value => {
				this.showToast(value);
			});
		});
	}

	paymentFailure() {
		this.paymentFailAlerted = true;
		let subscription: Subscription = this.service.updateOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.orderResponse.id), new OrderUpdateRequest('cancelled')).subscribe(data => {
		}, err => {
			console.log(err);
		});
		this.subscriptions.push(subscription);


		this.translate.get(['payment_fail_title', 'payment_fail_message', 'ok']).subscribe(res => {
			let alert = this.alertCtrl.create({
				title: res.payment_fail_title,
				message: res.payment_fail_message,
				buttons: [{
					text: res.ok,
					role: 'cancel',
					handler: () => {
						this.done();
						console.log('Okay clicked');
					}
				}]
			});
			alert.present();
		});
	}

	paymentSuccess() {
		this.paymentDone = true;
		this.clearCart();
		this.translate.get('just_a_moment').subscribe(value => {
			this.presentLoading(value);
		});
		let subscription: Subscription = this.service.updateOrder(window.localStorage.getItem(Constants.ADMIN_API_KEY), String(this.orderResponse.id), { set_paid: true }).subscribe(data => {
			this.done();
		}, err => {
			this.done();
			this.paymentSuccess();
			console.log(err);
		});
		this.subscriptions.push(subscription);
	}

	done() {
		if (!this.placedPagePushed) {
			this.placedPagePushed = true;
			this.dismissLoading();
			this.appCtrl.getRootNav().setRoot(this.paymentFailAlerted ? HomePage : PlacedPage);
		}
	}

	private presentLoading(message: string) {
		this.loading = this.loadingCtrl.create({
			content: message
		});

		this.loading.onDidDismiss(() => { });

		this.loading.present();
		this.loadingShown = true;
	}

	private dismissLoading() {
		if (this.loadingShown) {
			this.loadingShown = false;
			this.loading.dismiss();
		}
	}

	private presentErrorAlert(msg: string) {
		let alert = this.alertCtrl.create({
			title: 'Error',
			subTitle: msg,
			buttons: ['Dismiss']
		});
		alert.present();
	}

	showToast(message: string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'bottom'
		});
		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});
		toast.present();
	}

	clearCart() {
		let cartItems = new Array<CartItem>();
		window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}
}