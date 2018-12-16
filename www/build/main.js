webpackJsonp([0],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.ADMIN_API_KEY = 'AdminApiKey';
    Constants.USER_API_KEY = 'UserApiKey';
    Constants.USER_KEY = 'UserKey';
    Constants.PRODUCT_CATEGORIES = 'ProductCategories';
    Constants.PRODUCT_CATEGORIES_PARENT = 'ProductCategoriesParent';
    Constants.PAYMENT_GATEWAYS = 'PaymentGateways';
    Constants.SHIPPING_LINES = 'ShippingLines';
    Constants.SELECTED_ADDRESS = 'SelectedAddress';
    Constants.SELECTED_COUPON = 'SelectedCoupon';
    Constants.SELECTED_ADDRESS_LIST = 'AddressList';
    Constants.TEMP_OPEN = 'TempOpen';
    Constants.TEMP_OPEN_CART = 'TempOpenCart';
    Constants.TEMP_OPEN_PRODUCT = 'TempOpenProduct';
    Constants.CURRENCY = 'Currency';
    Constants.ONESIGNAL_PLAYER_ID = 'OneSignalPlayerID';
    Constants.ONESIGNAL_PLAYER_ID_REGISTERED = 'OneSignalPlayerIDRegistered';
    return Constants;
}());

//# sourceMappingURL=constants.models.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shirts_shirts__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_wordpress_client_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CategoryPage = /** @class */ (function () {
    function CategoryPage(translate, navCtrl, toastCtrl, service, modalCtrl) {
        var _this = this;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.categoriesAllNew = new Array();
        this.subscriptions = [];
        this.pageCategory = 1;
        var categoriesAll = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES));
        this.firstTime = categoriesAll == null;
        this.setupCategories(categoriesAll);
        this.translate.get('refreshing').subscribe(function (value) {
            _this.showToast(value);
        });
        this.refreshCategories();
    }
    CategoryPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    CategoryPage.prototype.refreshCategories = function () {
        var _this = this;
        var subscription = this.service.categories(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.pageCategory)).subscribe(function (data) {
            var categories = data;
            if (categories.length == 0) {
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES, JSON.stringify(_this.categoriesAllNew));
                console.log('categories setup success');
                _this.setupCategories(_this.categoriesAllNew);
            }
            else {
                _this.categoriesAllNew = _this.categoriesAllNew.concat(categories);
                if (_this.firstTime) {
                    _this.setupCategories(_this.categoriesAllNew);
                }
                _this.pageCategory++;
                _this.refreshCategories();
            }
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    CategoryPage.prototype.setupCategories = function (savedCats) {
        if (savedCats && savedCats.length) {
            this.categoriesAll = new Array();
            var parentWithChild = void 0;
            for (var _i = 0, savedCats_1 = savedCats; _i < savedCats_1.length; _i++) {
                var catP = savedCats_1[_i];
                if (Number(catP.parent) == 0) {
                    parentWithChild = new Array();
                    for (var _a = 0, savedCats_2 = savedCats; _a < savedCats_2.length; _a++) {
                        var catC = savedCats_2[_a];
                        if (Number(catP.id) == Number(catC.parent)) {
                            parentWithChild.push(catC);
                        }
                    }
                    if (parentWithChild.length == 0) {
                        continue;
                    }
                    parentWithChild.unshift(catP);
                    this.categoriesAll.push(parentWithChild);
                }
            }
            this.catsToShow = this.categoriesAll[0];
        }
    };
    CategoryPage.prototype.showCats = function (cats) {
        this.catsToShow = cats;
        // document.documentElement.scrollTop = 0;
        window.scroll(0, 0);
    };
    CategoryPage.prototype.shirtsPage = function (cat) {
        if (cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
    };
    CategoryPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    CategoryPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    CategoryPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-category ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\category\category.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>{{ \'home_cat_title\' | translate }}\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="bg-light">\n\n    <div class="all-products">\n\n        <div class="tabs-contant">\n\n            <ion-segment *ngFor="let cats of categoriesAll">\n\n                <ion-segment-button [ngClass]="(cats[0].id == catsToShow[0].id) ? \'active\' : \'blank_class\'" [innerHTML]="cats[0].name"\n\n                    (click)="showCats(cats)">\n\n                </ion-segment-button>\n\n            </ion-segment>\n\n        </div>\n\n        <div class="all-items">\n\n            <ion-list>\n\n                <ion-item *ngFor="let cat of catsToShow">\n\n                    <p class="" *ngIf="cat.parent != 0" (click)="shirtsPage(cat)">\n\n                        <span [innerHTML]="cat.name"></span>\n\n                        <ion-icon name="ios-arrow-forward-outline" text-right class="icon"></ion-icon>\n\n                    </p>\n\n                </ion-item>\n\n            </ion-list>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\category\category.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_order_update_request_models__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__itemdetail_itemdetail__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Myorder_2Page = /** @class */ (function () {
    function Myorder_2Page(translate, modalCtrl, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        var _this = this;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.orders = new Array();
        this.pageNo = 1;
        this.currencyIcon = '';
        this.currencyText = '';
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
        this.loadMyOrders();
        this.translate.get('loading_orders').subscribe(function (value) {
            _this.showToast(value);
        });
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
        }
    }
    Myorder_2Page.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    Myorder_2Page.prototype.loadMyOrders = function () {
        var _this = this;
        var subscription = this.service.myOrders(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var order = data_1[_i];
                for (var _a = 0, _b = order.line_items; _a < _b.length; _a++) {
                    var line = _b[_a];
                    line.price_html = _this.currencyIcon + ' ' + line.price;
                }
            }
            _this.dismissLoading();
            _this.orders = data;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.itemdetailPage = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro_id: item.product_id });
    };
    Myorder_2Page.prototype.cancelOrder = function (order) {
        var _this = this;
        this.translate.get('order_cancelling').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(order.id), new __WEBPACK_IMPORTED_MODULE_4__models_order_update_request_models__["a" /* OrderUpdateRequest */]('cancelled')).subscribe(function (data) {
            var orderRes = data;
            order.status = 'cancelled';
            /* for(let o of this.orders) {
                console.log(String(o.id) == String(orderRes.id));
                if(o.id == orderRes.id) {
                    o = orderRes;
                    console.log('here');
                    this.orders = this.orders;
                    break;
                }
            } */
            _this.dismissLoading();
            _this.showToast('Order cancelled');
        }, function (err) {
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.pageNo++;
        var subscription = this.service.myOrders(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), String(this.pageNo)).subscribe(function (data) {
            var orders = data;
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var order = data_2[_i];
                for (var _a = 0, _b = order.line_items; _a < _b.length; _a++) {
                    var line = _b[_a];
                    line.price_html = _this.currencyIcon + ' ' + line.price;
                }
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    Myorder_2Page.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    Myorder_2Page.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    Myorder_2Page.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    Myorder_2Page.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Myorder_2Page.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    Myorder_2Page.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    Myorder_2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myorder_2 ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\myorder_2\myorder_2.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>{{ \'nav_title_my_order\' | translate }}\n\n            <!-- <span float-right>\n\n                <ion-icon padding-right name="ios-search-outline" class="icon" (click)="searchPage()"></ion-icon>\n\n                <ion-icon name="ios-cart-outline" class="icon" (click)="cartPage()"></ion-icon>\n\n            </span> -->\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-list>\n\n        <ion-card *ngFor="let order of orders">\n\n            <ion-card-content>\n\n                <ion-row *ngFor="let item of order.line_items">\n\n                    <ion-col>\n\n                        <h4 (click)="itemdetailPage(item)">{{item.name}}</h4>\n\n                        <div class="card-btn" float-right>\n\n                            <small *ngIf="order.status == \'on-hold\' || order.status == \'pending\'|| order.status == \'processing\'" class="text-sky" (click)="cancelOrder(order)">Cancel order</small>\n\n                            <small class="text-green">{{order.status}}</small>\n\n                        </div>\n\n                        <div class="rate">\n\n                            <p class="text-light" style="display:flex;">{{ \'order_date_on\' | translate }} {{order.date_created}}\n\n                                <strong class="price text-sky" style="margin-left:auto;"\n\n                                    [innerHTML]="item.price_html"></strong>\n\n                            </p>\n\n\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </ion-list>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\myorder_2\myorder_2.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], Myorder_2Page);
    return Myorder_2Page;
}());

//# sourceMappingURL=myorder_2.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PasswordPage = /** @class */ (function () {
    function PasswordPage(translate, toastCtrl, navCtrl, service, loadingCtrl) {
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
    }
    PasswordPage.prototype.resetPassword = function () {
        var _this = this;
        if (this.userLogin && this.userLogin.length) {
            this.translate.get('loading_password_reset').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.resetPassword(this.userLogin).subscribe(function (data) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            });
            this.subscriptions.push(subscription);
        }
        else {
            this.translate.get('field_error_valid_username').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    PasswordPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PasswordPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PasswordPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-password ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\password\password.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>{{ \'password_forgot\' | translate }}\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center>{{ \'password_forgot_heading\' | translate }}</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-input type="text" text-right placeholder="{{ \'placeholder_forgot_email\' | translate }}" [(ngModel)]="userLogin"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="resetPassword()">{{ \'submit\' | translate }}</button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\password\password.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], PasswordPage);
    return PasswordPage;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_auth_credential_models__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var OtpPage = /** @class */ (function () {
    function OtpPage(params, alertCtrl, loadingCtrl, toastCtrl, navCtrl, firebase, platform, service, events) {
        this.params = params;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.firebase = firebase;
        this.platform = platform;
        this.service = service;
        this.events = events;
        this.loadingShown = false;
        this.captchanotvarified = true;
        this.buttonDisabled = true;
        this.otp = '';
        this.captchaVerified = false;
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;
        this.intervalCalled = false;
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_7__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '');
        this.subscriptions = [];
        this.resendCode = false;
        this.otpNotSent = true;
        console.log('UserId is  ', params.get('userId'));
        console.log('Dial Code code is  ', params.get('dialCode'));
        // this.platform.registerBackButtonAction(() => {
        //   this.makeExitAlert();
        //   //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. 
        //   //just breathe, and have faith that everything will work out for the best.
        // },1);
    }
    OtpPage.prototype.ionViewDidLoad = function () {
        this.dialCode = this.params.get('dialCode');
        this.registerRequest = JSON.parse(window.localStorage.getItem('userCreateData'));
        console.log("Previous data is:--", JSON.stringify(this.registerRequest));
        if (!(this.platform.is('cordova'))) {
            this.makeCaptcha();
        }
        console.log("Country code is ", this.dialCode);
        console.log("Phone no. is " + this.registerRequest.username);
        this.sendOTP();
    };
    OtpPage.prototype.sendOTP = function () {
        this.resendCode = false;
        this.otpNotSent = true;
        var phoneNumberString = "+" + this.dialCode + this.registerRequest.username;
        console.log("phone no. is " + this.registerRequest.username);
        if (this.platform.is('cordova')) {
            this.sendOtpPhone(phoneNumberString);
        }
        else {
            this.sendOtpBrowser(phoneNumberString);
        }
        if (this.intervalCalled) {
            clearInterval(this.timer);
        }
    };
    OtpPage.prototype.createTimer = function () {
        this.intervalCalled = true;
        this.totalSeconds--;
        if (this.totalSeconds == 0) {
            this.otpNotSent = true;
            this.resendCode = true;
            clearInterval(this.timer);
        }
        else {
            this.seconds = (this.totalSeconds % 60);
            if (this.totalSeconds >= this.seconds) {
                this.minutes = (this.totalSeconds - this.seconds) / 60;
            }
            else {
                this.minutes = 0;
            }
        }
    };
    OtpPage.prototype.createInterval = function () {
        var _this = this;
        this.totalSeconds = 120;
        this.createTimer();
        this.timer = setInterval(function () {
            _this.createTimer();
        }, 1000);
    };
    OtpPage.prototype.sendOtpPhone = function (phone) {
        var _this = this;
        this.presentLoading("Sending OTP by SMS");
        console.log("In cordova");
        this.firebase.verifyPhoneNumber(phone, 60)
            .then(function (credential) {
            console.log("credentials:-----");
            console.log(JSON.stringify(credential));
            _this.verfificationId = credential.verificationId;
            _this.showToast("OTP sent on your mobile");
            _this.otpNotSent = false;
            _this.dismissLoading();
            _this.createInterval();
        }).catch(function (error) {
            _this.otpNotSent = true;
            _this.resendCode = true;
            _this.dismissLoading();
            if (error.message) {
                _this.showToast(error.message);
            }
            else {
                _this.showToast("SMS not sent");
            }
        });
    };
    OtpPage.prototype.sendOtpBrowser = function (phone) {
        this.dismissLoading();
        var component = this;
        component.presentLoading("Sending OTP by SMS");
        console.log("In not cordova");
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signInWithPhoneNumber(phone, this.recaptchaVerifier)
            .then(function (confirmationResult) {
            component.otpNotSent = false;
            component.result = confirmationResult;
            component.dismissLoading();
            component.showToast("OTP sent on your mobile");
            if (component.intervalCalled) {
                clearInterval(component.timer);
            }
            component.createInterval();
        })
            .catch(function (error) {
            component.resendCode = true;
            component.dismissLoading();
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.showToast("SMS not sent");
            }
            console.log("SMS not sent " + JSON.stringify(error));
        });
    };
    OtpPage.prototype.verify = function () {
        this.otpNotSent = true;
        if (this.platform.is('cordova')) {
            this.verifyOtpPhone();
        }
        else {
            this.verifyOtpBrowser();
        }
    };
    OtpPage.prototype.verifyOtpPhone = function () {
        var _this = this;
        console.log("Verifying phone in cordova");
        var credential = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth.PhoneAuthProvider.credential(this.verfificationId, this.otp);
        console.log("Fetched the credential");
        this.presentLoading("Verifying OTP by SMS");
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signInAndRetrieveDataWithCredential(credential)
            .then(function (info) {
            console.log(JSON.stringify(info));
            _this.dismissLoading();
            _this.showToast("OTP verified");
            _this.signIn();
        }, function (error) {
            if (error.message) {
                _this.showToast(error.message);
            }
            else {
                _this.showToast("Wrong OTP");
            }
            _this.dismissLoading();
            console.log(JSON.stringify(error));
        });
    };
    OtpPage.prototype.verifyOtpBrowser = function () {
        var component = this;
        console.log("Confimation result:---" + JSON.stringify(component.result));
        component.presentLoading("Verifying OTP by SMS");
        this.result.confirm(this.otp)
            .then(function (response) {
            component.dismissLoading();
            component.showToast("OTP verified");
            component.signIn();
        }).catch(function (error) {
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.showToast("Wrong OTP");
            }
            component.dismissLoading();
        });
    };
    OtpPage.prototype.makeCaptcha = function () {
        var component = this;
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth.RecaptchaVerifier('recaptcha-container', {
            // 'size': 'normal',
            'size': 'invisible',
            'callback': function (response) {
                component.captchanotvarified = true;
                console.log("captchanotvarified:--" + component.captchanotvarified);
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
        this.recaptchaVerifier.render();
    };
    OtpPage.prototype.signIn = function () {
        var _this = this;
        console.log("User id ", this.params.get("userId"));
        console.log("username is ", this.registerRequest.username);
        console.log("Password is ", this.registerRequest.password);
        this.presentLoading("Please wait . . .");
        var credentials = new __WEBPACK_IMPORTED_MODULE_8__models_auth_credential_models__["a" /* AuthCredential */](this.registerRequest.username, this.registerRequest.password);
        var subscription = this.service.getAuthToken(credentials)
            .subscribe(function (data) {
            var authResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
            _this.getUser(_this.params.get("userId"));
        }, function (err) {
            _this.dismissLoading();
            _this.presentErrorAlert("Unable to login with provided credentials");
        });
        this.subscriptions.push(subscription);
    };
    OtpPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId)
            .subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            window.localStorage.removeItem("userCreateData");
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login');
        }, function (err) {
            _this.dismissLoading();
            _this.presentErrorAlert("Unable to login with provided credentials");
        });
        this.subscriptions.push(subscription);
    };
    OtpPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    OtpPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    OtpPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    OtpPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    OtpPage.prototype.makeExitAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Close App',
                    handler: function () {
                        _this.platform.exitApp(); // Close this application
                    }
                }]
        });
        alert.present();
    };
    OtpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-otp ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\otp\otp.html"*/'<ion-header>\n\n  <ion-navbar>\n\n      <ion-title text-center>Verification</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="form" padding-left padding-right>\n\n    <div id="recaptcha-container"></div>\n\n    <p text-center>Please enter your verification code <br/>sent on +{{dialCode}} {{registerRequest.username}}</p>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label>OTP</ion-label>\n\n        <ion-input type="number" text-right placeholder="Please enter your otp" [(ngModel)]="otp"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n    <button ion-button full class="bg-thime btn-round btn-text"  (click)="verify()" [disabled]="otpNotSent || otp==\'\'">\n\n      Verify       \n\n    </button>\n\n    <ion-item no-lines no-margin no-padding>\n\n      <button ion-button (click)="sendOTP()" clear  item-start (click)="sendOTP()" [disabled]="!resendCode"> Resend </button>\n\n      <ion-note item-end>\n\n        <ng-container *ngIf="minutes==0; else minuteTemplate">\n\n          00\n\n        </ng-container>\n\n        <ng-template #minuteTemplate>\n\n          {{minutes}}\n\n        </ng-template>:\n\n        <ng-container *ngIf="seconds==0; else secondTemplate">\n\n          00\n\n        </ng-container>\n\n        <ng-template #secondTemplate>\n\n          {{seconds}}\n\n        </ng-template> min left</ion-note>\n\n    </ion-item>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\otp\otp.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_0__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]])
    ], OtpPage);
    return OtpPage;
}());

//# sourceMappingURL=otp.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var WordpressClient = /** @class */ (function () {
    function WordpressClient(config, http) {
        this.config = config;
        this.http = http;
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
    WordpressClient.prototype.getFaqs = function () {
        return this.http
            .get('./assets/json/faq.json')
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getCountries = function () {
        // return this.http
        // .get<Array<Country>>('https://restcountries.eu/rest/v2/all')
        return this.http
            .get('./assets/json/countries.json')
            .concatMap(function (data) {
            var indiaObj = {};
            for (var index = 0; index < data.length; index++) {
                if (!(data[index].callingCodes.length) || data[index].callingCodes[0] == "") {
                    data.splice(index, 1);
                }
                if (data[index].alpha2Code === "IN") {
                    indiaObj = data[index];
                    data.splice(index, 1);
                }
            }
            data.splice(0, 0, indiaObj);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.checkToken = function (adminToken, idToken) {
        var data = this.convertToParams({ token: idToken });
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({
                'Content-Type': 'application/json',
                // 'Content-Type':  'application/x-www-form-urlencoded',
                'Authorization': adminToken
            })
        };
        var token = this.http.post(this.config.apiBase + 'mobile-ecommerce/v1/jwt/token/firebase', { token: idToken }, httpOptions);
        return token.concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getUser = function (adminToken, userId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/customers/' + userId, { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.updateUser = function (adminToken, userId, userUpdateRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .put(this.config.apiBase + 'wc/v2/customers/' + userId, JSON.stringify(userUpdateRequest), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createUser = function (adminToken, credentials) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .post(this.config.apiBase + 'wp/v2/users', JSON.stringify(credentials), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getAuthToken = function (credentials) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.config.apiBase + 'mobile-ecommerce/v1/jwt/token', JSON.stringify(credentials), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.resetPassword = function (userName) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' });
        return this.http
            .post(this.config.apiBase + 'mobile-ecommerce/v1/password/forgot', JSON.stringify({ user_login: userName }), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.createOrder = function (adminToken, createOrder) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .post(this.config.apiBase + 'wc/v2/orders/', JSON.stringify(createOrder), { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.myOrders = function (adminToken, customer_id, pageNo) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/orders/' + '?customer=' + customer_id + '&page=' + pageNo, { headers: myHeaders })
            .concatMap(function (data) {
            for (var i = 0; i < data.length; i++) {
                var order = data[i];
                order.date_created = _this.formatDate(new Date(order.date_created));
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.updateOrder = function (adminToken, orderId, orderUpdateRequest) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .put(this.config.apiBase + 'wc/v2/orders/' + orderId, JSON.stringify(orderUpdateRequest), { headers: myHeaders })
            .concatMap(function (data) {
            var order = data;
            order.date_created = _this.formatDate(new Date(order.date_created));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.shippingLines = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/shipping_methods/', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.getCouponByCode = function (adminToken, cCode) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/coupons?code=' + cCode, { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.applyCouponCode = function (adminToken, orderId, cCode) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'mobile-ecommerce/v1/coupon/order/' + orderId + '/apply-coupon?code=' + cCode, { headers: myHeaders })
            .concatMap(function (data) {
            var order = data;
            order.date_created = _this.formatDate(new Date(order.date_created));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.categories = function (adminToken, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/categories/?per_page=20&order=desc&orderby=count&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.categoriesParent = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/categories/?per_page=20&order=desc&orderby=count&parent=0&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productVariations = function (adminToken, productId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + productId + '/variations/', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsReviews = function (adminToken, productId) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + productId + '/reviews/', { headers: myHeaders })
            .concatMap(function (data) {
            for (var i = 0; i < data.length; i++) {
                var review = data[i];
                review.date_created = _this.formatDate(new Date(review.date_created));
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.banners = function () {
        return this.http
            .get(this.config.apiBase + 'mobile-ecommerce/v1/banners/list')
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsAll = function (adminToken, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + '?per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productById = function (adminToken, proId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + proId, { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsByQuery = function (adminToken, query, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + '?search=' + query + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.productsByCategory = function (adminToken, catId, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/products/' + '?category=' + catId + '&per_page=20&page=' + pageNo + '&_embed', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.currencies = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/settings/general/woocommerce_currency', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.paymentGateways = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Authorization': adminToken });
        return this.http
            .get(this.config.apiBase + 'wc/v2/payment_gateways/', { headers: myHeaders })
            .concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    WordpressClient.prototype.convertToParams = function (data) {
        var p = [];
        for (var key in data) {
            p.push(key + '=' + encodeURIComponent(data[key]));
        }
        return p.join('&');
    };
    WordpressClient.prototype.formatDate = function (date) {
        return this.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    };
    WordpressClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], WordpressClient);
    return WordpressClient;
}());

//# sourceMappingURL=wordpress-client.service.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShirtsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__short_short__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filter_filter__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__itemdetail_itemdetail__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__wishlist_wishlist__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_category_models__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ShirtsPage = /** @class */ (function () {
    function ShirtsPage(translate, navParams, modalCtrl, global, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl) {
        var _this = this;
        this.translate = translate;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.cartTotal = 0;
        this.category = navParams.get('cat');
        if (!this.category) {
            this.category = new __WEBPACK_IMPORTED_MODULE_10__models_category_models__["a" /* Category */]();
            this.category.id = navParams.get('catId');
            this.category.name = 'Category ' + this.category.id;
        }
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        this.loadProducts();
        this.translate.get('loading_products').subscribe(function (value) {
            _this.presentLoading(value);
        });
    }
    ShirtsPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ShirtsPage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    ShirtsPage.prototype.loadProducts = function () {
        var _this = this;
        var subscription = this.service.productsByCategory(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.category.id, String(this.productsAllPage)).subscribe(function (data) {
            _this.dismissLoading();
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            _this.productsAll = _this.productsAll;
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    ShirtsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsByCategory(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_11__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.category.id, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    ShirtsPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    ShirtsPage.prototype.addToCart = function (product) {
        var _this = this;
        if (product.in_stock && product.purchasable) {
            var added = this.global.addCartItem(product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ShirtsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ShirtsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ShirtsPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ShirtsPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ShirtsPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    ShirtsPage.prototype.shortPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__short_short__["a" /* ShortPage */]);
        modal.present();
    };
    ShirtsPage.prototype.filterPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__filter_filter__["a" /* FilterPage */]);
        modal.present();
    };
    ShirtsPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ShirtsPage.prototype.wishlistPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__wishlist_wishlist__["a" /* WishlistPage */]);
    };
    ShirtsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shirts ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\shirts\shirts.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <ion-title>\n\n            <p [innerHTML]="category.name"></p>\n\n            <div class="icon-box" (click)="cartPage()">\n\n                <img src="assets/imgs/ic_my_cart.png">\n\n                <ion-badge>{{cartTotal}}</ion-badge>\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="bg-light">\n\n    <br>\n\n    <ion-list>\n\n        <ion-row *ngFor="let products of productsAll">\n\n            <ion-col col-6 *ngFor="let pro of products">\n\n                <ion-card>\n\n                    <ion-card-header>\n\n                        <h5 (click)="itemdetailPage(pro)">{{pro.name}}</h5>\n\n                        <!-- <small class="text-light">Grocer market</small> -->\n\n                        <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img data-src="{{pro.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                    </ion-card-header>\n\n                    <ion-card-content>\n\n                        <p *ngIf="pro.type ==\'simple\' && pro.regular_price!=pro.sale_price" class="price text-light mr-5"\n\n                            [innerHTML]="pro.regular_price_html"></p>\n\n                        <p *ngIf="pro.type ==\'simple\'" [innerHTML]="pro.sale_price_html"></p>\n\n                        <p *ngIf="pro.type ==\'variable\'" [innerHTML]="pro.price_html"></p>\n\n                        <div *ngIf="pro.type ==\'simple\'" class="btn text-white" (click)="addToCart(pro)">{{ \'add\' |\n\n                            translate }}</div>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-list>\n\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\shirts\shirts.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ShirtsPage);
    return ShirtsPage;
}());

//# sourceMappingURL=shirts.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShortPage = /** @class */ (function () {
    function ShortPage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
    }
    ShortPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ShortPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-short',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\short\short.html"*/'<ion-content (click)="dismiss()">\n\n    <div class="group">\n\n        <ion-list radio-group>\n\n            <ion-list-header class="d-flex">\n\n                SHORT BY\n\n                <ion-icon name="ios-arrow-down"></ion-icon>\n\n            </ion-list-header>\n\n            <ion-item>\n\n                <ion-label>Popularity</ion-label>\n\n                <ion-radio checked="true" value="popularity"></ion-radio>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Price - High to Low</ion-label>\n\n                <ion-radio value="price_h_l"></ion-radio>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Price - Low to High</ion-label>\n\n                <ion-radio value="price_l_h"></ion-radio>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>Newest First</ion-label>\n\n                <ion-radio value="newest"></ion-radio>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\short\short.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], ShortPage);
    return ShortPage;
}());

//# sourceMappingURL=short.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterPage = /** @class */ (function () {
    function FilterPage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
    }
    FilterPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-filter ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\filter\filter.html"*/'<ion-content>\n\n    <div class="group">\n\n        <div class="size-filter">\n\n            <div class="slid-container">\n\n                <span>0-1 $</span>\n\n                <span>1-2 $</span>\n\n                <span class="active">4-5 $</span>\n\n                <span>2-3 $</span>\n\n                <span class="active">4-5 $</span>\n\n                <span>4-5 $</span>\n\n                <span>1-2 $</span>\n\n                <span>1-2 $</span>\n\n            </div>\n\n        </div>\n\n        <div class="type-filter">\n\n            <div class="slid-container">\n\n                <span>Fresh</span>\n\n                <span class="active">Price</span>\n\n                <span>Discount</span>\n\n                <span>Veg</span>\n\n                <span>Non-Veg</span>\n\n            </div>\n\n        </div>\n\n        <ion-row text-center class="action">\n\n            <ion-col col-5>\n\n                <p>Reset</p>\n\n            </ion-col>\n\n            <ion-col col-2>\n\n                <p>\n\n                    <ion-icon name="ios-close-outline" (click)="dismiss()"></ion-icon>\n\n                </p>\n\n            </ion-col>\n\n            <ion-col col-5>\n\n                <p class="active">Apply</p>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\filter\filter.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], FilterPage);
    return FilterPage;
}());

//# sourceMappingURL=filter.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WishlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WishlistPage = /** @class */ (function () {
    function WishlistPage(navCtrl, modalCtrl, global) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.favorites = global.getFavorites();
    }
    WishlistPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    WishlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wishlist ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\wishlist\wishlist.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>{{ \'wishlist\' | translate }}\n\n            <span float-right>                  \n\n              <ion-icon name="ios-cart-outline" class="icon" (click)="cartPage()"></ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n	<ion-card *ngIf="!favorites.length">\n\n        <ion-card-content>\n\n			<h3>{{ \'wishlist_none\' | translate }}</h3>\n\n		</ion-card-content>\n\n	</ion-card>\n\n    <ion-card *ngFor="let fav of favorites">\n\n        <ion-card-content>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div *ngIf="fav.images && fav.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img data-src="{{fav.images[0].src}}">\n\n                    </div>\n\n                    <div *ngIf="fav.images == null || fav.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>{{fav.name}}\n\n                        <ion-icon name="ios-trash-outline" class="icon text-light" click)="removeFavorite(pro)"></ion-icon>\n\n                    </h4>\n\n                    <div class="rateing">\n\n                        <p class=text-light>{{fav.categories[0].name}}</p>\n\n                        <div class="card-btn" padding-top>\n\n                            <div class="">\n\n                                <div float-left>\n\n                                    <small class="text-white bg-green" float-left>{{fav.average_rating}} <ion-icon name="md-star"></ion-icon></small>\n\n                                    <span class="text-light small-text">({{fav.rating_count}} reviews)</span>\n\n                                </div>\n\n                                <div style="display: flex;" float-right>\n\n                                    <div class="price text-light mr-5">\n\n                                        <img src="assets/imgs/rupee-light.png" class="rupee-icon" [innerHTML]="fav.regular_price_html">\n\n                                    </div>\n\n                                    <div class="price text-sky">\n\n                                        <img src="assets/imgs/rupee-sky.png" class="rupee-icon" [innerHTML]="fav.sale_price_html">\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\wishlist\wishlist.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]])
    ], WishlistPage);
    return WishlistPage;
}());

//# sourceMappingURL=wishlist.js.map

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 145;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shippining_shippining__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CartPage = /** @class */ (function () {
    function CartPage(translate, global, navCtrl, viewCtrl, toastCtrl, appCtrl) {
        this.translate = translate;
        this.global = global;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.appCtrl = appCtrl;
        this.cartItems = new Array();
        this.total = 0;
        this.checkoutText = 'Proceed to checkout';
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        var cartItems = global.getCartItems();
        if (cartItems != null) {
            this.cartItems = this.cartItems.concat(cartItems);
        }
        this.calculateTotal();
    }
    CartPage.prototype.removeItem = function (product) {
        this.global.removeCartItem(product);
        this.cartItems = this.global.getCartItems();
        this.calculateTotal();
    };
    CartPage.prototype.decrementItem = function (product) {
        var _this = this;
        var decremented = this.global.decrementCartItem(product);
        if (!decremented) {
            this.cartItems = this.global.getCartItems();
            this.calculateTotal();
        }
        else {
            this.total = this.total - Number(product.sale_price);
            this.setPriceHtml();
        }
        this.translate.get(decremented ? 'item_updated' : 'item_removed').subscribe(function (value) {
            _this.showToast(value);
        });
    };
    CartPage.prototype.incrementItem = function (product) {
        var _this = this;
        var incremented = this.global.incrementCartItem(product);
        if (incremented) {
            this.total = this.total + Number(product.sale_price);
            this.setPriceHtml();
        }
        this.translate.get(incremented ? 'item_updated' : 'item_maxed_out').subscribe(function (value) {
            _this.showToast(value);
        });
    };
    CartPage.prototype.calculateTotal = function () {
        var _this = this;
        var sum = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var item = _a[_i];
            sum = sum + Number(item.product.sale_price) * item.quantity;
        }
        this.total = sum;
        this.total = Math.round(this.total * 100 + Number.EPSILON) / 100;
        this.translate.get(!this.cartItems || !this.cartItems.length ? 'cart_empty' : 'cart_proceed').subscribe(function (value) {
            _this.checkoutText = value;
        });
        this.setPriceHtml();
    };
    CartPage.prototype.setPriceHtml = function () {
        if (this.currencyIcon) {
            this.total_html = this.currencyIcon + ' ' + this.total;
        }
        else if (this.currencyText) {
            this.total_html = this.currencyText + ' ' + this.total;
        }
    };
    CartPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CartPage.prototype.proceedCheckout = function () {
        var _this = this;
        if (this.cartItems != null && this.cartItems.length > 0) {
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY));
            if (user != null) {
                this.viewCtrl.dismiss();
                this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__shippining_shippining__["a" /* ShippiningPage */]);
            }
            else {
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].TEMP_OPEN, __WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].TEMP_OPEN_CART);
                this.translate.get('auth_required').subscribe(function (value) {
                    _this.showToast(value);
                });
                this.viewCtrl.dismiss();
                this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
            }
        }
    };
    CartPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\cart\cart.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{ \'cart\' | translate }}\n\n            <span float-end>\n\n                <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon>\n\n            </span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div class="your-cart bg-thime">\n\n        <ion-card *ngFor="let item of cartItems">\n\n            <ion-card-content>\n\n                <ion-row>\n\n                    <ion-col col-3>\n\n                        <div *ngIf="item.product.images && item.product.images.length" class="img-box">\n\n                            <img data-src="{{item.product.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="item.product.images == null || item.product.images.length == 0" class="img-box">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-9>\n\n                        <h4>{{item.product.name}}\n\n                            <ion-icon name="ios-trash-outline" class="icon text-light" (click)="removeItem(item.product)"></ion-icon>\n\n                        </h4>\n\n                        <div class="price shadow-bottom bg-white">\n\n                            <div class="d-flex">\n\n                                <p class="text-sky" [innerHTML]="item.product.sale_price_html">\n\n                                </p>\n\n                                <div class="d-flex btn-grup">\n\n                                    <div class="btn text-white bg-thime green-shadow " (click)="incrementItem(item.product)">\n\n                                        +\n\n                                    </div>\n\n                                    <span>{{item.quantity}}</span>\n\n                                    <div class="btn text-white bg-thime green-shadow " (click)="decrementItem(item.product)">\n\n                                        -\n\n                                    </div>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card-content>\n\n        </ion-card>\n\n\n\n\n\n        <ion-row class="checkout">\n\n            <ion-col col-6>\n\n                <h6 class="text-white">\n\n                    {{ \'total\' | translate }}\n\n                    <span [innerHTML]="total_html"></span>\n\n                </h6>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <button ion-button full class="bg-white btn-round btn-text  text-sky btn-shadow" (click)="proceedCheckout()">{{checkoutText}}</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\cart\cart.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 192:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 192;

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartItem; });
var CartItem = /** @class */ (function () {
    function CartItem() {
    }
    return CartItem;
}());

//# sourceMappingURL=cart-item.models.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__placed_placed__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_order_request_models__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_order_update_request_models__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_js_sha512__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_js_sha512___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_js_sha512__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var PaymentPage = /** @class */ (function () {
    function PaymentPage(config, translate, iab, toastCtrl, navCtrl, navParams, service, loadingCtrl, alertCtrl, appCtrl) {
        this.config = config;
        this.translate = translate;
        this.iab = iab;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.appCtrl = appCtrl;
        this.loadingShown = false;
        this.placedPagePushed = false;
        this.paymentDone = false;
        this.paymentFailAlerted = false;
        this.subscriptions = [];
        this.paymentGateways = new Array();
        this.totalItems = 0;
        this.total = 0;
        this.couponApplied = false;
        this.cartItems = this.navParams.get('cart');
        this.totalItems = this.navParams.get('totalItems');
        this.total = this.navParams.get('total');
        var paymentGateways = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].PAYMENT_GATEWAYS));
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        if (paymentGateways) {
            console.log(paymentGateways);
            for (var _i = 0, paymentGateways_1 = paymentGateways; _i < paymentGateways_1.length; _i++) {
                var pg = paymentGateways_1[_i];
                if (pg.enabled && this.paymentImplemented(String(pg.id))) {
                    this.paymentGateways.push(pg);
                }
            }
        }
    }
    PaymentPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    PaymentPage.prototype.paymentImplemented = function (id) {
        return id == "pumcp" || id == "payuindia" || id == "cod";
    };
    PaymentPage.prototype.paymentMethod = function (paymentGateway) {
        this.selectedPaymentGateway = paymentGateway;
    };
    PaymentPage.prototype.placedPage = function () {
        var _this = this;
        if (this.selectedPaymentGateway == null) {
            this.translate.get('field_error_payment_method').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.orderRequest = new __WEBPACK_IMPORTED_MODULE_5__models_order_request_models__["a" /* OrderRequest */]();
            this.orderRequest.payment_method = this.selectedPaymentGateway.id;
            this.orderRequest.payment_method_title = this.selectedPaymentGateway.title;
            this.orderRequest.set_paid = false;
            this.orderRequest.billing = this.selectedAddress;
            this.orderRequest.shipping = this.selectedAddress;
            this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].USER_KEY));
            this.orderRequest.customer_id = String(this.user.id);
            this.orderRequest.line_items = this.cartItems;
            for (var _i = 0, _a = this.orderRequest.line_items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.product = null;
            }
            this.translate.get('order_creating').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.createOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.orderRequest).subscribe(function (data) {
                _this.orderResponse = data;
                var coupon = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON));
                if (coupon) {
                    var couponSubs = _this.service.applyCouponCode(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(_this.orderResponse.id), coupon.code).subscribe(function (data) {
                        _this.couponApplied = true;
                        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
                        _this.translate.get('confirm_order_coupon_applied').subscribe(function (value) {
                            _this.showToast(value);
                        });
                        _this.orderPlaced();
                    }, function (err) {
                        console.log(err);
                        _this.dismissLoading();
                    });
                    _this.subscriptions.push(couponSubs);
                }
                else {
                    _this.orderPlaced();
                }
            }, function (err) {
                _this.dismissLoading();
                _this.translate.get('order_failed').subscribe(function (value) {
                    _this.showToast(value);
                });
                _this.appCtrl.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
            });
            this.subscriptions.push(subscription);
        }
    };
    PaymentPage.prototype.orderPlaced = function () {
        var _this = this;
        this.dismissLoading();
        if (this.selectedPaymentGateway.id === "pumcp" || this.selectedPaymentGateway.id === "payuindia") {
            this.initPayUMoney();
        }
        else if (this.selectedPaymentGateway.id === "cod") {
            this.clearCart();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
        else {
            this.translate.get('order_placed_cod').subscribe(function (value) {
                _this.showToast(value);
            });
            this.clearCart();
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
    };
    PaymentPage.prototype.initPayUMoney = function () {
        var _this = this;
        var name = this.user.first_name && this.user.first_name.length ? this.user.first_name : this.user.username;
        var mobile = this.user.username;
        var email = this.user.email;
        var bookingId = String(Math.floor(Math.random() * (99 - 10 + 1) + 10)) + String(this.orderResponse.id);
        var productinfo = this.orderResponse.order_key;
        var salt = this.config.payuSalt;
        var key = this.config.payuKey;
        var amt = this.couponApplied ? this.total : this.totalItems;
        var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
        var encrypttext = Object(__WEBPACK_IMPORTED_MODULE_11_js_sha512__["sha512"])(string);
        var url = "payumoney/payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&hash=" + encrypttext + "&salt=" + salt + "&key=" + key;
        var options = {
            location: 'yes',
            clearcache: 'yes',
            zoom: 'yes',
            toolbar: 'no',
            closebuttoncaption: 'back'
        };
        var browser = this.iab.create(url, '_blank', options);
        browser.on('loadstop').subscribe(function (event) {
            browser.executeScript({
                file: "payumoney/payumoneyPaymentGateway.js"
            });
            if (event.url == "http://localhost/success.php") {
                _this.paymentSuccess();
                browser.close();
            }
            if (event.url == "http://localhost/failure.php") {
                _this.paymentFailure();
                browser.close();
            }
        });
        browser.on('exit').subscribe(function (event) {
            if (!_this.paymentDone && !_this.paymentFailAlerted) {
                _this.paymentFailure();
            }
        });
        browser.on('loaderror').subscribe(function (event) {
            _this.translate.get('something_went_wrong').subscribe(function (value) {
                _this.showToast(value);
            });
        });
    };
    PaymentPage.prototype.paymentFailure = function () {
        var _this = this;
        this.paymentFailAlerted = true;
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.orderResponse.id), new __WEBPACK_IMPORTED_MODULE_8__models_order_update_request_models__["a" /* OrderUpdateRequest */]('cancelled')).subscribe(function (data) {
        }, function (err) {
            console.log(err);
        });
        this.subscriptions.push(subscription);
        this.translate.get(['payment_fail_title', 'payment_fail_message', 'ok']).subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: res.payment_fail_title,
                message: res.payment_fail_message,
                buttons: [{
                        text: res.ok,
                        role: 'cancel',
                        handler: function () {
                            _this.done();
                            console.log('Okay clicked');
                        }
                    }]
            });
            alert.present();
        });
    };
    PaymentPage.prototype.paymentSuccess = function () {
        var _this = this;
        this.paymentDone = true;
        this.clearCart();
        this.translate.get('just_a_moment').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.updateOrder(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.orderResponse.id), { set_paid: true }).subscribe(function (data) {
            _this.done();
        }, function (err) {
            _this.done();
            _this.paymentSuccess();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    PaymentPage.prototype.done = function () {
        if (!this.placedPagePushed) {
            this.placedPagePushed = true;
            this.dismissLoading();
            this.appCtrl.getRootNav().setRoot(this.paymentFailAlerted ? __WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_2__placed_placed__["a" /* PlacedPage */]);
        }
    };
    PaymentPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PaymentPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PaymentPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    PaymentPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PaymentPage.prototype.clearCart = function () {
        var cartItems = new Array();
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-payment ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\payment\payment.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon class="menu-icon">\n\n                <img src="assets/imgs/ic_menu.png">\n\n            </ion-icon>\n\n        </button>\n\n        <ion-title>{{ \'pay_now\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content radio-group class="bg-light">\n\n    <ion-row text-center class="status">\n\n        <ion-col class="complate">\n\n            <ion-icon name="ios-checkmark-circle"></ion-icon>\n\n            <span>{{ \'confirm_order_tab_title_1\' | translate }}</span>\n\n        </ion-col>\n\n        <ion-col class="processing">\n\n            <ion-icon name="ios-checkmark-circle"></ion-icon>\n\n            <span>{{ \'confirm_order_tab_title_2\' | translate }}</span>\n\n        </ion-col>\n\n        <ion-col class="panding">\n\n            <ion-icon name="md-radio-button-off"></ion-icon>\n\n            <span>{{ \'confirm_order_tab_title_3\' | translate }}</span>\n\n        </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-card>\n\n        <p class="heading">{{ \'pay_method\' | translate }}</p>\n\n        <ion-card-content>\n\n            <label ion-item *ngFor="let item of paymentGateways">\n\n                <ion-label>{{item.title}}</ion-label>\n\n                <ion-radio value="{{item.title}}" (click)="paymentMethod(item)"></ion-radio>\n\n            </label>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <div class="spacebar"></div>\n\n    <div class="btn-padding btn-fisx-bottom">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="placedPage()">{{ \'continue\' | translate }}\n\n        </button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\payment\payment.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlacedPage = /** @class */ (function () {
    function PlacedPage(translate, navCtrl) {
        this.translate = translate;
        this.navCtrl = navCtrl;
    }
    PlacedPage.prototype.ordersPage = function () {
        this.homePage();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    PlacedPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    PlacedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-placed ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\placed\placed.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title><p text-center style="width:100%">{{ \'order_placed_1\' | translate }}</p></ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="img-box">\n\n        <img src="assets/imgs/order-placed.jpg">\n\n    </div>\n\n    <h3 text-center>{{ \'order_placed_2\' | translate }}</h3>\n\n    <h4 class="" text-center padding-left padding-right>{{ \'order_placed_message_part1\' | translate }}<br>{{ \'order_placed_message_part2\' | translate }}<strong (click)="ordersPage()">{{ \'nav_title_my_order\' | translate }}</strong> {{ \'order_placed_message_part3\' | translate }}</h4>\n\n    <div class="btn-padding btn-fisx-bottom ">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="homePage()">{{ \'continue_shopping\' | translate }}</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\placed\placed.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], PlacedPage);
    return PlacedPage;
}());

//# sourceMappingURL=placed.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderUpdateRequest; });
var OrderUpdateRequest = /** @class */ (function () {
    function OrderUpdateRequest(status) {
        this.status = status;
    }
    return OrderUpdateRequest;
}());

//# sourceMappingURL=order-update-request.models.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CodePage = /** @class */ (function () {
    function CodePage(translate, service, loadingCtrl, toastCtrl, navParams, viewCtrl) {
        this.translate = translate;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.cCode = "";
        this.loadingShown = false;
        this.subscriptions = [];
    }
    CodePage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    CodePage.prototype.checkCode = function () {
        var _this = this;
        if (!this.cCode.length) {
            this.translate.get('field_error_couponcode').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('just_a_moment').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.getCouponByCode(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.cCode).subscribe(function (data) {
                _this.dismissLoading();
                var coupons = data;
                if (!coupons.length) {
                    _this.translate.get('field_error_invalid_couponcode').subscribe(function (value) {
                        _this.showToast(value);
                    });
                }
                else {
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].SELECTED_COUPON, JSON.stringify(coupons[0]));
                    _this.dismiss();
                }
            }, function (err) {
                _this.dismissLoading();
                _this.translate.get('field_error_invalid_couponcode').subscribe(function (value) {
                    _this.showToast(value);
                });
            });
            this.subscriptions.push(subscription);
        }
    };
    CodePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CodePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CodePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CodePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-code ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\code\code.html"*/'<ion-content class="bg-light">\n\n    <div class="code">\n\n        <h2>{{ \'coupon_code\' | translate }}</h2>\n\n        <ion-input type="text" value="" [(ngModel)]="cCode" placeholder="{{ \'placeholder_coupon\' | translate }}"></ion-input>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="checkCode()">{{ \'submit\' | translate }}</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\code\code.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], CodePage);
    return CodePage;
}());

//# sourceMappingURL=code.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_address_models__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddressPage = /** @class */ (function () {
    function AddressPage(translate, navCtrl, navParams, viewCtrl, toastCtrl) {
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.address = new __WEBPACK_IMPORTED_MODULE_3__models_address_models__["a" /* Address */]();
        var address = this.navParams.get('address');
        if (address != null) {
            this.address = address;
        }
        else {
            this.address.id = -1;
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY));
            if (user != null) {
                this.address.first_name = user.first_name;
                this.address.last_name = user.last_name;
                this.address.email = user.email;
                this.address.phone = user.username;
            }
        }
        this.addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
    }
    AddressPage.prototype.saveAddress = function () {
        var _this = this;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!this.address.first_name || !this.address.first_name.length) {
            this.translate.get('field_error_name_first').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.last_name || !this.address.last_name.length) {
            this.translate.get('field_error_name_last').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.email || this.address.email.length <= 5 || !reg.test(this.address.email)) {
            this.translate.get('field_error_email').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.phone || !this.address.phone.length) {
            this.translate.get('field_error_phone').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.address_1 || !this.address.address_1.length) {
            this.translate.get('field_error_address_line1').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.address_2 || !this.address.address_2.length) {
            this.translate.get('field_error_address_line2').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.city || !this.address.city.length) {
            this.translate.get('field_error_city').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.state || !this.address.state.length) {
            this.translate.get('field_error_state').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.postcode || !this.address.postcode.length) {
            this.translate.get('field_error_postalcode').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.address.country || !this.address.country.length) {
            this.translate.get('field_error_country').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            if (this.address.id == -1) {
                if (!this.addresses) {
                    this.addresses = new Array();
                }
                this.address.id = this.addresses.length + 1;
                this.addresses.push(this.address);
            }
            else {
                var index = -1;
                for (var i = 0; i < this.addresses.length; i++) {
                    if (this.address.id == this.addresses[i].id) {
                        index = i;
                        break;
                    }
                }
                if (index != -1) {
                    this.addresses[index] = this.address;
                }
            }
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST, JSON.stringify(this.addresses));
            this.navCtrl.pop();
        }
    };
    AddressPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddressPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-address ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\address\address.html"*/'<ion-header>\n\n    <ion-navbar>\n\n	<button ion-button menuToggle>\n\n      <ion-icon class="menu-icon"><img src="assets/imgs/ic_menu.png"></ion-icon>\n\n    </button>\n\n        <ion-title>{{ \'address\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center padding-bottom margin-bottom>{{ \'address_edit\' | translate }}</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>{{ \'address_first_name\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_first_name\' | translate }}" [(ngModel)]="address.first_name"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_last_name\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_last_name\' | translate }}" [(ngModel)]="address.last_name"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'email\' | translate }}</ion-label>\n\n                <ion-input type="email" text-right placeholder="{{ \'email\' | translate }}" [(ngModel)]="address.email"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'phone\' | translate }}</ion-label>\n\n                <ion-input type="tel" text-right placeholder="{{ \'phone\' | translate }}" [(ngModel)]="address.phone"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_address_1\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_address_1\' | translate }}" [(ngModel)]="address.address_1"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_address_2\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_address_2\' | translate }}" [(ngModel)]="address.address_2"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_city\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_city\' | translate }}" [(ngModel)]="address.city" disabled value="Kakinada"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_state\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_state\' | translate }}" [(ngModel)]="address.state" disabled value="Andhra Pradesh"></ion-input>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_postal\' | translate }}</ion-label>\n\n                <ion-select text-right placeholder="{{ \'address_postal\' | translate }}" [(ngModel)]="address.postcode" value="533001">\n\n                    <ion-option value="533001">533001</ion-option>\n\n                    <ion-option value="533002">533002</ion-option>\n\n                    <ion-option value="533003">533003</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n			<ion-item>\n\n                <ion-label>{{ \'address_country\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'address_country\' | translate }}" [(ngModel)]="address.country" disabled value="India"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="saveAddress()">{{ \'save\' | translate }}</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\address\address.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], AddressPage);
    return AddressPage;
}());

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateaccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_auth_credential_models__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_otp_otp__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var CreateaccountPage = /** @class */ (function () {
    function CreateaccountPage(config, translate, events, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl, modalCtrl) {
        this.config = config;
        this.translate = translate;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingShown = false;
        this.authError = "";
        this.subscriptions = [];
        // private registerRequest: RegisterRequest = new RegisterRequest('prince@gmail.com', '8285724681', '123456');
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '');
        this.registerRequestPasswordConfirm = '';
        this.buttonDisabled = true;
        this.countryCode = '';
    }
    CreateaccountPage.prototype.ionViewDidLoad = function () {
        this.getCountries();
    };
    CreateaccountPage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            console.log("Countries fetched");
            _this.countries = data;
            // console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    CreateaccountPage.prototype.checkNumber = function () {
        if (!this.countryCode || this.countryCode == '') {
            this.buttonDisabled = true;
            this.showToast("Please select a your country first");
            this.registerRequest.username = '';
            return;
        }
        var phone = JSON.parse(JSON.stringify(this.registerRequest.username));
        if (isNaN(phone)) {
            this.buttonDisabled = true;
            this.showToast("Phone number is not valid");
        }
        else if (phone.length > 10) {
            this.buttonDisabled = true;
            setTimeout(function () {
                phone = phone.slice(0, 10);
            }, 100);
        }
        else if (phone.length == 10 && phone != '' && !isNaN(phone)) {
            this.buttonDisabled = false;
        }
        else {
            this.buttonDisabled = true;
        }
        this.registerRequest.username = phone;
    };
    CreateaccountPage.prototype.register = function () {
        var _this = this;
        this.authError = "";
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (this.registerRequest.first_name == "" || !this.registerRequest.first_name.length) {
            this.translate.get('field_error_valid_username').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.registerRequest.last_name == "" || !this.registerRequest.last_name.length) {
            this.translate.get('field_error_valid_username').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.registerRequest.username.length < 10) {
            this.translate.get('field_error_phone_valid').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.registerRequest.email.length <= 5 || !reg.test(this.registerRequest.email)) {
            this.translate.get('field_error_email').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.registerRequest.password.length == 0 || !(this.registerRequest.password === this.registerRequestPasswordConfirm)) {
            this.translate.get('field_error_password').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('loading_sign_up').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.createUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.registerRequest)
                .subscribe(function (data) {
                _this.dismissLoading();
                _this.registerResponse = data;
                _this.showToast('Registration success.');
                _this.verifyPhone();
                // Now we are veryfying the mobile no. first.
                // let registerResponse: RegisterResponse = data;
                // this.signIn(String(registerResponse.id), this.registerRequest.username, this.registerRequest.password);
            }, function (err) {
                _this.authError = err.error.message;
                var pos = _this.authError.indexOf('<a');
                if (pos != -1) {
                    _this.authError = _this.authError.substr(0, pos) + '<a target="_blank" ' + _this.authError.substr(pos + 2, _this.authError.length - 1);
                }
                _this.dismissLoading();
                //this.presentErrorAlert("Unable to register with provided credentials");
            });
            this.subscriptions.push(subscription);
        }
    };
    CreateaccountPage.prototype.verifyPhone = function () {
        var obj = JSON.parse(JSON.stringify(this.registerRequest));
        window.localStorage.setItem('userCreateData', JSON.stringify(obj));
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_otp_otp__["a" /* OtpPage */], { userId: this.registerResponse.id, dialCode: this.countryCode });
    };
    CreateaccountPage.prototype.signIn = function (userId, username, password) {
        var _this = this;
        var credentials = new __WEBPACK_IMPORTED_MODULE_7__models_auth_credential_models__["a" /* AuthCredential */](username, password);
        var subscription = this.service.getAuthToken(credentials)
            .subscribe(function (data) {
            var authResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
            _this.getUser(userId);
        }, function (err) {
            _this.dismissLoading();
            _this.translate.get(['error_title', 'error_credentials']).subscribe(function (value) {
                _this.presentErrorAlert(value.error_title, value.error_credentials);
            });
        });
        this.subscriptions.push(subscription);
    };
    CreateaccountPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login');
        }, function (err) {
            _this.dismissLoading();
            _this.translate.get(['error_title', 'error_credentials']).subscribe(function (value) {
                _this.presentErrorAlert(value.error_title, value.error_credentials);
            });
        });
        this.subscriptions.push(subscription);
    };
    CreateaccountPage.prototype.signinPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    CreateaccountPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    CreateaccountPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    CreateaccountPage.prototype.presentErrorAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    CreateaccountPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateaccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-createaccount',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\createaccount\createaccount.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{ \'register_heading\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center padding-bottom margin-bottom>{{ \'register_sub_heading\' | translate : {appName:config.appName} }}</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>{{ \'address_first_name\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'field_error_name_first\' | translate }}" [(ngModel)]="registerRequest.first_name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'address_last_name\' | translate }}</ion-label>\n\n                <ion-input type="text" text-right placeholder="{{ \'field_error_name_last\' | translate }}" [(ngModel)]="registerRequest.last_name"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'address_country\' | translate }}</ion-label>\n\n                <ion-select [(ngModel)]="countryCode" placeholder="{{ \'select\' | translate }}" multiple="false">\n\n                    <ion-option [value]="91">India</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'phone\' | translate }}</ion-label>\n\n                <ion-input type="tel" text-right placeholder="{{ \'field_error_phone\' | translate }}" [(ngModel)]="registerRequest.username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'email\' | translate }}</ion-label>\n\n                <ion-input type="email" text-right placeholder="{{ \'email\' | translate }}" [(ngModel)]="registerRequest.email"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'password\' | translate }}</ion-label>\n\n                <ion-input type="password" text-right placeholder="{{ \'password\' | translate }}" [(ngModel)]="registerRequest.password"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'password_confirm\' | translate }}</ion-label>\n\n                <ion-input type="password" text-right placeholder="{{ \'password_confirm\' | translate }}" [(ngModel)]="registerRequestPasswordConfirm"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <p text-center [innerHTML]="authError"></p>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="register()">{{ \'continue\' | translate }}</button>\n\n\n\n    </div>\n\n    <p text-center class="fix-bottom">\n\n        <small>\n\n            {{ \'done_register\' | translate }}\n\n            <span class="text-sky" (click)="signinPage()">\n\n                {{ \'do_sign_in\' | translate }}\n\n            </span>\n\n        </small>\n\n    </p>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\createaccount\createaccount.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_9__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], CreateaccountPage);
    return CreateaccountPage;
}());

//# sourceMappingURL=createaccount.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_otp_otp__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_config__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








/**
 * Generated class for the PhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/*@IonicPage()*/
var PhonePage = /** @class */ (function () {
    function PhonePage(config, navCtrl, alertCtrl, loadingCtrl, toastCtrl, view, firebase, platform, events, service) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.view = view;
        this.firebase = firebase;
        this.platform = platform;
        this.events = events;
        this.service = service;
        this.loadingShown = false;
        this.captchanotvarified = true;
        this.buttonDisabled = true;
        this.otpNotsent = false;
        this.countryCode = '';
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_5__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '');
        this.subscriptions = [];
        // this.platform.registerBackButtonAction(() => {
        //   this.makeExitAlert();
        // },1);
    }
    PhonePage.prototype.ionViewDidLoad = function () {
        console.log("Phone Page");
        this.registerRequest = JSON.parse(window.localStorage.getItem('userCreateData'));
        console.log("Previous data is:--" + JSON.stringify(this.registerRequest));
        this.checkNumber();
        this.getCountries();
    };
    PhonePage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            console.log("Countries fetched");
            _this.countries = data;
            // console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    PhonePage.prototype.checkNumber = function () {
        var _this = this;
        if (!this.countryCode || this.countryCode == '') {
            this.buttonDisabled = true;
            this.showToast("Please select a your country first");
            this.registerRequest.username = '';
            return;
        }
        this.phoneNumber = JSON.parse(JSON.stringify(this.registerRequest.username));
        if (isNaN(this.phoneNumber)) {
            this.buttonDisabled = true;
            this.showToast("Phone number is not valid");
            return;
        }
        else if (this.phoneNumber.length > 10) {
            this.buttonDisabled = true;
            setTimeout(function () {
                _this.phoneNumber = _this.phoneNumber.slice(0, 10);
            }, 100);
            return;
        }
        else if (this.phoneNumber.length == 10 && this.phoneNumber != '' && !isNaN(this.phoneNumber)) {
            this.buttonDisabled = false;
            return false;
        }
        else {
            this.buttonDisabled = true;
            return false;
        }
    };
    PhonePage.prototype.createUser = function () {
        var _this = this;
        if (!this.phoneNumber || this.phoneNumber == '') {
            this.buttonDisabled = true;
            this.showToast("Please enter your phone number");
            return;
        }
        this.presentLoading("Checking mobile no.");
        this.registerRequest.password = Math.random().toString(36).slice(-6);
        console.log(JSON.stringify(this.registerRequest));
        var subscription = this.service.createUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.registerRequest)
            .subscribe(function (data) {
            _this.dismissLoading();
            _this.registerResponse = data;
            _this.verifyOtp();
            //user not found now we can send the sms on this number
        }, function (err) {
            _this.showToast("Mobile no. already registered");
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    PhonePage.prototype.verifyOtp = function () {
        console.log("COuntry code is ", this.countryCode);
        window.localStorage.setItem('userCreateData', JSON.stringify(this.registerRequest));
        // this.navCtrl.setRoot(OtpPage,{})
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_otp_otp__["a" /* OtpPage */], { userId: this.registerResponse.id, dialCode: this.countryCode });
    };
    PhonePage.prototype.makeExitAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Close App',
                    handler: function () {
                        _this.platform.exitApp(); // Close this application
                    }
                }]
        });
        alert.present();
    };
    PhonePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PhonePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PhonePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PhonePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-phone',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\phone\phone.html"*/'<ion-header>\n\n  <ion-navbar>\n\n      <ion-title text-center>{{config.appName}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="form" padding-left padding-right>\n\n    <p text-center>Please provide your Mobile number <br/>for OTP Verification</p>\n\n    <ion-list>\n\n      <ion-item>\n\n          <ion-label>Country</ion-label>\n\n          <ion-select [(ngModel)]="countryCode" placeholder="Select">\n\n              <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries" >{{country.name}}</ion-option>\n\n          </ion-select>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>Mobile no.</ion-label>\n\n        <ion-input type="tel" text-right placeholder="Phone Number" [(ngModel)]="registerRequest.username" (ngModelChange)="checkNumber($event)"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n    <button ion-button full class="bg-thime btn-round btn-text" (click)="createUser()" [disabled]="buttonDisabled">\n\n      Continue        \n\n    </button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\phone\phone.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_6__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_7__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase__["a" /* Firebase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_6__providers_wordpress_client_service__["a" /* WordpressClient */]])
    ], PhonePage);
    return PhonePage;
}());

//# sourceMappingURL=phone.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());

//# sourceMappingURL=category.models.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_accountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__addressselect_addressselect__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_wordpress_client_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var My_accountPage = /** @class */ (function () {
    function My_accountPage(navCtrl, toastCtrl, service, translate, modalCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.account = "profile";
        this.addressChangeText = 'Change';
        this.subscriptions = [];
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY));
    }
    My_accountPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        this.translate.get(this.selectedAddress == null ? 'add' : 'change').subscribe(function (value) {
            _this.addressChangeText = value;
        });
    };
    My_accountPage.prototype.updateInfo = function () {
        var _this = this;
        if (!this.user.first_name || !this.user.first_name.length) {
            this.translate.get('field_error_name_first').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.user.last_name || !this.user.last_name.length) {
            this.translate.get('field_error_name_last').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('updated').subscribe(function (value) {
                _this.showToast(value);
            });
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(this.user));
            var subscription = this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(this.user.id), { first_name: this.user.first_name, last_name: this.user.last_name }).subscribe(function (data) {
            }, function (err) {
            });
            this.subscriptions.push(subscription);
        }
    };
    My_accountPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    My_accountPage.prototype.addressPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__addressselect_addressselect__["a" /* AddressSelectPage */], { action: 'choose' });
    };
    My_accountPage.prototype.isReadonly = function () {
        return true;
    };
    My_accountPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    My_accountPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    My_accountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my_account ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\my_account\my_account.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>{{ \'nav_title_my_account\' | translate }}\n\n            <!-- <span float-right>\n\n                <ion-icon padding-right name="ios-search-outline" class="icon" (click)="searchPage()"></ion-icon>\n\n                <ion-icon name="ios-cart-outline" class="icon" (click)="cartPage()"></ion-icon>\n\n            </span> -->\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="account">\n\n            <ion-segment-button value="profile">\n\n                {{ \'profile\' | translate }}\n\n            </ion-segment-button>\n\n            <ion-segment-button value="address">\n\n                {{ \'address_default\' | translate }}\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div [ngSwitch]="account">\n\n        <div *ngSwitchCase="\'profile\'" class="profile-section">\n\n            <ion-list>\n\n                <ion-item>\n\n                    <ion-label floating>{{ \'phone\' | translate }}</ion-label>\n\n                    <ion-input type="text" [readonly]="isReadonly()" [(ngModel)]="user.username"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label floating>{{ \'email\' | translate }}</ion-label>\n\n                    <ion-input type="text" [readonly]="isReadonly()" [(ngModel)]="user.email"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label floating>{{ \'address_first_name\' | translate }}</ion-label>\n\n                    <ion-input type="text" [(ngModel)]="user.first_name"></ion-input>\n\n                </ion-item>\n\n                <ion-item>\n\n                    <ion-label floating>{{ \'address_last_name\' | translate }}</ion-label>\n\n                    <ion-input type="text" [(ngModel)]="user.last_name"></ion-input>\n\n                </ion-item>\n\n                <!-- <ion-item *ngIf="selectedAddress">\n\n                    <ion-label floating>{{ \'phone\' | translate }}</ion-label>\n\n                    <ion-input type="text" [readonly]="isReadonly()" [(ngModel)]="selectedAddress.phone"></ion-input>\n\n                </ion-item> -->\n\n            </ion-list>\n\n            <div class="btn-fisx-bottom ">\n\n                <button ion-button full class="bg-thime btn-round btn-text" (click)="updateInfo()">{{ \'update_info\' |\n\n                    translate }}</button>\n\n            </div>\n\n        </div>\n\n\n\n\n\n        <div *ngSwitchCase="\'address\'" class="address-section bg-light" style="min-height: calc(100vh - 98px);">\n\n            <ion-card>\n\n                <p class="address-name" style="float:  right;position:  relative;top: 10px;right:  10px;">\n\n                    <span class="text-sky" (click)="addressPage()">{{addressChangeText}}\n\n                        <ion-icon name="ios-arrow-forward" class="icon"></ion-icon>\n\n                    </span>\n\n                </p>\n\n\n\n                <ion-card-content *ngIf="selectedAddress">\n\n                    <div class="addres-detail">\n\n                        <h3>\n\n                            <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{selectedAddress.first_name}}\n\n                        </h3>\n\n                        <p>{{selectedAddress.address_1}}\n\n                            <br> {{selectedAddress.city}}</p>\n\n                        <p>{{selectedAddress.phone}}</p>\n\n                    </div>\n\n                </ion-card-content>\n\n                <ion-card-content *ngIf="!selectedAddress">\n\n                    <div class="addres-detail">\n\n                        <h3>\n\n                            <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{\n\n                            \'confirm_order_address_no\' | translate }}\n\n                        </h3>\n\n                        <p>{{ \'confirm_order_address_add\' | translate }}</p>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-card-content *ngIf="!selectedAddress">\n\n                    <div class="addres-detail" (click)="addressPage()">\n\n                        <h3 class="text-light">\n\n                            <ion-icon name="ios-add-circle-outline" class="icon-position text-light"></ion-icon>{{\n\n                            \'set_address_default\' | translate }}\n\n                        </h3>\n\n                    </div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\my_account\my_account.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], My_accountPage);
    return My_accountPage;
}());

//# sourceMappingURL=my_account.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HelpPage = /** @class */ (function () {
    function HelpPage(navCtrl, service, translate, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.faqs = [];
        service.getFaqs().subscribe(function (data) {
            _this.faqs = data;
        }, function (err) {
            console.log(err);
        });
    }
    HelpPage.prototype.faqExpandToggle = function (faq) {
        faq.selected = !faq.selected;
    };
    HelpPage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\help\help.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>{{ \'nav_title_help_center\' | translate }}\n\n            <!-- <span float-right>\n\n                <ion-icon name="ios-cart-outline" class="icon" (click)="cartPage()"></ion-icon>\n\n            </span> -->\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <!--    <ion-searchbar (ionInput)="getItems($event)" (click)="searchPage()"></ion-searchbar>-->\n\n    <ion-list>\n\n        <ion-item *ngFor="let item of items">\n\n            {{ item }}\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <h6 padding-left>{{ \'faq\' | translate }}</h6>\n\n    <ion-card *ngFor="let faq of faqs">\n\n        <ion-card-header (click)="faqExpandToggle(faq)">\n\n            {{faq.title}}\n\n            <ion-icon *ngIf="!faq.selected" name="ios-arrow-down-outline" float-right></ion-icon>\n\n            <ion-icon *ngIf="faq.selected" name="ios-arrow-up-outline" float-right></ion-icon>\n\n        </ion-card-header>\n\n        <ion-card-content *ngIf="faq.selected" class="text-light">\n\n            {{faq.message}}\n\n        </ion-card-content>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\help\help.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReviewPage = /** @class */ (function () {
    function ReviewPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\review\review.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Add Review</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-card>\n\n        <ion-card-header style="padding-bottom: 0;">\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Unique For Men Black Formal Slim Fit Shirt</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n\n\n        <ion-card-content>\n\n            <div class="form">\n\n                <ion-list>\n\n                    <ion-item class="write-reveiw">\n\n                        <ion-textarea type="text" placeholder="Write your Review"></ion-textarea>\n\n                    </ion-item>\n\n                    <ion-item>\n\n                        <ion-input type="text" placeholder="Heading four your review"></ion-input>\n\n                    </ion-item>\n\n                </ion-list>\n\n            </div>\n\n            <button ion-button full class="bg-green btn-round btn-text">SUBMIT NOW</button>\n\n        </ion-card-content>\n\n    </ion-card>\n\n    <h5>Previous orders</h5>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/bag.jpg">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Skybags Leo 26 ltrs Red Casual Backpack</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n    </ion-card>\n\n    <ion-card>\n\n        <ion-card-header>\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div class="img-box">\n\n                        <img src="assets/imgs/wach.jpg">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>Skmei Analog-Digital Multicolor Dil Men\'s Watch</h4>\n\n                    <div class="rateing">\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                        <ion-icon name="md-star" class="text-light"></ion-icon>\n\n                    </div>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-header>\n\n    </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\review\review.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MySplashPage = /** @class */ (function () {
    function MySplashPage(events, navCtrl) {
        var _this = this;
        this.events = events;
        this.navCtrl = navCtrl;
        var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES_PARENT));
        if (categories) {
            setTimeout(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }, 2000);
        }
        else {
            events.subscribe('category:setup', function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            });
        }
    }
    MySplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mysplash',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\mysplash\mysplash.html"*/'<ion-content>\n\n    <img src="assets/imgs/splash.png">\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\mysplash\mysplash.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], MySplashPage);
    return MySplashPage;
}());

//# sourceMappingURL=mysplash.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(272);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_globalization__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_phonenumber_phonenumber__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_password_password__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_verification_verification__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_createaccount_createaccount__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_category_category__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_vegetable_vegetable__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_itemdetail_itemdetail__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_shippining_shippining__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_payment_payment__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_code_code__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_placed_placed__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_wishlist_wishlist__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_my_account_my_account__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_myorder_1_myorder_1__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_help_help__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_review_review__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_short_short__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_filter_filter__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_location_location__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_myorder_2_myorder_2__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_list_list__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_shirts_shirts__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_address_address__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_status_bar__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_splash_screen__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_social_sharing__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_addressselect_addressselect__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_in_app_browser__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_mysplash_mysplash__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_otp_otp__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_phone_phone__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_facebook__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_google_plus__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_onesignal__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__components_components_module__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_password_password__["a" /* PasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_verification_verification__["a" /* VerificationPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_createaccount_createaccount__["a" /* CreateaccountPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_vegetable_vegetable__["a" /* VegetablePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_code_code__["a" /* CodePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */],
                __WEBPACK_IMPORTED_MODULE_25__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_short_short__["a" /* ShortPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_filter_filter__["a" /* FilterPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_location_location__["a" /* LocationPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_33__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_shirts_shirts__["a" /* ShirtsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_addressselect_addressselect__["a" /* AddressSelectPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_mysplash_mysplash__["a" /* MySplashPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_phone_phone__["a" /* PhonePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_otp_otp__["a" /* OtpPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_48__components_components_module__["a" /* ComponentsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_phonenumber_phonenumber__["a" /* PhonenumberPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_password_password__["a" /* PasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_verification_verification__["a" /* VerificationPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_createaccount_createaccount__["a" /* CreateaccountPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_vegetable_vegetable__["a" /* VegetablePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_itemdetail_itemdetail__["a" /* ItemdetailPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_shippining_shippining__["a" /* ShippiningPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_placed_placed__["a" /* PlacedPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_account_my_account__["a" /* My_accountPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_code_code__["a" /* CodePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_myorder_1_myorder_1__["a" /* Myorder_1Page */],
                __WEBPACK_IMPORTED_MODULE_25__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_short_short__["a" /* ShortPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_filter_filter__["a" /* FilterPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_location_location__["a" /* LocationPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */],
                __WEBPACK_IMPORTED_MODULE_33__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_shirts_shirts__["a" /* ShirtsPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_address_address__["a" /* AddressPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_addressselect_addressselect__["a" /* AddressSelectPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_mysplash_mysplash__["a" /* MySplashPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_phone_phone__["a" /* PhonePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_otp_otp__["a" /* OtpPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_onesignal__["a" /* OneSignal */],
                { provide: __WEBPACK_IMPORTED_MODULE_8__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_8__app_config__["b" /* BaseAppConfig */] },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BaseAppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]("app.config");
var BaseAppConfig = {
    appName: "Kirana Doorstep",
    apiBase: "http://www.kiranadoorstep.com/wp-json/",
    perPage: "5",
    consumerKey: "",
    consumerSecret: "",
    adminUsername: "kiranadoorstep.info@gmail.com",
    adminPassword: "Srk311995@",
    oneSignalAppId: "e80241a0-388e-4070-9990-37744b5853cc",
    oneSignalGPSenderId: "202224878520",
    paypalSandbox: "",
    paypalProduction: "",
    payuSalt: "",
    payuKey: "",
    availableLanguages: [{
            code: 'en',
            name: 'English'
        }, {
            code: 'ar',
            name: 'Arabic'
        }, {
            code: 'es',
            name: 'Spanish'
        }],
    firebaseConfig: {
        webApplicationId: '202224878520-iuh5pedio8hic6he0hi4qlen0jihvogf.apps.googleusercontent.com',
        apiKey: "AIzaSyCyA_PyEOt8gYqBbdeEuAroZdVEVOq2Y1Y",
        authDomain: "kiranadoorstep-6058e.firebaseapp.com",
        databaseURL: "https://kiranadoorstep-6058e.firebaseio.com",
        projectId: "kiranadoorstep-6058e",
        storageBucket: "kiranadoorstep-6058e.appspot.com",
        messagingSenderId: "202224878520"
    },
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__category_category__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shirts_shirts__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_category_models__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shippining_shippining__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var HomePage = /** @class */ (function () {
    function HomePage(config, translate, events, service, modalCtrl, navCtrl, menu, global) {
        var _this = this;
        this.config = config;
        this.translate = translate;
        this.events = events;
        this.service = service;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.global = global;
        this.subscriptions = [];
        this.banners = new Array();
        this.categoriesAll = new Array();
        this.cartTotal = 0;
        this.slides = [
            {
                title: "20% Off",
                description: "Furits & Veggies",
                smalltext: "Fresh & healthy",
                image: "assets/imgs/slider-1.jpg",
            },
            {
                title: "20% Off",
                description: "Tops & Tunics",
                smalltext: "Fresh & healthy",
                image: "assets/imgs/slider-2.jpg",
            },
            {
                title: "20% Off",
                description: "Tops & Tunics",
                smalltext: "Fresh & healthy",
                image: "assets/imgs/slider-3.jpg",
            }
        ];
        this.homeicons = [
            {
                name: "Vegetables & Fruits",
                imag: "assets/imgs/1.png",
            },
            {
                name: "Bakery & Dairy Products",
                imag: "assets/imgs/bakery.png",
            },
            {
                name: "Foodgrains, oil & masaala",
                imag: "assets/imgs/foodgrains.png",
            },
            {
                name: "Bevrages & drinks",
                imag: "assets/imgs/beverages.png",
            },
            {
                name: "Branded foods products",
                imag: "assets/imgs/branded.png",
            },
            {
                name: "Beauty & hygiene",
                imag: "assets/imgs/beauty.png",
            },
            {
                name: "Fish, Meet & Eggs",
                imag: "assets/imgs/non-veg.png",
            },
            {
                name: "Household products",
                imag: "assets/imgs/hosehold.png",
            },
            {
                name: "Grument & world food",
                imag: "assets/imgs/gourmet.png",
            }
        ];
        this.appTitle = config.appName;
        events.subscribe('category:setup', function () {
            _this.setupCategories();
        });
        this.setupCategories();
        this.loadBanners();
        var toOpen = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN);
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user && toOpen && toOpen.length) {
            if (toOpen == __WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN_CART) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__shippining_shippining__["a" /* ShippiningPage */]);
            }
            else if (toOpen == __WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT) {
                var product = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT));
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__shippining_shippining__["a" /* ShippiningPage */], { pro: product });
            }
            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN);
            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN_CART);
            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT);
        }
    }
    HomePage.prototype.setupCategories = function () {
        var _this = this;
        var categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES_PARENT));
        console.log('categories', categories);
        var cats = new Array();
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var cat = categories_1[_i];
            /* if (cats.length == 8) {
              break;
            } */
            if (Number(cat.parent) == 0) {
                cats.push(cat);
            }
        }
        this.translate.get('more').subscribe(function (value) {
            var more = new __WEBPACK_IMPORTED_MODULE_7__models_category_models__["a" /* Category */]();
            more.name = value;
            more.id = '-1';
            cats.push(more);
            _this.categoriesAll = cats;
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    HomePage.prototype.loadBanners = function () {
        var _this = this;
        var savedBanners = JSON.parse(window.localStorage.getItem('banners'));
        if (savedBanners && savedBanners.length) {
            this.banners = savedBanners;
        }
        var subscription = this.service.banners().subscribe(function (data) {
            _this.banners = data;
            window.localStorage.setItem('banners', JSON.stringify(_this.banners));
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    HomePage.prototype.menuToggle = function () {
        if (!this.menu.isEnabled()) {
            this.menu.enable(true);
            this.menu.swipeEnable(true);
        }
        if (this.menu.isOpen()) {
            this.menu.close();
        }
        else {
            this.menu.open();
        }
    };
    HomePage.prototype.categoryPageId = function (catId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__shirts_shirts__["a" /* ShirtsPage */], { catId: catId });
    };
    HomePage.prototype.categoryPage = function (cat) {
        if (cat && cat.id != '-1') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__shirts_shirts__["a" /* ShirtsPage */], { cat: cat });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__category_category__["a" /* CategoryPage */]);
        }
    };
    HomePage.prototype.searchPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
        // let modal = this.modalCtrl.create(SearchPage);
        // modal.present();
    };
    HomePage.prototype.cartPage = function () {
        var _this = this;
        /*this.navCtrl.push(CartPage);*/
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\home\home.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <button float-right ion-button style="display: block  !important; background: none;" (click)="menuToggle()">\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title>\n\n            <div class="logo">{{appTitle}}</div>\n\n            <div class="icon-box" (click)="cartPage()">\n\n                <img src="assets/imgs/ic_my_cart.png">\n\n                <ion-badge>{{cartTotal}}</ion-badge>\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-searchbar (ionInput)="getItems($event)" placeholder="{{ \'placeholder_search\' | translate }}" (click)="searchPage()"></ion-searchbar>\n\n    <ion-list>\n\n        <ion-item *ngFor="let item of items">\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-header>\n\n\n\n<ion-content style="background: #f9f9f9;">\n\n    <ion-slides autoplay="2000" loop="true" pager *ngIf="banners && banners.length" dir="ltr">\n\n        <ion-slide *ngFor="let slide of banners">\n\n            <img [src]="slide.img_src" class="slide-image" (click)="categoryPageId(slide.category)" />\n\n        </ion-slide>\n\n    </ion-slides>\n\n    <h4 text-center>{{ \'home_cat_title\' | translate }}</h4>\n\n\n\n    <div class="bg-white">\n\n        <ion-row>\n\n            <ion-col class="item-boxs" col-4 *ngFor="let cat of categoriesAll" (click)="categoryPage(cat)">\n\n                <div class="item-box">\n\n                    <img *ngIf="cat.image != null" data-src="{{cat.image.src}}">\n\n                    <img *ngIf="cat.image == null" src="assets/imgs/beverages.png">\n\n                    <p [innerHTML]="cat.name"></p>\n\n                </div>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_10__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_9__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_10__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchPage = /** @class */ (function () {
    function SearchPage(translate, navParams, viewCtrl, modalCtrl, toastCtrl, navCtrl, service, global, loadingCtrl, alertCtrl) {
        this.translate = translate;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.global = global;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.subscriptions = [];
        this.productsAll = new Array();
        this.productsResponse = new Array();
        this.productsAllPage = 1;
        this.queryHistory = new Array();
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        this.queryHistory = global.getSearchHistory();
    }
    SearchPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    SearchPage.prototype.addToCart = function (product) {
        var _this = this;
        if (product.in_stock && product.purchasable) {
            var added = this.global.addCartItem(product);
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    SearchPage.prototype.doSearch = function () {
        var _this = this;
        var subscription = this.service.productsByQuery(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.query, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            var productsAll = new Array();
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var pro = products_1[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                productsAll.push(proSplit);
            }
            _this.productsAll = productsAll;
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    SearchPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        this.productsAllPage++;
        var subscription = this.service.productsByQuery(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.query, String(this.productsAllPage)).subscribe(function (data) {
            var products = data;
            _this.productsResponse = products;
            var proSplit = new Array();
            for (var _i = 0, products_2 = products; _i < products_2.length; _i++) {
                var pro = products_2[_i];
                if (!pro.purchasable || pro.type == 'grouped' || pro.type == 'external')
                    continue;
                if (proSplit.length == 2) {
                    _this.productsAll.push(proSplit);
                    proSplit = new Array();
                }
                if (!pro.sale_price) {
                    pro.sale_price = pro.regular_price;
                }
                if (_this.currencyIcon) {
                    pro.regular_price_html = _this.currencyIcon + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyIcon + ' ' + pro.sale_price;
                }
                else if (_this.currencyText) {
                    pro.regular_price_html = _this.currencyText + ' ' + pro.regular_price;
                    pro.sale_price_html = _this.currencyText + ' ' + pro.sale_price;
                }
                pro.favorite = _this.global.isFavorite(pro);
                proSplit.push(pro);
            }
            if (proSplit.length > 0) {
                _this.productsAll.push(proSplit);
            }
            infiniteScroll.complete();
        }, function (err) {
            infiniteScroll.complete();
            console.log(err);
        });
        this.subscriptions.push(subscription);
    };
    SearchPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__itemdetail_itemdetail__["a" /* ItemdetailPage */], { pro: pro, pros: this.productsResponse });
    };
    SearchPage.prototype.clearHistory = function () {
        this.global.clearSearchHistory();
        this.queryHistory = new Array();
    };
    SearchPage.prototype.search = function (q) {
        var _this = this;
        this.query = q;
        this.productsAllPage = 1;
        this.doSearch();
        this.global.addInSearchHistory(q);
        this.translate.get('searching').subscribe(function (value) {
            _this.showToast(value);
        });
    };
    SearchPage.prototype.getItems = function (searchbar) {
        var q = searchbar.srcElement.value;
        if (!q) {
            return;
        }
        this.search(q);
    };
    SearchPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SearchPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\search\search.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{ \'home_search_title\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="bg-light">\n\n    <div class="d-flex searchbar-section">\n\n        <ion-searchbar (ionInput)="getItems($event)" [debounce]="1000" placeholder="{{ \'placeholder_search\' | translate }}"></ion-searchbar>\n\n        <!-- <ion-icon name="md-close" class="close-icon" (click)="dismiss()"></ion-icon> -->\n\n    </div>\n\n\n\n    <div class="recent-search">\n\n        <ion-card *ngIf="queryHistory && queryHistory.length">\n\n            <ion-card-header>\n\n                {{ \'placeholder_search\' | translate }}\n\n                <span text-right class="right" (click)="clearHistory()">{{ \'clear_history\' | translate }}</span>\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                <p *ngFor="let query of queryHistory" (click)="search(query)">\n\n                    <ion-icon name="ios-time-outline"></ion-icon>{{query}}\n\n                </p>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n\n\n    <div class="trending-search">\n\n        <p *ngIf="query && query.length" class="small" padding-left>{{ \'search_for\' | translate : {query:query} }}</p>\n\n        <div>\n\n            <ion-list>\n\n                <ion-row *ngFor="let products of productsAll">\n\n                    <ion-col col-6 *ngFor="let pro of products">\n\n                        <ion-card>\n\n                            <ion-card-header>\n\n                                <h5 (click)="itemdetailPage(pro)">{{pro.name}}</h5>\n\n                                <!-- <small class="text-light">Grocer market</small> -->\n\n                                <div *ngIf="pro.images && pro.images.length" class="img-box" (click)="itemdetailPage(pro)">\n\n                                    <img data-src="{{pro.images[0].src}}">\n\n                                </div>\n\n                                <div *ngIf="pro.images == null || pro.images.length == 0" class="img-box" (click)="itemdetailPage(pro)">\n\n                                    <img src="assets/imgs/suit_PNG8132.png">\n\n                                </div>\n\n                            </ion-card-header>\n\n                            <ion-card-content>\n\n                                <p *ngIf="pro.type ==\'simple\' && pro.regular_price!=pro.sale_price" class="price text-light mr-5"\n\n                                    [innerHTML]="pro.regular_price_html"></p>\n\n                                <p *ngIf="pro.type ==\'simple\'" [innerHTML]="pro.sale_price_html"></p>\n\n                                <p *ngIf="pro.type ==\'variable\'" [innerHTML]="pro.price_html"></p>\n\n                                <div *ngIf="pro.type ==\'simple\'" class="btn text-white" (click)="addToCart(pro)">{{\n\n                                    \'add\' | translate }}</div>\n\n                            </ion-card-content>\n\n                        </ion-card>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-list>\n\n            <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n                <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n            </ion-infinite-scroll>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\search\search.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_3__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_category_category__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_wishlist_wishlist__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_myorder_2_myorder_2__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_addressselect_addressselect__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_help_help__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_review_review__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__models_auth_credential_models__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_mysplash_mysplash__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__node_modules_ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_globalization__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_firebase__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
























var MyApp = /** @class */ (function () {
    function MyApp(config, globalization, device, translate, events, alertCtrl, service, platform, statusBar, splashScreen, oneSignal) {
        var _this = this;
        this.config = config;
        this.globalization = globalization;
        this.device = device;
        this.translate = translate;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.oneSignal = oneSignal;
        this.deviceModel = "";
        this.subscriptions = [];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_20__pages_mysplash_mysplash__["a" /* MySplashPage */];
        this.pageCategory = 1;
        this.languageFlag = false;
        var superAuth = "";
        if (config.apiBase && config.apiBase.startsWith('https') && config.consumerKey && config.consumerKey.length && config.consumerSecret && config.consumerSecret.length) {
            superAuth = ("Basic " + btoa(config.consumerKey + ":" + config.consumerSecret));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ADMIN_API_KEY, superAuth);
            this.onSuperAuthSetup(superAuth);
        }
        else if (config.apiBase && config.apiBase.startsWith('http:') && config.adminUsername && config.adminUsername.length && config.adminPassword && config.adminPassword.length) {
            var subscription = service.getAuthToken(new __WEBPACK_IMPORTED_MODULE_17__models_auth_credential_models__["a" /* AuthCredential */](config.adminUsername, config.adminPassword)).subscribe(function (data) {
                var authResponse = data;
                superAuth = ("Bearer " + authResponse.token);
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ADMIN_API_KEY, superAuth);
                _this.onSuperAuthSetup(superAuth);
            }, function (err) {
                console.log('auth setup error');
            });
            this.subscriptions.push(subscription);
        }
        else {
            console.log('auth setup error');
        }
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].USER_KEY));
        this.initializeApp();
        this.listenToLoginEvents();
    }
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function () {
            _this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].USER_KEY));
        });
    };
    MyApp.prototype.onSuperAuthSetup = function (superAuth) {
        console.log('auth setup success: ' + superAuth);
        this.loadParentCategories();
        this.loadCurrency();
        this.loadPaymentGateways();
        //this.loadShippingLines();
    };
    MyApp.prototype.loadParentCategories = function () {
        var _this = this;
        var subscription = this.service.categoriesParent(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var categories = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].PRODUCT_CATEGORIES_PARENT, JSON.stringify(categories));
            console.log('categories setup success');
            _this.events.publish('category:setup');
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadCurrency = function () {
        var savedCurrency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].CURRENCY));
        if (!savedCurrency) {
            var subscription = this.service.currencies(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
                var currency = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].CURRENCY, JSON.stringify(currency));
                console.log('currency setup success');
            }, function (err) {
                console.log('currency setup error');
            });
            this.subscriptions.push(subscription);
        }
    };
    MyApp.prototype.loadShippingLines = function () {
        var subscription = this.service.shippingLines(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var shippingLines = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].SHIPPING_LINES, JSON.stringify(shippingLines));
            console.log('shippingLines setup success');
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.loadPaymentGateways = function () {
        var subscription = this.service.paymentGateways(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ADMIN_API_KEY)).subscribe(function (data) {
            var paymentGateway = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].PAYMENT_GATEWAYS, JSON.stringify(paymentGateway));
            console.log('payment-gateway setup success');
        }, function (err) {
            console.log('categories setup error');
        });
        this.subscriptions.push(subscription);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            __WEBPACK_IMPORTED_MODULE_23_firebase___default.a.initializeApp({
                apiKey: _this.config.firebaseConfig.apiKey,
                authDomain: _this.config.firebaseConfig.authDomain,
                databaseURL: _this.config.firebaseConfig.databaseURL,
                projectId: _this.config.firebaseConfig.projectId,
                storageBucket: _this.config.firebaseConfig.storageBucket,
                messagingSenderId: _this.config.firebaseConfig.messagingSenderId
            });
            _this.initOneSignal();
            try {
                if (_this.device.model) {
                    _this.deviceModel = _this.device.model.replace(/\s/g, '').replace(',', '').toLowerCase();
                    // iphone model nos. https://gist.github.com/adamawolf/3048717
                    if (_this.deviceModel.indexOf("iphone103") != -1 || _this.deviceModel.indexOf("iphone106") != -1 || _this.deviceModel.indexOf("iphonex") != -1) {
                        _this.deviceModel = "iphonex";
                    }
                }
            }
            catch (exception) {
            }
            if (_this.platform.is('cordova')) {
                _this.globalization.getPreferredLanguage().then(function (result) {
                    console.log(result);
                    var suitableLang = _this.getSuitableLanguage(result.value);
                    console.log(suitableLang);
                    _this.translate.use(suitableLang);
                    _this.setDirectionAccordingly(suitableLang);
                }).catch(function (e) {
                    console.log(e);
                    _this.translate.use('en');
                    _this.platform.setDir('ltr', true);
                });
            }
            else {
                _this.translate.use('en');
                _this.setDirectionAccordingly('en');
            }
            _this.languageFlag = true;
        });
    };
    MyApp.prototype.initOneSignal = function () {
        var _this = this;
        if (this.config.oneSignalAppId && this.config.oneSignalAppId.length && this.config.oneSignalGPSenderId && this.config.oneSignalGPSenderId.length) {
            this.oneSignal.startInit(this.config.oneSignalAppId, this.config.oneSignalGPSenderId);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                // do something when notification is received
                console.log(data);
            });
            this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                if (data.notification.payload
                    && data.notification.payload.additionalData) {
                    _this.myorder_1Page();
                }
            });
            this.oneSignal.endInit();
            this.oneSignal.getIds().then(function (id) {
                if (id.userId) {
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].ONESIGNAL_PLAYER_ID, id.userId.toString());
                }
            });
        }
    };
    MyApp.prototype.setDirectionAccordingly = function (lang) {
        switch (lang) {
            case 'ar': {
                this.platform.setDir('ltr', false);
                this.platform.setDir('rtl', true);
                break;
            }
            default: {
                this.platform.setDir('rtl', false);
                this.platform.setDir('ltr', true);
                break;
            }
        }
    };
    MyApp.prototype.setDirection = function () {
        console.log('plat rtl: ' + this.platform.isRTL);
        if (this.platform.isRTL) {
            this.platform.setDir('rtl', true);
        }
        else {
            this.platform.setDir('ltr', true);
        }
    };
    MyApp.prototype.getSideOfCurLang = function () {
        return this.platform.dir() === 'rtl' ? "right" : "left";
    };
    MyApp.prototype.getSuitableLanguage = function (language) {
        // language = language.substring(0, 2).toLowerCase();
        // console.log('check for: ' + language);
        // return this.config.availableLanguages.some(x => x.code == language) ? language : 'en';
        return 'en';
    };
    MyApp.prototype.actionNavHeader = function () {
        if (this.user) {
            if (this.nav.getActive().name != 'My_accountPage')
                this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* My_accountPage */]);
        }
        else {
            if (this.nav.getActive().name != 'LoginPage')
                this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
        }
    };
    MyApp.prototype.addressPage = function () {
        if (this.nav.getActive().name != 'AddressSelectPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_addressselect_addressselect__["a" /* AddressSelectPage */]);
    };
    MyApp.prototype.myorder_1Page = function () {
        if (this.nav.getActive().name != 'Myorder_2Page')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    MyApp.prototype.myorder_2Page = function () {
        if (this.nav.getActive().name != 'Myorder_2Page')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_myorder_2_myorder_2__["a" /* Myorder_2Page */]);
    };
    MyApp.prototype.my_accountPage = function () {
        if (this.nav.getActive().name != 'My_accountPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_my_account_my_account__["a" /* My_accountPage */]);
    };
    MyApp.prototype.categoryPage = function () {
        if (this.nav.getActive().name != 'CategoryPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_category_category__["a" /* CategoryPage */]);
    };
    MyApp.prototype.homePage = function () {
        if (this.nav.getActive().name != 'HomePage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.reviewPage = function () {
        if (this.nav.getActive().name != 'ReviewPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_15__pages_review_review__["a" /* ReviewPage */]);
    };
    MyApp.prototype.wishlistPage = function () {
        if (this.nav.getActive().name != 'WishlistPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_wishlist_wishlist__["a" /* WishlistPage */]);
    };
    MyApp.prototype.cartPage = function () {
        if (this.nav.getActive().name != 'CartPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_cart_cart__["a" /* CartPage */]);
    };
    MyApp.prototype.helpPage = function () {
        if (this.nav.getActive().name != 'HelpPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_help_help__["a" /* HelpPage */]);
    };
    MyApp.prototype.categoriesPage = function () {
        if (this.nav.getActive().name != 'CategoryPage')
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_category_category__["a" /* CategoryPage */]);
    };
    MyApp.prototype.phonenumberPage = function () {
        var _this = this;
        this.translate.get(['logout_title', 'logout_message', 'yes', 'no']).subscribe(function (res) {
            var alert = _this.alertCtrl.create({
                title: res.logout_title,
                message: res.logout_message,
                buttons: [{
                        text: res.no,
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: res.yes,
                        handler: function () {
                            _this.user = null;
                            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_18__models_constants_models__["a" /* Constants */].USER_KEY, null);
                            _this.homePage();
                        }
                    }]
            });
            alert.present();
        });
    };
    MyApp.prototype.languagePopup = function () {
        this.languageFlag = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\app\app.html"*/'<ion-menu [side]="getSideOfCurLang()" [content]="content">\n\n    <ion-header>\n\n        <ion-toolbar>\n\n            <ion-list>\n\n                <ion-item menuClose (click)="actionNavHeader()">\n\n                    <ion-avatar item-start>\n\n                        <img src="assets/imgs/icon.png">\n\n                    </ion-avatar>\n\n                    <h2 *ngIf="user && user.first_name.length">{{ \'hey\' | translate }} {{user.first_name}}\n\n                    </h2>\n\n                    <h2 *ngIf="user && !user.first_name.length">{{ \'hey\' | translate }} {{user.username}}\n\n                    </h2>\n\n                    <h2 *ngIf="!user">{{ \'hey_guest\' | translate }}\n\n                    </h2>\n\n                    <p *ngIf="user">{{user.email}}</p>\n\n                    <ion-icon item-end name="ios-arrow-forward" style="font-size: 20px;"></ion-icon>\n\n                </ion-item>\n\n            </ion-list>\n\n        </ion-toolbar>\n\n\n\n        <div *ngIf="user" class="menu-tabs" padding text-center>\n\n            <ion-row>\n\n                <ion-col menuClose (click)="myorder_1Page()" class="d-flex align-items-center">\n\n                    <img src="assets/imgs/ic_my_orders-2.png">\n\n                    <p padding-left>{{ \'nav_title_my_order\' | translate }}</p>\n\n                </ion-col>\n\n                <!-- <ion-col col-4 menuClose (click)="my_accountPage()">\n\n                    <img src="assets/imgs/my-card.png">\n\n                    <p>My Card</p>\n\n                </ion-col> -->\n\n                <ion-col menuClose (click)="addressPage()" class="d-flex align-items-center">\n\n                    <img src="assets/imgs/ic_my_addresses-2.png">\n\n                    <p padding-left>{{ \'nav_title_my_address\' | translate }}</p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </div>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <div class="menu-title">\n\n            <ion-list>\n\n                <button ion-item menuClose (click)="homePage()">\n\n                    <img item-start src="assets/imgs/ic_home.png "> {{ \'nav_title_home\' | translate }}\n\n                </button>\n\n                <button ion-item menuClose (click)="categoriesPage()">\n\n                    <img item-start src="assets/imgs/ic_categories.png "> {{ \'nav_title_categories\' | translate }}\n\n                </button>\n\n                <button *ngIf="user" ion-item menuClose (click)="my_accountPage()">\n\n                    <img item-start src="assets/imgs/ic_my_account.png "> {{ \'nav_title_my_account\' | translate }}\n\n                </button>\n\n                <button ion-item menuClose (click)="languagePopup()">\n\n                    <img item-start style="width:23px;margin-left:7px;margin-right: 14px;" src="assets/imgs/language-icon.png ">  {{ \'nav_title_language\' | translate }}\n\n                </button>\n\n                <button ion-item menuClose (click)="helpPage()">\n\n                    <img item-start src="assets/imgs/ic_help.png "> {{ \'nav_title_help_center\' | translate }}\n\n                </button>\n\n                <button *ngIf="user" ion-item menuClose (click)="phonenumberPage()">\n\n                    <img item-start src="assets/imgs/ic_logout.png "> {{ \'nav_title_logout\' | translate }}\n\n                </button>\n\n            </ion-list>\n\n        </div>\n\n    </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<language *ngIf="languageFlag" [(languageFlag)]="languageFlag"></language>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" [class]="deviceModel" #content swipeBackEnabled="false " type="overlay"></ion-nav>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_16__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_19__app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_22__ionic_native_globalization__["a" /* Globalization */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */], __WEBPACK_IMPORTED_MODULE_21__node_modules_ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_16__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderRequest; });
var OrderRequest = /** @class */ (function () {
    function OrderRequest() {
    }
    return OrderRequest;
}());

//# sourceMappingURL=order-request.models.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = /** @class */ (function () {
    function Address() {
    }
    return Address;
}());

//# sourceMappingURL=address.models.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhonenumberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__password_password__ = __webpack_require__(126);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PhonenumberPage = /** @class */ (function () {
    function PhonenumberPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PhonenumberPage.prototype.homePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    PhonenumberPage.prototype.passwordPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__password_password__["a" /* PasswordPage */]);
    };
    PhonenumberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-phonenumber ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\phonenumber\phonenumber.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>GROCER\n\n            <span float-right (click)="homePage()">Skip</span>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center>Please provide your Mobile number<br> to Login/Sign up on Mobimall</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Phone Number</ion-label>\n\n                <ion-input type="text" text-right value="+91 9876543210"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="passwordPage()">Continue</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\phonenumber\phonenumber.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], PhonenumberPage);
    return PhonenumberPage;
}());

//# sourceMappingURL=phonenumber.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VerificationPage = /** @class */ (function () {
    function VerificationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    VerificationPage.prototype.loginPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    VerificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-verification ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\verification\verification.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n    <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Verification Code</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center>Please enter Verification code <br>sent on +91 903 335 6708</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>Verification code</ion-label>\n\n                <ion-input type="text" text-right value="______"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="loginPage()">Verify</button>\n\n        <p text-center>\n\n            <span float-left class="text-sky">Resend</span>\n\n            <span float-right>1:32 min left</span>\n\n        </p>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\verification\verification.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], VerificationPage);
    return VerificationPage;
}());

//# sourceMappingURL=verification.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VegetablePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__short_short__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__filter_filter__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__itemdetail_itemdetail__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VegetablePage = /** @class */ (function () {
    function VegetablePage(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.vegetableitems = [
            {
                names: "Fresh Onion - Medium Red 1kg",
                market: "Grocer market",
                image: "assets/imgs/veg-1.jpg",
                prices: "1.50",
            },
            {
                names: "Fresh Onion - Medium Red 1kg",
                market: "Grocer market",
                image: "assets/imgs/veg-2.jpg",
                prices: "1.50",
            },
            {
                names: "Fresh Onion - Medium Red 1kg",
                market: "Grocer market",
                image: "assets/imgs/veg-3.jpg",
                prices: "1.50",
            },
            {
                names: "Fresh Onion - Medium Red 1kg",
                market: "Grocer market",
                image: "assets/imgs/veg-4.jpg",
                prices: "1.50",
            },
            {
                names: "Fresh Onion - Medium Red 1kg",
                market: "Grocer market",
                image: "assets/imgs/veg-5.jpg",
                prices: "1.50",
            },
            {
                names: "Fresh Onion - Medium Red 1kg",
                market: "Grocer market",
                image: "assets/imgs/veg-6.jpg",
                prices: "1.50",
            }
        ];
    }
    VegetablePage.prototype.shortPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__short_short__["a" /* ShortPage */]);
        modal.present();
    };
    VegetablePage.prototype.filterPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__filter_filter__["a" /* FilterPage */]);
        modal.present();
    };
    VegetablePage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    VegetablePage.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    VegetablePage.prototype.itemdetailPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__itemdetail_itemdetail__["a" /* ItemdetailPage */]);
    };
    VegetablePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vegetable ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\vegetable\vegetable.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <ion-title>Vegetable & Fruits\n\n            <div class="icon-box">\n\n                <img src="assets/imgs/search.png" (click)="searchPage()">\n\n                <img src="assets/imgs/ic_my_cart.png" (click)="cartPage()">\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="bg-light">\n\n    <div class="d-flex">\n\n        <p>410 items found</p>\n\n        <div class="icon-box">\n\n            <ion-icon name="ios-swap-outline" class="icon" (click)="shortPage()"><span>Sort by</span></ion-icon>\n\n            <ion-icon name="md-funnel" class="icon" (click)="filterPage()"><span>Filter</span></ion-icon>\n\n        </div>\n\n    </div>\n\n    <ion-row>\n\n        <ion-col col-6 *ngFor="let vegetableitem of vegetableitems">\n\n            <ion-card (click)="itemdetailPage()">\n\n                <ion-card-header>\n\n                    <h5 [innerHTML]="vegetableitem.names"></h5>\n\n                    <small class="text-light" [innerHTML]="vegetableitem.market"></small>\n\n                    <div class="img-box">\n\n                        <img [src]="vegetableitem.image">\n\n                    </div>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <p><span [innerHTML]="vegetableitem.prices"></span> $<small>per kg</small>\n\n                        <ion-icon name="md-arrow-dropdown"></ion-icon>\n\n                    </p>\n\n                    <div class="btn text-white">Add</div>\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\vegetable\vegetable.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], VegetablePage);
    return VegetablePage;
}());

//# sourceMappingURL=vegetable.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Myorder_1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Myorder_1Page = /** @class */ (function () {
    function Myorder_1Page(navCtrl, modalCtrl) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.account = "profile";
    }
    Myorder_1Page.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    Myorder_1Page.prototype.cartPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]);
        modal.present();
    };
    Myorder_1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myorder_1 ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\myorder_1\myorder_1.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n   <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>My Order\n\n            <div class="icon-box">\n\n                <img src="assets/imgs/search.png" (click)="searchPage()">\n\n                <img src="assets/imgs/ic_my_cart.png" (click)="cartPage()">\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n    <ion-toolbar no-border-top class="tab-bar">\n\n        <ion-segment [(ngModel)]="account">\n\n            <ion-segment-button value="profile">\n\n                Peading\n\n            </ion-segment-button>\n\n            <ion-segment-button value="card">\n\n                Past Orders\n\n            </ion-segment-button>\n\n        </ion-segment>\n\n    </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div [ngSwitch]="account">\n\n        <div *ngSwitchCase="\'profile\'" class="profile-section">\n\n            <ion-card class="border-bottom-none border" style="position: relative;">\n\n                <ion-card-header>\n\n                    <p class="left-side">\n\n                        <span class="text-light">Ordered ID</span> 2513254112\n\n                        <br>\n\n                        <span class="text-light">Placed on</span> 17-march-17\n\n                    </p>\n\n                    <p class="right-side text-sky">\n\n                        Cancel Order\n\n                    </p>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <ion-row>\n\n                        <ion-col col-7>\n\n                            <h4>Fresh Onion Medium Size Apox 10 Pcs in 1 kg\n\n                            </h4>\n\n                            <small><span class="text-light">Quantity:</span> 1</small>\n\n                            <p>\n\n                                5.80 $\n\n                                <small class="text-light">via COD</small>\n\n                            </p>\n\n                            <small><span class="text-light">Tracking Status on</span> 15-March\'17</small>\n\n                            <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button>\n\n                        </ion-col>\n\n                        <ion-col col-5>\n\n                            <p class="text-light small-text" text-right><span>Weight 5 kg</span></p>\n\n                            <div class="img-box">\n\n                                <img src="assets/imgs/veg-2.jpg">\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card-content>\n\n            </ion-card>\n\n\n\n            <div class="order-info border-top-none border">\n\n                <div class="order-container">\n\n                    <div class="status active">\n\n                        <p padding-left padding-right>Order<br>Placed</p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status active">\n\n                        <p>\n\n                            Dispatched<br>from Bangalore\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status active">\n\n                        <p>\n\n                            Reached Hub <br>New Delhi\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p>12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status">\n\n                        <p>\n\n                            Out for<br>Delivery\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status">\n\n                        <p>\n\n                            Item<br>Delivery\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <ion-card>\n\n                <ion-card-header>\n\n                    <p class="left-side">\n\n                        <span class="text-light">Ordered ID</span> 2513254112\n\n                        <br>\n\n                        <span class="text-light">Placed on</span> 17-march-17\n\n                    </p>\n\n                    <p class="right-side text-sky">\n\n                        Return Product\n\n                    </p>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <ion-row>\n\n                        <ion-col col-7>\n\n                            <h4>Fresh Onion Medium Size Apox 10 Pcs in 1 kg</h4>\n\n                            <small><span class="text-light">Quantity:</span> 1</small>\n\n                            <p>\n\n                                5.80 $\n\n                                <small class="text-light">via COD</small>\n\n                            </p>\n\n                            <small><span class="text-light">Delivered on </span> 05-May\'17</small>\n\n                            <button ion-button full class="bg-thime btn-round  btn-text">Rate Now<ion-icon name="ios-arrow-forward"></ion-icon></button>\n\n                        </ion-col>\n\n                        <ion-col col-5>\n\n                            <p class="text-light small-text" text-right><span>Weight 5 kg</span></p>\n\n                            <div class="img-box">\n\n                                <img src="assets/imgs/veg-1.jpg">\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </div>\n\n\n\n        <div *ngSwitchCase="\'card\'" class="card-section bg-light">\n\n            <ion-card class="border-bottom-none border" style="position: relative;">\n\n                <ion-card-header>\n\n                    <p class="left-side">\n\n                        <span class="text-light">Ordered ID</span> 2513254112\n\n                        <br>\n\n                        <span class="text-light">Placed on</span> 17-march-17\n\n                    </p>\n\n                    <p class="right-side text-sky">\n\n                        Cancel Order\n\n                    </p>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <ion-row>\n\n                        <ion-col col-7>\n\n                            <h4>Fresh Onion Medium Size Apox 10 Pcs in 1 kg</h4>\n\n                            <small><span class="text-light">Quantity:</span> 1</small>\n\n                            <p>\n\n                                5.80 $\n\n                                <small class="text-light">via COD</small>\n\n                            </p>\n\n                            <small><span class="text-light">Tracking Status on</span> 15-March\'17</small>\n\n                            <button ion-button full class="bg-green btn-round  btn-text">Reached Hub,New Delhi</button>\n\n                        </ion-col>\n\n                        <ion-col col-5>\n\n                            <p class="text-light small-text" text-right><span>Weight 5 kg</span></p>\n\n                            <div class="img-box">\n\n                                <img src="assets/imgs/veg-1.jpg">\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card-content>\n\n            </ion-card>\n\n\n\n            <div class="order-info border-top-none border">\n\n                <div class="order-container">\n\n                    <div class="status active">\n\n                        <p padding-left padding-right>Order<br>Placed</p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status active">\n\n                        <p>\n\n                            Dispatched<br>from Bangalore\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status active">\n\n                        <p>\n\n                            Reached Hub <br>New Delhi\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p>12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status">\n\n                        <p>\n\n                            Out for<br>Delivery\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                    <div class="status">\n\n                        <p>\n\n                            Item<br>Delivery\n\n                        </p>\n\n                        <ion-icon name="md-radio-button-on"></ion-icon>\n\n                        <p style="color: #555">12:05pm<br>12 May 17</p>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <ion-card>\n\n                <ion-card-header>\n\n                    <p class="left-side">\n\n                        <span class="text-light">Ordered ID</span> 2513254112\n\n                        <br>\n\n                        <span class="text-light">Placed on</span> 17-march-17\n\n                    </p>\n\n                    <p class="right-side text-sky">\n\n                        Return Product\n\n                    </p>\n\n                </ion-card-header>\n\n                <ion-card-content>\n\n                    <ion-row>\n\n                        <ion-col col-7>\n\n                            <h4>Fresh Onion Medium Size Apox 10 Pcs in 1 kg</h4>\n\n                            <small><span class="text-light">Quantity:</span> 1</small>\n\n                            <p>\n\n                                5.80 $\n\n                                <small class="text-light">via COD</small>\n\n                            </p>\n\n                            <small><span class="text-light">Delivered on </span> 05-May\'17</small>\n\n                            <button ion-button full class="bg-thime btn-round  btn-text">Rate Now<ion-icon name="ios-arrow-forward"></ion-icon></button>\n\n                        </ion-col>\n\n                        <ion-col col-5>\n\n                            <p class="text-light small-text" text-right><span>Weight 5 kg</span></p>\n\n                            <div class="img-box">\n\n                                <img src="assets/imgs/veg-2.jpg">\n\n                            </div>\n\n                        </ion-col>\n\n                    </ion-row>\n\n                </ion-card-content>\n\n            </ion-card>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\myorder_1\myorder_1.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], Myorder_1Page);
    return Myorder_1Page;
}());

//# sourceMappingURL=myorder_1.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { RequestPage } from '../request/request';
var LocationPage = /** @class */ (function () {
    function LocationPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    LocationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-location',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\location\location.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n     <img src="assets/imgs/ic_menu.png">\n\n    </button>\n\n        <ion-title>Select Locaton</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <img src="assets/imgs/map.jpg" class="map">\n\n    <div class="search-bar">\n\n        <ion-searchbar (ionInput)="getItems($event)" placeholder="Search Locaton"></ion-searchbar>\n\n        <ion-icon name="md-locate" class="location_icon"></ion-icon>\n\n    </div>\n\n    <div class="btn-fix-bottom">\n\n        <button ion-button full class="bg-green btn-round green-shadow btn-text" (click)="homePage()">Continue</button>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\location\location.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], LocationPage);
    return LocationPage;
}());

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_language__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* LanguageComponent */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* LanguageComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LanguageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var LanguageComponent = /** @class */ (function () {
    function LanguageComponent(alertCtrl, translate) {
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.languageFlagChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    LanguageComponent.prototype.ngOnInit = function () {
        this.presentPrompt();
    };
    LanguageComponent.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Language - భాష',
            buttons: [
                {
                    text: 'English',
                    role: 'english',
                    handler: function (data) {
                        console.log('English clicked');
                        _this.translate.use('en');
                        _this.languageFlag = false;
                        _this.languageFlagChange.emit(false);
                    }
                },
                {
                    text: 'తెలుగు',
                    role: 'telugu',
                    handler: function (data) {
                        console.log('Telugu clicked');
                        _this.translate.use('te');
                        _this.languageFlag = false;
                        _this.languageFlagChange.emit(false);
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], LanguageComponent.prototype, "languageFlag", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], LanguageComponent.prototype, "languageFlagChange", void 0);
    LanguageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'language',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\components\language\language.html"*/'\n'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\components\language\language.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], LanguageComponent);
    return LanguageComponent;
}());

//# sourceMappingURL=language.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_cart_item_models__ = __webpack_require__(238);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Global = /** @class */ (function () {
    function Global() {
    }
    Global.prototype.decrementCartItem = function (pro) {
        this.checkCartItems();
        var decrement = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            if (this.cartItems[pos].quantity > 1) {
                this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
                decrement = true;
            }
            else {
                this.cartItems.splice(pos, 1);
            }
            window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
        return decrement;
    };
    Global.prototype.incrementCartItem = function (pro) {
        this.checkCartItems();
        var increment = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
            increment = true;
            window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
        return increment;
    };
    Global.prototype.removeCartItem = function (pro) {
        this.checkCartItems();
        var removed = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems.splice(pos, 1);
            window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            removed = true;
        }
        return removed;
    };
    Global.prototype.addCartItem = function (pro) {
        this.checkCartItems();
        var added = false;
        var pos = -1;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (pro.id == this.cartItems[i].product_id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
        }
        else {
            var cartItem = new __WEBPACK_IMPORTED_MODULE_1__models_cart_item_models__["a" /* CartItem */]();
            cartItem.product = pro;
            cartItem.product_id = pro.id;
            cartItem.quantity = 1;
            this.cartItems.push(cartItem);
            added = true;
        }
        console.log(this.cartItems);
        window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        return added;
    };
    Global.prototype.toggleFavorite = function (pro) {
        this.checkFavorites();
        var toggleResult = false;
        var pos = -1;
        for (var i = 0; i < this.favorites.length; i++) {
            if (pro.id == this.favorites[i].id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.favorites.splice(pos, 1);
            window.localStorage.setItem('favoriteProducts', JSON.stringify(this.favorites));
            console.log('saving remove');
            toggleResult = false;
        }
        else {
            this.favorites.push(pro);
            window.localStorage.setItem('favoriteProducts', JSON.stringify(this.favorites));
            console.log('saving save');
            toggleResult = true;
        }
        return toggleResult;
    };
    Global.prototype.removeFavorite = function (pro) {
        this.checkFavorites();
        var removed = false;
        var pos = -1;
        for (var i = 0; i < this.favorites.length; i++) {
            if (pro.id == this.favorites[i].id) {
                pos = i;
                break;
            }
        }
        if (pos != -1) {
            this.favorites.splice(pos, 1);
            window.localStorage.setItem('favoriteProducts', JSON.stringify(this.favorites));
            removed = true;
        }
        return removed;
    };
    Global.prototype.isFavorite = function (pro) {
        this.checkFavorites();
        var fav = false;
        for (var _i = 0, _a = this.favorites; _i < _a.length; _i++) {
            var product = _a[_i];
            if (pro.id == product.id) {
                fav = true;
                break;
            }
        }
        return fav;
    };
    Global.prototype.addInSearchHistory = function (query) {
        this.checkSearchHistory();
        var index = this.searchHistory.indexOf(query);
        if (index == -1) {
            if (this.searchHistory.length == 5) {
                this.searchHistory.splice(0, 1);
            }
            this.searchHistory.push(query);
            window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        }
    };
    Global.prototype.clearCart = function () {
        this.cartItems = new Array();
        window.localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    };
    Global.prototype.clearSearchHistory = function () {
        this.searchHistory = new Array();
        window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    };
    Global.prototype.checkCartItems = function () {
        if (this.cartItems == null) {
            var cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
            if (cartItems != null) {
                this.cartItems = cartItems;
            }
            else {
                this.cartItems = new Array();
            }
        }
    };
    Global.prototype.checkFavorites = function () {
        if (this.favorites == null) {
            var favProducts = JSON.parse(window.localStorage.getItem('favoriteProducts'));
            if (favProducts != null) {
                this.favorites = favProducts;
            }
            else {
                this.favorites = new Array();
            }
        }
    };
    Global.prototype.checkSearchHistory = function () {
        if (this.searchHistory == null) {
            var history_1 = JSON.parse(window.localStorage.getItem('searchHistory'));
            if (history_1 != null) {
                this.searchHistory = history_1;
            }
            else {
                this.searchHistory = new Array();
            }
        }
    };
    Global.prototype.getSearchHistory = function () {
        this.checkSearchHistory();
        return this.searchHistory;
    };
    Global.prototype.getFavorites = function () {
        this.checkFavorites();
        return this.favorites;
    };
    Global.prototype.getCartItems = function () {
        this.checkCartItems();
        return this.cartItems;
    };
    Global.prototype.getCartItemsCount = function () {
        var cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
        if (cartItems != null) {
            this.cartItems = cartItems;
        }
        else {
            this.cartItems = new Array();
        }
        return this.cartItems.length;
    };
    Global = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Global);
    return Global;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__password_password__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createaccount_createaccount__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_auth_credential_models__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_firebase_auth__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_plus__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_register_request_models__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__phone_phone__ = __webpack_require__(251);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
















var LoginPage = /** @class */ (function () {
    function LoginPage(config, translate, facebook, events, modalCtrl, toastCtrl, navCtrl, service, loadingCtrl, alertCtrl, google, platform) {
        this.config = config;
        this.translate = translate;
        this.facebook = facebook;
        this.events = events;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.google = google;
        this.platform = platform;
        this.loadingShown = false;
        this.authError = "";
        this.registerRequest = new __WEBPACK_IMPORTED_MODULE_14__models_register_request_models__["a" /* RegisterRequest */]('', '', '', '', '');
        this.subscriptions = [];
        this.credentials = new __WEBPACK_IMPORTED_MODULE_6__models_auth_credential_models__["a" /* AuthCredential */]('', '');
        this.registerRequestPasswordConfirm = '';
        this.buttonDisabled = true;
        this.token = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY);
        if (this.userLoggedIn()) {
            navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
    }
    LoginPage.prototype.singIn = function () {
        var _this = this;
        this.authError = "";
        if (this.credentials.username.length == 0 || this.credentials.password.length == 0) {
            this.translate.get('field_empty_both').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.presentLoading('Logging in');
            var subscription = this.service.getAuthToken(this.credentials).subscribe(function (data) {
                var authResponse = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
                _this.getUser(_this.getUserIdFromToken(authResponse.token));
            }, function (err) {
                _this.removeTempOpen();
                _this.authError = err.error.message;
                if (_this.authError) {
                    var pos = _this.authError.indexOf('<a');
                    if (pos != -1) {
                        _this.authError = _this.authError.substr(0, pos) + '<a target="_blank" ' + _this.authError.substr(pos + 2, _this.authError.length - 1);
                    }
                    console.log(_this.authError);
                }
                _this.dismissLoading();
                //this.presentErrorAlert("Unable to login with provided credentials");
            });
            this.subscriptions.push(subscription);
        }
    };
    LoginPage.prototype.userLoggedIn = function () {
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        return user != null;
    };
    LoginPage.prototype.checkNumber = function () {
        var _this = this;
        var phone = JSON.parse(JSON.stringify(this.credentials.username));
        if (isNaN(phone)) {
            this.buttonDisabled = true;
            this.translate.get('field_error_phone_valid').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (phone.length > 10) {
            this.buttonDisabled = true;
            setTimeout(function () {
                phone = phone.slice(0, 10);
            }, 100);
        }
        else if (phone.length == 10 && phone != '' && !isNaN(phone) && this.credentials.password != '') {
            this.buttonDisabled = false;
        }
        else {
            this.buttonDisabled = true;
        }
        this.credentials.username = phone;
    };
    LoginPage.prototype.signIn = function () {
        var _this = this;
        this.authError = "";
        var phone = JSON.parse(JSON.stringify(this.registerRequest.username));
        if (isNaN(phone)) {
            this.translate.get('field_error_phone_valid').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        if (this.credentials.username.length == 0 || this.credentials.password.length == 0) {
            this.translate.get('field_empty_both').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('loading_sign_in').subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.getAuthToken(this.credentials)
                .subscribe(function (data) {
                var authResponse = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
                _this.getUser(_this.getUserIdFromToken(authResponse.token));
            }, function (err) {
                _this.authError = err.error.message.replace('username', 'mobile no.');
                var pos = _this.authError.indexOf('<a');
                if (pos != -1) {
                    _this.authError = _this.authError.substr(0, pos) + '<a target="_blank" ' + _this.authError.substr(pos + 2, _this.authError.length - 1);
                }
                _this.dismissLoading();
                //this.presentErrorAlert("Unable to login with provided credentials");
            });
            this.subscriptions.push(subscription);
        }
    };
    LoginPage.prototype.removeTempOpen = function () {
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN);
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN_CART);
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT);
    };
    LoginPage.prototype.loginFB = function () {
        this.presentLoading('Logging in Facebook');
        if (this.platform.is('cordova')) {
            this.fbOnPhone();
        }
        else {
            this.fbOnBrowser();
        }
    };
    LoginPage.prototype.loginGoogle = function () {
        this.presentLoading('Logging in Google+');
        if (this.platform.is('cordova')) {
            this.googleOnPhone();
        }
        else {
            this.googleOnBrowser();
        }
    };
    LoginPage.prototype.googleOnPhone = function () {
        var _this = this;
        var provider = {
            'webClientId': this.config.firebaseConfig.webApplicationId,
            'offline': false,
            'scopes': 'profile email'
        };
        console.log("In cordova");
        console.log("Calling google in cordova");
        this.google.login(provider)
            .then(function (res) {
            // this.dismissLoading();
            // this.presentLoading('Google signup success, authenticating with firebase');
            console.log('Google signup success, authenticating with firebase');
            var googleCredential = __WEBPACK_IMPORTED_MODULE_10_firebase__["auth"].GoogleAuthProvider.credential(res.idToken);
            Object(__WEBPACK_IMPORTED_MODULE_10_firebase__["auth"])().signInWithCredential(googleCredential).then(function (response) {
                _this.registerRequest.email = response.email;
                _this.registerRequest.first_name = _this.getNames(response.displayName).first_name;
                _this.registerRequest.last_name = _this.getNames(response.displayName).last_name;
                // this.dismissLoading();
                // this.presentLoading('Firebase authenticated google signup, creating user..');
                console.log('Firebase authenticated google signup, creating user..');
                _this.checkUser();
            });
        }, function (err) {
            console.error("Error: ", err);
            _this.dismissLoading();
            _this.translate.get(['error_title', 'error_social']).subscribe(function (value) {
                _this.presentErrorAlert(value.error_title, value.error_credentials);
            });
        });
    };
    LoginPage.prototype.getNames = function (displayName) {
        var obj = { first_name: '', last_name: '' };
        if (!displayName.length || displayName == "") {
            return obj;
        }
        var names = displayName.split(" ");
        obj.first_name = names[0];
        for (var i = 0; i < names.length; i++) {
            if (names[i] != obj.first_name && names[i] != "" && names[i].length > 0) {
                obj.last_name = names[i];
                break;
            }
        }
        return obj;
    };
    LoginPage.prototype.googleOnBrowser = function () {
        var _this = this;
        try {
            console.log("In not cordova");
            var provider = new __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.auth.GoogleAuthProvider();
            __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.auth().signInWithPopup(provider)
                .then(function (result) {
                _this.registerRequest.email = result.user.email;
                _this.registerRequest.first_name = _this.getNames(result.user.displayName).first_name;
                _this.registerRequest.last_name = _this.getNames(result.user.displayName).last_name;
                console.log(_this.registerRequest);
                _this.dismissLoading();
                _this.presentLoading('Firebase authenticated google signup, creating user..');
                _this.checkUser();
                console.log(result);
            }).catch(function (error) {
                console.log(error);
                _this.dismissLoading();
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    LoginPage.prototype.fbOnPhone = function () {
        var _this = this;
        console.log("In cordova");
        this.facebook.login(["public_profile", 'email'])
            .then(function (response) {
            // this.dismissLoading();
            // this.presentLoading('Facebook signup success, authenticating with firebase');
            console.log('Facebook signup success, authenticating with firebase');
            var facebookCredential = __WEBPACK_IMPORTED_MODULE_10_firebase__["auth"].FacebookAuthProvider.credential(response.authResponse.accessToken);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_API_KEY, response.authResponse.accessToken);
            Object(__WEBPACK_IMPORTED_MODULE_10_firebase__["auth"])().signInWithCredential(facebookCredential).then(function (success) {
                _this.registerRequest.email = success.email;
                _this.registerRequest.first_name = _this.getNames(success.displayName).first_name;
                _this.registerRequest.last_name = _this.getNames(success.displayName).last_name;
                // this.dismissLoading();
                // this.presentLoading('Firebase authenticated Facebook login, creating user..');
                console.log('Firebase authenticated Facebook login, creating user..');
                _this.checkUser();
            });
        }).catch(function (error) {
            console.log(error);
            //this.showToast("Error in Facebook login");
            _this.dismissLoading();
            _this.translate.get(['error_title', 'error_social']).subscribe(function (value) {
                _this.presentErrorAlert(value.error_title, value.error_credentials);
            });
        });
    };
    LoginPage.prototype.fbOnBrowser = function () {
        var _this = this;
        console.log("In not cordova");
        var provider = new __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        provider.addScope('user_friends');
        provider.addScope('email');
        provider.addScope('public_profile');
        __WEBPACK_IMPORTED_MODULE_10_firebase___default.a.auth().signInWithPopup(provider)
            .then(function (result) {
            _this.registerRequest.email = result.user.email;
            _this.registerRequest.first_name = _this.getNames(result.user.displayName).first_name;
            _this.registerRequest.last_name = _this.getNames(result.user.displayName).last_name;
            // this.dismissLoading();
            // this.presentLoading('Firebase authenticated Facebook login, creating user..');
            console.log('Firebase authenticated Facebook login, creating user..');
            _this.checkUser();
        }).catch(function (error) {
            console.log(error);
            _this.dismissLoading();
            _this.translate.get(['error_title', 'error_social']).subscribe(function (value) {
                _this.presentErrorAlert(value.error_title, value.error_credentials);
            });
        });
    };
    LoginPage.prototype.checkUser = function () {
        var component = this;
        console.log("Getting the user token");
        //component.presentLoading("Getting the user token");
        Object(__WEBPACK_IMPORTED_MODULE_10_firebase__["auth"])().currentUser.getIdToken(true).then(function (idToken) {
            // component.dismissLoading();
            // component.presentLoading("Checking the user");
            console.log("Checking the user");
            component.service.checkToken(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), idToken).subscribe(function (data) {
                console.log("User exist:---");
                console.log(JSON.stringify(data));
                // user exists
                var authResponse = data;
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_API_KEY, authResponse.token);
                component.getUser(component.getUserIdFromToken(authResponse.token));
                //component.dismissLoading();
            }, function (err) {
                component.removeTempOpen();
                // if error code is 404, user not exists
                console.log("User not exist");
                component.dismissLoading();
                component.verifyPhone();
            });
        }).catch(function (error) {
            console.log("error");
        });
    };
    LoginPage.prototype.verifyPhone = function () {
        var obj = JSON.parse(JSON.stringify(this.registerRequest));
        window.localStorage.setItem('userCreateData', JSON.stringify(obj));
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_15__phone_phone__["a" /* PhonePage */]);
    };
    LoginPage.prototype.getUser = function (userId) {
        var _this = this;
        var subscription = this.service.getUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), userId).subscribe(function (data) {
            _this.dismissLoading();
            var userResponse = data;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(userResponse));
            if (userResponse.billing && userResponse.billing.address_1 && userResponse.billing.address_1.length && userResponse.billing.address_2 && userResponse.billing.address_2.length) {
                userResponse.billing.id = -100;
                var addresses = new Array();
                addresses.push(userResponse.billing);
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(userResponse.billing));
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST, JSON.stringify(addresses));
            }
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            _this.events.publish('user:login');
        }, function (err) {
            _this.removeTempOpen();
            _this.dismissLoading();
            _this.translate.get(['error_title', 'error_credentials']).subscribe(function (value) {
                _this.presentErrorAlert(value.error_title, value.error_credentials);
            });
        });
        this.subscriptions.push(subscription);
    };
    LoginPage.prototype.getUserIdFromToken = function (token) {
        var decodedString = window.atob(token.split(".")[1]);
        return JSON.parse(decodedString).data.user.id;
    };
    LoginPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    LoginPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    LoginPage.prototype.presentErrorAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    LoginPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage.prototype.signupPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__createaccount_createaccount__["a" /* CreateaccountPage */]);
    };
    LoginPage.prototype.homePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.passwordPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__password_password__["a" /* PasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\login\login.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            <p text-left style="width:100%">{{config.appName}}</p>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div class="form" padding-left padding-right>\n\n        <p text-center padding-bottom margin-bottom>{{ \'sign_in_title\' | translate : {appName:config.appName} }}</p>\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label>{{ \'username\' | translate }}</ion-label>\n\n                <ion-input type="tel" text-right placeholder="{{ \'phone\' | translate }}" [(ngModel)]="credentials.username"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label>{{ \'password\' | translate }}</ion-label>\n\n                <ion-input type="password" text-right placeholder="{{ \'password\' | translate }}" [(ngModel)]="credentials.password"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button full class="bg-thime btn-round btn-text" (click)="singIn()">{{ \'continue\' | translate }}</button>\n\n        <br>\n\n        <p text-center [innerHTML]="authError" style="margin: 0;"></p>\n\n        <p text-center (click)="passwordPage()">\n\n            {{ \'password_forgot\' | translate }}\n\n        </p>\n\n\n\n        <p text-center style="margin-bottom:15px">{{ \'or_continue_with\' | translate }}</p>\n\n        <ion-grid no-padding>\n\n            <ion-row>\n\n                <ion-col col-6 style="padding-right:7px">\n\n                    <button ion-button icon-left full clear no-padding class="btn-social btn-facebook" (click)="loginFB()">\n\n                        <!-- <ion-icon class="icon">\n\n                            <img src="assets/imgs/fb.png">\n\n                        </ion-icon>\n\n                        <span>Facebook</span> -->\n\n                        <img src="assets/imgs/fb.png">\n\n                    </button>\n\n                </ion-col>\n\n                <ion-col col-6 style="padding-left:7px">\n\n                    <button ion-button full icon-left clear no-padding class="btn-social btn-google" (click)="loginGoogle()">\n\n                        <!-- <ion-icon class="icon">\n\n                            <img src="assets/imgs/google.png">\n\n                        </ion-icon>\n\n                        <span>Google</span> -->\n\n                        <img src="assets/imgs/google.png">\n\n                    </button>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-grid>\n\n\n\n    </div>\n\n    <div class="fixed-btn">\n\n        <p text-center>{{ \'not_registered\' | translate }}</p>\n\n        <button ion-button full class="bg-white btn-round btn-text" (click)="signupPage()">{{ \'do_register\' | translate\n\n            }}</button>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\login\login.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_9__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemdetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shippining_shippining__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var ItemdetailPage = /** @class */ (function () {
    function ItemdetailPage(config, translate, socialSharing, navCtrl, toastCtrl, modalCtrl, global, navParams, service, loadingCtrl, alertCtrl) {
        this.config = config;
        this.translate = translate;
        this.socialSharing = socialSharing;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.global = global;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.subscriptions = [];
        this.details = false;
        this.productsResponse = new Array();
        this.productVariations = new Array();
        this.cartTotal = 0;
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.lastIndexOf('(') + 1, iconText.length - 1);
        }
        this.product = this.navParams.get('pro');
        if (this.product) {
            this.product.favorite = global.isFavorite(this.product);
            var productsResponse = this.navParams.get('pros');
            for (var _i = 0, productsResponse_1 = productsResponse; _i < productsResponse_1.length; _i++) {
                var pro = productsResponse_1[_i];
                if (pro.id != this.product.id) {
                    pro.favorite = global.isFavorite(pro);
                    this.productsResponse.push(pro);
                }
            }
            if (this.product.images && this.product.images.length) {
                this.imageToDisplay = this.product.images[0].src;
            }
            if (this.product.type == 'variable') {
                this.loadVariations();
            }
            this.loadReviews();
        }
        else {
            this.loadProductById(this.navParams.get('pro_id'));
        }
    }
    ItemdetailPage_1 = ItemdetailPage;
    ItemdetailPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ItemdetailPage.prototype.ionViewDidEnter = function () {
        this.cartTotal = Number(this.global.getCartItemsCount());
    };
    ItemdetailPage.prototype.loadProductById = function (proId) {
        var _this = this;
        this.translate.get('loading_product').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.productById(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), proId).subscribe(function (data) {
            _this.product = data;
            _this.product.favorite = _this.global.isFavorite(_this.product);
            if (_this.product.images && _this.product.images.length) {
                _this.imageToDisplay = _this.product.images[0].src;
            }
            if (_this.currencyIcon) {
                _this.product.regular_price_html = _this.currencyIcon + ' ' + _this.product.regular_price;
                _this.product.sale_price_html = _this.currencyIcon + ' ' + _this.product.sale_price;
            }
            else if (_this.currencyText) {
                _this.product.regular_price_html = _this.currencyText + ' ' + _this.product.regular_price;
                _this.product.sale_price_html = _this.currencyText + ' ' + _this.product.sale_price;
            }
            if (_this.product.sale_price_html.length == 0) {
                _this.product.sale_price_html = _this.product.regular_price_html;
            }
            _this.loadReviews();
            _this.dismissLoading();
            if (_this.product.type == 'variable') {
                _this.loadVariations();
            }
        }, function (err) {
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.loadVariations = function () {
        var _this = this;
        this.translate.get('loading_variations').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.productVariations(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.product.id).subscribe(function (data) {
            var variations = data;
            for (var _i = 0, variations_1 = variations; _i < variations_1.length; _i++) {
                var vari = variations_1[_i];
                var variAttris = '';
                for (var i = 0; i < vari.attributes.length; i++) {
                    var attri = vari.attributes[i].name + ' ' + vari.attributes[i].option + (i < vari.attributes.length - 1 ? ', ' : '');
                    variAttris = variAttris + attri;
                }
                vari.name = _this.product.name + ' - ' + variAttris;
                vari.type = 'variable';
                vari.images = new Array();
                vari.images.push(vari.image);
                if (!vari.sale_price) {
                    vari.sale_price = vari.regular_price;
                }
                if (_this.currencyIcon) {
                    vari.regular_price_html = _this.currencyIcon + ' ' + vari.regular_price;
                    vari.sale_price_html = _this.currencyIcon + ' ' + vari.sale_price;
                }
                else if (_this.currencyText) {
                    vari.regular_price_html = _this.currencyText + ' ' + vari.regular_price;
                    vari.sale_price_html = _this.currencyText + ' ' + vari.sale_price;
                }
            }
            _this.productVariations = variations;
            _this.dismissLoading();
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.showImage = function (src) {
        this.imageToDisplay = src;
    };
    ItemdetailPage.prototype.loadReviews = function () {
        var _this = this;
        var subscription = this.service.productsReviews(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), this.product.id).subscribe(function (data) {
            var reviews = data;
            var approved = new Array();
            for (var _i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
                var rev = reviews_1[_i];
                if (rev.verified) {
                    approved.push(rev);
                }
            }
            _this.reviews = approved;
        }, function (err) {
        });
        this.subscriptions.push(subscription);
    };
    ItemdetailPage.prototype.itemdetailPage = function (pro) {
        this.navCtrl.push(ItemdetailPage_1, { pro: pro, pros: this.productsResponse });
    };
    ItemdetailPage.prototype.viewMore = function () {
        this.details = true;
    };
    ItemdetailPage.prototype.viewLess = function () {
        this.details = false;
    };
    ItemdetailPage.prototype.toggleFavorite = function (pro) {
        pro.favorite = this.global.toggleFavorite(pro);
    };
    ItemdetailPage.prototype.shareProduct = function (pro) {
        this.socialSharing.share('Found this product on ' + this.config.appName, pro.name, null, pro.permalink).then(function (data) {
            console.log(data);
        }).catch(function (err) {
            console.log(err);
        });
    };
    ItemdetailPage.prototype.addToCart = function () {
        var _this = this;
        if (this.product.in_stock && this.product.purchasable) {
            var added = this.global.addCartItem(this.product);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ItemdetailPage.prototype.buyNow = function () {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__shippining_shippining__["a" /* ShippiningPage */], { pro: this.product });
        }
        else {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN, __WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT, JSON.stringify(this.product));
            this.translate.get('auth_required').subscribe(function (value) {
                _this.showToast(value);
            });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
        }
    };
    ItemdetailPage.prototype.buyVariation = function (variation) {
        var _this = this;
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].USER_KEY));
        if (user != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__shippining_shippining__["a" /* ShippiningPage */], { pro: variation });
        }
        else {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN, __WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].TEMP_OPEN_PRODUCT, JSON.stringify(variation));
            this.translate.get('auth_required').subscribe(function (value) {
                _this.showToast(value);
            });
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__login_login__["a" /* LoginPage */]);
        }
    };
    ItemdetailPage.prototype.addVariation = function (variation) {
        var _this = this;
        if (variation.in_stock && variation.purchasable) {
            var added = this.global.addCartItem(variation);
            if (added) {
                this.cartTotal = this.cartTotal + 1;
            }
            this.translate.get(added ? 'item_added' : 'item_updated').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('item_unavailable').subscribe(function (value) {
                _this.showToast(value);
            });
        }
    };
    ItemdetailPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ItemdetailPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ItemdetailPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ItemdetailPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ItemdetailPage.prototype.cartPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
        modal.onDidDismiss(function () {
            _this.cartTotal = Number(_this.global.getCartItemsCount());
        });
        modal.present();
    };
    ItemdetailPage.prototype.searchPage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    ItemdetailPage = ItemdetailPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-itemdetail ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\itemdetail\itemdetail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <img src="assets/imgs/ic_menu.png">\n\n        </button>\n\n        <ion-title *ngIf="product">\n\n            <p [innerHTML]="product.categories[0].name"></p>\n\n            <div class="icon-box" (click)="cartPage()">\n\n                <img src="assets/imgs/ic_my_cart.png">\n\n                <ion-badge>{{cartTotal}}</ion-badge>\n\n            </div>\n\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div *ngIf="product" class="img-section shadow-bottom" text-center>\n\n        <div class="img-box">\n\n            <img *ngIf="imageToDisplay" data-src="{{imageToDisplay}}">\n\n            <img *ngIf="!imageToDisplay" src="assets/imgs/veg-1.png">\n\n        </div>\n\n\n\n        <div *ngIf="product.images && product.images.length" class="tab-btn-box">\n\n            <div class="tab-btn">\n\n                <img data-src="{{product.images[0].src}}" (click)="showImage(product.images[0].src)">\n\n            </div>\n\n            <div *ngIf="product.images.length > 1" class="tab-btn">\n\n                <img data-src="{{product.images[1].src}}" (click)="showImage(product.images[1].src)">\n\n            </div>\n\n            <div *ngIf="product.images.length > 2" class="tab-btn">\n\n                <img data-src="{{product.images[2].src}}" (click)="showImage(product.images[2].src)">\n\n            </div>\n\n        </div>\n\n        <div class="d-flex" style="align-items: stretch;">\n\n            <span class="product_name">{{product.name}}</span>\n\n            <span class="icon" item-end>\n\n                <ion-icon name="share-alt" (click)="shareProduct(product)"></ion-icon>\n\n            </span>\n\n        </div>\n\n    </div>\n\n\n\n    <!-- Variations start -->\n\n    <div *ngIf="productVariations && productVariations.length" class="your-items" padding-top>\n\n        <ion-card-header>\n\n            <p>{{ \'variations\' | translate }}</p>\n\n        </ion-card-header>\n\n        <ion-card-content *ngFor="let item of productVariations">\n\n            <ion-row>\n\n                <ion-col col-3>\n\n                    <div *ngIf="item.images && item.images.length" class="img-box">\n\n                        <img data-src="{{item.images[0].src}}">\n\n                    </div>\n\n                    <div *ngIf="!item.images || !item.images.length" class="img-box">\n\n                        <img src="assets/imgs/suit_PNG8132.png">\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-9>\n\n                    <h4>{{item.name}}</h4>\n\n                    <div class="rate">\n\n                        <div style="display: flex;" class="price-box">\n\n                            <div *ngIf="item.regular_price != item.sale_price" class="price text-light" padding-right\n\n                                [innerHTML]="item.regular_price_html">\n\n                            </div>\n\n                            <div class="price text-sky" [innerHTML]="item.sale_price_html">\n\n                            </div>\n\n                        </div>\n\n                        <p text-right class="card-bottom">\n\n                            <button ion-button class="small button btn-round bg-green" text-right (click)="buyVariation(item)">{{\n\n                                \'buy_now\' | translate }}</button>\n\n                        </p>\n\n                    </div>\n\n                    <p class="card-bottom">\n\n                        <button ion-button class="small button btn-round" text-right (click)="addVariation(item)">{{\n\n                            \'add_to_cart\' | translate }}</button>\n\n                    </p>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </div>\n\n    <!-- Variations end -->\n\n\n\n    <div *ngIf="product && product.description" class="about-section shadow-bottom bg-white">\n\n        <h3>{{ \'about_product\' | translate }}</h3>\n\n        <p [innerHTML]="product.description">\n\n        </p>\n\n    </div>\n\n    <div *ngIf="product && product.type == \'simple\'" style="height: 60px"></div>\n\n    <div *ngIf="product && product.type == \'simple\'" class="price-section shadow-bottom bg-white">\n\n        <div class="d-flex">\n\n            <div class="rate">\n\n                <div style="display: flex;" class="price-box">\n\n                    <div *ngIf="product.regular_price != product.sale_price" class="price text-light" padding-right [innerHTML]="product.regular_price_html">\n\n                    </div>\n\n                    <div class="price text-sky" [innerHTML]="product.sale_price_html">\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <p text-right class="card-bottom">\n\n                <button ion-button class="small button btn-round bg-green" text-right (click)="buyNow()">{{\n\n                    \'buy_now\' | translate }}</button>\n\n            </p>\n\n            \n\n            <p class="card-bottom">\n\n                <button ion-button class="small button btn-round" text-right (click)="addVariation(product)">{{\n\n                    \'add_to_cart\' | translate }}</button>\n\n            </p>\n\n        </div>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\itemdetail\itemdetail.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_10__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ItemdetailPage);
    return ItemdetailPage;
    var ItemdetailPage_1;
}());

//# sourceMappingURL=itemdetail.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippiningPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__payment_payment__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__code_code__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addressselect_addressselect__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_cart_item_models__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ShippiningPage = /** @class */ (function () {
    function ShippiningPage(translate, modalCtrl, navCtrl, navParams, global, toastCtrl) {
        var _this = this;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.editMainCart = false;
        this.total = 0;
        this.total_items = 0;
        this.total_items_html = '0';
        this.total_html = '0';
        this.deliveryPayble = '0';
        this.couponAmount = '0';
        this.addressChangeText = 'Change';
        this.currencyIcon = '';
        this.currencyText = '';
        this.submitBtnLbl = '';
        var product = this.navParams.get('pro');
        if (product == null) {
            this.cartItems = global.getCartItems();
            this.editMainCart = true;
        }
        else {
            var cartItems = new Array();
            var cartItem = new __WEBPACK_IMPORTED_MODULE_7__models_cart_item_models__["a" /* CartItem */]();
            cartItem.product = product;
            cartItem.product_id = product.id;
            cartItem.quantity = 1;
            cartItems.push(cartItem);
            this.cartItems = cartItems;
        }
        var currency = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].CURRENCY));
        if (currency) {
            this.currencyText = currency.value;
            var iconText = currency.options[currency.value];
            this.currencyIcon = iconText.substring(iconText.indexOf('(') + 1, iconText.length - 1);
        }
        this.deliveryPayble = this.currencyIcon + ' ' + this.deliveryPayble;
        this.calculateTotal();
        if (this.total >= 1000) {
            this.translate.get('continue').subscribe(function (value) {
                _this.submitBtnLbl = value;
            });
        }
        else {
            this.translate.get('error_Min_Payment').subscribe(function (value) {
                _this.submitBtnLbl = value;
            });
        }
    }
    ShippiningPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.selectedAddress = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS));
        this.translate.get(this.selectedAddress == null ? 'add' : 'change').subscribe(function (value) {
            _this.addressChangeText = value;
        });
    };
    ShippiningPage.prototype.addressPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__addressselect_addressselect__["a" /* AddressSelectPage */], { action: 'choose' });
    };
    ShippiningPage.prototype.removeItem = function (product) {
        if (this.editMainCart) {
            this.global.removeCartItem(product);
            this.cartItems = this.global.getCartItems();
            this.calculateTotal();
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                this.cartItems.splice(pos, 1);
                this.cartItems = this.cartItems;
            }
        }
        if (this.cartItems.length == 0) {
            this.navCtrl.pop();
        }
    };
    ShippiningPage.prototype.decrementItem = function (product) {
        if (this.editMainCart) {
            var decremented = this.global.decrementCartItem(product);
            if (!decremented) {
                this.cartItems = this.global.getCartItems();
                this.calculateTotal();
            }
            else {
                this.total = this.total - Number(product.sale_price);
                this.total_html = this.currencyIcon + ' ' + this.total;
                this.calculateTotal();
            }
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                if (this.cartItems[pos].quantity > 1) {
                    this.cartItems[pos].quantity = this.cartItems[pos].quantity - 1;
                    this.cartItems = this.cartItems;
                    this.calculateTotal();
                }
                else {
                    this.cartItems.splice(pos, 1);
                    this.cartItems = this.cartItems;
                    this.total_html = this.currencyIcon + ' ' + (this.total - Number(product.sale_price));
                }
            }
        }
        if (this.cartItems.length == 0) {
            this.navCtrl.pop();
        }
    };
    ShippiningPage.prototype.incrementItem = function (product) {
        if (this.editMainCart) {
            var incremented = this.global.incrementCartItem(product);
            if (incremented) {
                this.total = this.total + Number(product.sale_price);
                this.total_html = this.currencyIcon + ' ' + this.total;
                this.calculateTotal();
            }
        }
        else {
            var pos = -1;
            for (var i = 0; i < this.cartItems.length; i++) {
                if (product.id == this.cartItems[i].product_id) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                this.cartItems[pos].quantity = this.cartItems[pos].quantity + 1;
                this.cartItems = this.cartItems;
                this.calculateTotal();
            }
        }
    };
    ShippiningPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ShippiningPage.prototype.calculateTotal = function () {
        var _this = this;
        var sum = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var item = _a[_i];
            sum = sum + Number(item.product.sale_price) * item.quantity;
        }
        this.total_items = sum;
        this.total = (sum - (this.coupon ? this.coupon.discount_type == 'percent' ? (sum * Number(this.coupon.amount) / 100) : Number(this.coupon.amount) : 0));
        this.total = Math.round(this.total * 100 + Number.EPSILON) / 100;
        this.total_items_html = this.currencyIcon + ' ' + this.total_items;
        this.total_html = this.currencyIcon + ' ' + this.total;
        if (this.total >= 1000) {
            this.translate.get('continue').subscribe(function (value) {
                _this.submitBtnLbl = value;
            });
        }
        else {
            this.translate.get('error_Min_Payment').subscribe(function (value) {
                _this.submitBtnLbl = value;
            });
        }
    };
    ShippiningPage.prototype.removeCoupon = function () {
        this.coupon = null;
        this.calculateTotal();
        window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
    };
    ShippiningPage.prototype.paymentPage = function () {
        var _this = this;
        if (this.selectedAddress == null) {
            this.translate.get('field_error_address').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            if (!this.coupon) {
                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON);
            }
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__payment_payment__["a" /* PaymentPage */], { cart: this.cartItems, totalItems: this.total_items, total: this.total });
        }
    };
    ShippiningPage.prototype.codePage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__code_code__["a" /* CodePage */]);
        modal.onDidDismiss(function () {
            var coupon = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].SELECTED_COUPON));
            if (coupon) {
                if (coupon.discount_type == 'fixed_product') {
                    var allowed = false;
                    for (var _i = 0, _a = coupon.product_ids; _i < _a.length; _i++) {
                        var itemCA = _a[_i];
                        for (var _b = 0, _c = _this.cartItems; _b < _c.length; _b++) {
                            var item = _c[_b];
                            if (itemCA == Number(item.product_id)) {
                                allowed = true;
                                break;
                            }
                        }
                        if (allowed) {
                            break;
                        }
                    }
                    if (allowed) {
                        _this.coupon = coupon;
                        _this.couponAmount = _this.currencyIcon + ' ' + _this.coupon.amount + (_this.coupon.discount_type == 'percent' ? '%' : '');
                        _this.calculateTotal();
                    }
                }
                else {
                    _this.coupon = coupon;
                    _this.couponAmount = _this.currencyIcon + ' ' + _this.coupon.amount + (_this.coupon.discount_type == 'percent' ? '%' : '');
                    _this.calculateTotal();
                }
            }
        });
        modal.present();
    };
    ShippiningPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ShippiningPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shippining ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\shippining\shippining.html"*/'<ion-header>\n\n    <ion-navbar hideBackButton="true">\n\n        <button style="background-color:transparent;" ion-button (click)="goBack()">\n\n            <ion-icon style="color: #ffffff !important; font-size:2.4rem;" name="md-arrow-back"></ion-icon>\n\n        </button>\n\n        <ion-title>{{ \'confirm_order_title\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <div class="address-section">\n\n        <ion-row text-center class="status">\n\n            <ion-col class="complate">\n\n                <ion-icon name="ios-checkmark-circle"></ion-icon>\n\n                <span>{{ \'confirm_order_tab_title_1\' | translate }}</span>\n\n            </ion-col>\n\n            <ion-col class="processing">\n\n                <ion-icon name="md-radio-button-off"></ion-icon>\n\n                <span>{{ \'confirm_order_tab_title_2\' | translate }}</span>\n\n            </ion-col>\n\n            <ion-col class="panding">\n\n                <ion-icon name="ion-record"></ion-icon>\n\n                <span>{{ \'confirm_order_tab_title_3\' | translate }}</span>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-card>\n\n            <ion-card-header>\n\n                <p>\n\n                    {{ \'confirm_order_address_title\' | translate }}\n\n                    <span class="text-sky" (click)="addressPage()">{{addressChangeText}}\n\n                        <ion-icon name="ios-arrow-forward" class="icon"></ion-icon>\n\n                    </span>\n\n                </p>\n\n            </ion-card-header>\n\n            <ion-card-content *ngIf="!selectedAddress">\n\n                <div class="addres-detail">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{ \'confirm_order_address_no\' | translate }}\n\n                    </h3>\n\n                    <p>{{ \'confirm_order_address_add\' | translate }}</p>\n\n                </div>\n\n            </ion-card-content>\n\n            <ion-card-content *ngIf="selectedAddress">\n\n                <div class="addres-detail">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{selectedAddress.first_name}}\n\n                    </h3>\n\n                    <p>{{selectedAddress.address_1}}, {{selectedAddress.address_2}}\n\n                        <br> {{selectedAddress.city}}</p>\n\n                    <p>{{selectedAddress.phone}}</p>\n\n                </div>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n    <div class="your-items">\n\n        <ion-card *ngIf="cartItems && cartItems.length">\n\n            <ion-card-header>\n\n                <p>{{ \'confirm_order_items_title\' | translate }}</p>\n\n            </ion-card-header>\n\n            <ion-card-content *ngFor="let item of cartItems">\n\n                <ion-row>\n\n                    <ion-col col-4>\n\n                        <div *ngIf="item.product.images && item.product.images.length" class="img-box">\n\n                            <img data-src="{{item.product.images[0].src}}">\n\n                        </div>\n\n                        <div *ngIf="item.product.images == null || item.product.images.length == 0" class="img-box">\n\n                            <img src="assets/imgs/suit_PNG8132.png">\n\n                        </div>\n\n                    </ion-col>\n\n                    <ion-col col-8>\n\n                        <h4>{{item.product.name}}</h4>\n\n                        <p class="d-flex" float-left [innerHTML]="item.product.sale_price_html">\n\n                        </p>\n\n                        <div class="price">\n\n                            <div>\n\n                                <div class="d-flex btn-grup" float-right>\n\n                                    <div class="btn" (click)="decrementItem(item.product)">\n\n                                        -\n\n                                    </div>\n\n                                    <span>{{item.quantity}}</span>\n\n                                    <div class="btn" (click)="incrementItem(item.product)">\n\n                                        +\n\n                                    </div>\n\n                                </div>\n\n                                <div style="display: block;clear: both"></div>\n\n                                <p text-right class="text-sky" (click)="removeItem(item.product)">\n\n                                    {{ \'confirm_order_items_remove\' | translate }}\n\n                                </p>\n\n                            </div>\n\n                        </div>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n    <div class="receipt">\n\n        <ion-card>\n\n            <ion-card-header>\n\n                <p>{{ \'confirm_order_items_price\' | translate }}\n\n                    <span text-right [innerHTML]="total_items_html">\n\n                    </span>\n\n                </p>\n\n                <p>{{ \'confirm_order_items_delivery\' | translate }}\n\n                    <span text-right [innerHTML]="deliveryPayble">\n\n                    </span>\n\n                </p>\n\n                <p *ngIf="coupon">{{ \'confirm_order_coupon_to_apply\' | translate : {code:coupon.code} }}\n\n                    <span text-right [innerHTML]="couponAmount">\n\n                    </span>\n\n                    <ion-icon name="md-close" class="cross" (click)="removeCoupon()"></ion-icon>\n\n                </p>\n\n                <div *ngIf="!coupon" text-center class="text-sky" (click)="codePage()">{{ \'confirm_order_coupon\' | translate }}</div>\n\n            </ion-card-header>\n\n            <ion-card-content>\n\n                <p>{{ \'confirm_order_payble\' | translate }}\n\n                    <span text-right [innerHTML]="total_html">\n\n                    </span>\n\n                </p>\n\n                <button [disabled]="total<1000" ion-button full class="bg-green btn-round green-shadow btn-text" (click)="paymentPage()" style="width:100%">{{submitBtnLbl}}</button>\n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\shippining\shippining.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_global__["a" /* Global */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], ShippiningPage);
    return ShippiningPage;
}());

//# sourceMappingURL=shippining.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressSelectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__address_address__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddressSelectPage = /** @class */ (function () {
    function AddressSelectPage(translate, navParams, navCtrl, modalCtrl, viewCtrl, toastCtrl, service, loadingCtrl) {
        this.translate = translate;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.addresses = new Array();
        this.loadingShown = false;
        this.subscriptions = [];
        this.select = (navParams.get('action') != null);
    }
    AddressSelectPage.prototype.ionViewDidEnter = function () {
        var addresses = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS_LIST));
        if (addresses != null) {
            this.addresses = addresses;
        }
    };
    AddressSelectPage.prototype.addressNew = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__address_address__["a" /* AddressPage */]);
    };
    AddressSelectPage.prototype.addressEditSelect = function (address) {
        var _this = this;
        if (this.select) {
            for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
                var add = _a[_i];
                if (add.id == -100) {
                    add.id = address.id;
                    break;
                }
            }
            address.id = -100;
            var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY));
            user.billing = address;
            user.shipping = address;
            user.first_name = address.first_name;
            user.last_name = address.last_name;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].USER_KEY, JSON.stringify(user));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].SELECTED_ADDRESS, JSON.stringify(address));
            this.translate.get('just_a_moment').subscribe(function (value) {
                _this.showToast(value);
            });
            var subscription = this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].ADMIN_API_KEY), String(user.id), user).subscribe(function (data) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            });
            this.subscriptions.push(subscription);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__address_address__["a" /* AddressPage */], { address: address });
        }
    };
    AddressSelectPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    AddressSelectPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    AddressSelectPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    AddressSelectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addressselect ',template:/*ion-inline-start:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\addressselect\addressselect.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n            <ion-icon class="menu-icon">\n\n                <img src="assets/imgs/ic_menu.png">\n\n            </ion-icon>\n\n        </button>\n\n        <ion-title>{{ \'nav_title_my_address\' | translate }}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="address-section bg-light" style="min-height: calc(100vh - 56px);" padding>\n\n        <p text-center padding-bottom margin-bottom>{{ \'my_address_heading\' | translate }}</p>\n\n        <ion-card>\n\n            <ion-card-content *ngIf="!addresses || !addresses.length">\n\n                <div class="addres-detail" (click)="addressNew()">\n\n                    <h3 class="text-light">\n\n                        <ion-icon name="ios-add-circle-outline" class="icon-position text-light"></ion-icon>{{ \'my_address_add_new\' | translate }}\n\n                    </h3>\n\n                </div>\n\n            </ion-card-content>\n\n            <ion-card-content *ngIf="addresses && addresses.length">\n\n                <div *ngFor="let address of addresses" class="addres-detail" (click)="addressEditSelect(address)">\n\n                    <h3>\n\n                        <ion-icon name="ios-pin-outline" class="icon-position"></ion-icon>{{address.first_name}}\n\n                    </h3>\n\n                    <p>{{address.address_1}}, {{address.address_2}}\n\n                        <br> {{address.city}}</p>\n\n                    <p>{{address.phone}}</p>\n\n                </div>\n\n            </ion-card-content>\n\n        </ion-card>\n\n        <h4 text-center padding-bottom margin-bottom (click)="addressNew()">{{ \'my_address_add_new\' | translate }}</h4>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\personal\personal\KiranaDoorstep-multiLingual\kiranadoorstep\kiranadoorstep\src\pages\addressselect\addressselect.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_wordpress_client_service__["a" /* WordpressClient */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], AddressSelectPage);
    return AddressSelectPage;
}());

//# sourceMappingURL=addressselect.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterRequest; });
var RegisterRequest = /** @class */ (function () {
    function RegisterRequest(email, username, password, firstname, lastname) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.roles = 'contributor';
        this.first_name = firstname;
        this.last_name = lastname;
    }
    return RegisterRequest;
}());

//# sourceMappingURL=register-request.models.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthCredential; });
var AuthCredential = /** @class */ (function () {
    function AuthCredential(username, password) {
        this.username = username;
        this.password = password;
    }
    return AuthCredential;
}());

//# sourceMappingURL=auth-credential.models.js.map

/***/ })

},[258]);
//# sourceMappingURL=main.js.map