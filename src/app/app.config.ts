import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBM4GKvcPgyfDgReSacVWUmUwdUKK7kLds",
  authDomain: "proyecto-practica-f7ba3.firebaseapp.com",
  projectId: "proyecto-practica-f7ba3",
  storageBucket: "proyecto-practica-f7ba3.firebasestorage.app",
  messagingSenderId: "513996616753",
  appId: "1:513996616753:web:79e17e9ce187a9e5dc1110"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
