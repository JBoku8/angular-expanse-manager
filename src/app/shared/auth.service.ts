import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ILoginData, IRegisterData } from './dto/auth-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  login(credentials: ILoginData) {
    this.afAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        // currentUser
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.warn('CURRENT USER', err);
      });
  }
  register(credentials: IRegisterData) {
    this.afAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        this.logOut();
      })
      .catch((err) => {
        console.warn('register', err);
      });
  }
  logOut() {
    this.afAuth.signOut();
    this.router.navigate(['/auth/login']);
  }
}
