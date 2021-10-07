import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ILoginData, IRegisterData } from './dto/auth-service.interface';
import { HOME_PATH } from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: string | undefined = undefined;
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  updateAuthState(): void {
    this.afAuth.authState.subscribe(async (data) => {
      const result = await data?.getIdTokenResult();
      this.userToken = result?.token;
    });
  }

  async login(credentials: ILoginData) {
    try {
      const response = await this.afAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      const tokenResult = await response.user?.getIdTokenResult();
      this.userToken = tokenResult?.token;
      this.router.navigate([HOME_PATH]);
    } catch (error) {
      console.warn('CURRENT USER', error);
    }
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
