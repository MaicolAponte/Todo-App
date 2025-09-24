// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private currentUser: any = null;

  constructor() {}

  // ✅ Login
  async loginEmail(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    await this.loadUserData(credential.user.uid);
  }

  // ✅ Registro
  async registerUser(email: string, password: string, extraData: any) {
    const credential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;

    const userDoc = doc(this.firestore, `Users/${uid}`);
    await setDoc(userDoc, {
      ...extraData,
      email,
    });

    await this.loadUserData(uid);
  }

  // ✅ Obtener datos del usuario desde Firestore
  private async loadUserData(uid: string) {
    const userDoc = doc(this.firestore, `Users/${uid}`);
    const snapshot = await getDoc(userDoc);
    if (snapshot.exists()) {
      this.currentUser = { uid, ...snapshot.data() };
    } else {
      this.currentUser = null;
    }
    console.log(this.currentUser)
  }

  // ✅ Saber si está logueado
  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  // ✅ Obtener rol
  getUserRole(): string | null {
    return this.currentUser?.rol || null;
  }

  // ✅ Obtener usuario
  getCurrentUser() {
    return this.currentUser;
  }

  // ✅ Logout
  async logout() {
    await this.auth.signOut();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
