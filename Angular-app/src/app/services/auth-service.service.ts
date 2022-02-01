import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => (this.authState = auth));
  }

  setCurrentUser(user: any) {
    this.authState = user;
  }

  registerWithEmail(email: any, password: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  loginWithEmail(email: any, password: any): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        console.log(this.authState.user._delegate);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
  getCurrentId(): string {
    return this.authState !== null ? this.authState.user._delegate.uid : '';
  }
  getUserName() {
    if (this.authState !== null) {
      if (this.authState.user == null) {
        return this.authState._delegate.displayName !== null
          ? this.authState._delegate.displayName
          : this.authState._delegate.email;
      } else {
        return this.authState.user._delegate.displayName !== null
          ? this.authState.user._delegate.displayName
          : this.authState.user._delegate.email;
      }
    }
  }
  getUserPhoto() {
    if (this.authState !== null) {
      if (this.authState.user == null) {
        return this.authState._delegate.photoURL == null
          ? ''
          : this.authState._delegate.photoURL;
      } else {
        return this.authState.user._delegate.photoURL == null
          ? ''
          : this.authState.user._delegate.photoURL;
      }
    }
  }
  logOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}
