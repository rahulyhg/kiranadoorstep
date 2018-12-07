import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the LanguageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'language',
  templateUrl: 'language.html'
})
export class LanguageComponent implements OnInit {

  @Input() languageFlag:boolean;
  @Output() languageFlagChange = new EventEmitter();
  constructor(private alertCtrl: AlertController,public translate: TranslateService) {
  }

  ngOnInit(){
    this.presentPrompt();
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Language - భాష',
      buttons: [
        {
          text: 'English',
          role: 'english',
          handler: data => {
            console.log('English clicked');
            this.translate.use('en');
            this.languageFlag = false;
            this.languageFlagChange.emit(false);
          }
        },
        {
          text: 'తెలుగు',
          role: 'telugu',
          handler: data => {
            console.log('Telugu clicked');
            this.translate.use('te');
            this.languageFlag = false;
            this.languageFlagChange.emit(false);
          }
        }
      ]
    });
    alert.present();
  }
}
