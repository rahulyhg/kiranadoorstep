import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { TranslateService } from '@ngx-translate/core';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { Faq } from '../../models/faq.models';

@Component({
  selector: 'page-help ',
  templateUrl: 'help.html',
  providers: [WordpressClient]
})
export class HelpPage {
  private faqs: Array<Faq> = [];

  constructor(public navCtrl: NavController, private service: WordpressClient, public translate: TranslateService, public modalCtrl: ModalController) {
    service.getFaqs().subscribe(data => {
      this.faqs = data;
    }, err => {
      console.log(err);
    });
  }

  faqExpandToggle(faq: Faq) {
    faq.selected = !faq.selected;
  }

  cartPage() {
    let modal = this.modalCtrl.create(CartPage);
    modal.present();
  }

}
