import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);
  constructor(private auth: Auth) {}

  // Login
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Logout
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Usuario actual
  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  async getUserByEmail(email: string) {
    const usersRef = collection(this.firestore, 'Users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as any;
  }
}
