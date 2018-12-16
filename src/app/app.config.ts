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
	apiBase: "https://www.kiranadoorstep.com/wp-json/",
	perPage: "5",
	consumerKey: "ck_7166c6767460f4d5bdc887a058c023a11d23b457",
	consumerSecret: "cs_c4799f97e050d7141a41f23fe13fbb89dffe0355",
	adminUsername: "",
	adminPassword: "",
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