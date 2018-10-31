import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface FirebaseConfig {
	apiKey: string,
	authDomain: string,
	databaseURL: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	webApplicationId: string
}

export interface AppConfig {
	appName: string;
	apiBase: string;
	perPage: string;
	consumerKey: string;
	consumerSecret: string;
	adminUsername: string;
	adminPassword: string;
	oneSignalAppId: string;
	oneSignalGPSenderId: string;
	paypalSandbox: string;
	paypalProduction: string;
	payuSalt: string;
	payuKey: string;
	availableLanguages: Array<any>;
	firebaseConfig: FirebaseConfig;
}

export const BaseAppConfig: AppConfig = {
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