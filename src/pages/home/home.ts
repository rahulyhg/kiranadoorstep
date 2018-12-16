import { Component, Inject } from '@angular/core';
import { NavController, ModalController, MenuController, Events, Platform } from 'ionic-angular';

import { Global } from '../../providers/global';

import { CategoryPage } from '../category/category';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';
import { WishlistPage } from '../wishlist/wishlist';
import { ShirtsPage } from '../shirts/shirts';
import { Category } from "../../models/category.models";
import { Constants } from "../../models/constants.models";
import { CartItem } from "../../models/cart-item.models";
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Banner } from '../../models/banner.models';
import { ShippiningPage } from '../shippining/shippining';
import { Product } from '../../models/product.models';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Global, WordpressClient]
})

export class HomePage {
  private subscriptions: Array<Subscription> = [];
  private banners = new Array<Banner>();
  private categoriesAll = new Array<Category>();
  private cartTotal = 0;
  private appTitle;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, public translate: TranslateService, private events: Events, private service: WordpressClient, public modalCtrl: ModalController, public navCtrl: NavController, public menu: MenuController, private global: Global) {
    this.appTitle = config.appName;
    events.subscribe('category:setup', () => {
      this.setupCategories();
    });
    this.setupCategories();
    this.loadBanners();

    let toOpen: string = window.localStorage.getItem(Constants.TEMP_OPEN);
    let user = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    if (user && toOpen && toOpen.length) {
      if (toOpen == Constants.TEMP_OPEN_CART) {
        this.navCtrl.push(ShippiningPage);
      } else if (toOpen == Constants.TEMP_OPEN_PRODUCT) {
        let product: Product = JSON.parse(window.localStorage.getItem(Constants.TEMP_OPEN_PRODUCT));
        this.navCtrl.push(ShippiningPage, { pro: product });
      }

      window.localStorage.removeItem(Constants.TEMP_OPEN);
      window.localStorage.removeItem(Constants.TEMP_OPEN_CART);
      window.localStorage.removeItem(Constants.TEMP_OPEN_PRODUCT);
    }
  }

  setupCategories() {
    let categories: Array<Category> = JSON.parse(window.localStorage.getItem(Constants.PRODUCT_CATEGORIES_PARENT));
    console.log('categories',categories);
    let cats = new Array<Category>();
    for (let cat of categories) {
      /* if (cats.length == 8) {
        break;
      } */
      if (Number(cat.parent) == 0) {
        cats.push(cat);
      }
    }
    cats.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
    this.translate.get('more').subscribe(value => {
      let more = new Category();
      more.name = value;
      more.id = '-1';
      cats.push(more);
      this.categoriesAll = cats;
    });
  }

  ionViewDidEnter() {
    this.cartTotal = Number(this.global.getCartItemsCount());
  }

  loadBanners() {
    let savedBanners: Array<Banner> = JSON.parse(window.localStorage.getItem('banners'));
    if (savedBanners && savedBanners.length) {
      this.banners = savedBanners;
    }
    let subscription: Subscription = this.service.banners().subscribe(data => {
      this.banners = data;
      window.localStorage.setItem('banners', JSON.stringify(this.banners));
    }, err => {
    });
    this.subscriptions.push(subscription);
  }

  menuToggle() {
    if (!this.menu.isEnabled()) {
      this.menu.enable(true);
      this.menu.swipeEnable(true);
    }
    if (this.menu.isOpen()) {
      this.menu.close();
    } else {
      this.menu.open();
    }
  }

  categoryPageId(catId) {
    this.navCtrl.push(ShirtsPage, { catId: catId });
  }

  categoryPage(cat) {
    if (cat && cat.id != '-1') {
      this.navCtrl.push(ShirtsPage, { cat: cat });
    } else {
      this.navCtrl.push(CategoryPage);
    }
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
    // let modal = this.modalCtrl.create(SearchPage);
    // modal.present();
  }

  cartPage() {
    /*this.navCtrl.push(CartPage);*/
    let modal = this.modalCtrl.create(CartPage);
    modal.onDidDismiss(() => {
      this.cartTotal = Number(this.global.getCartItemsCount());
    });
    modal.present();
  }


  slides = [
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

  homeicons = [
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

}
