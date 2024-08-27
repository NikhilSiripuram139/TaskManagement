import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  http = inject(HttpClient);
  logMode = new Subject<boolean>();
  accessToken = new BehaviorSubject<string>(null);

  private tokenexpiretime:any;


  signup(username: string, password: string) {
    console.log("In signup!")
    const data = { username, password };
    try {
      console.log("You've signed in successfully, now you can login!")
      return this.http.post('http://localhost:3000/auth/signup', data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  signin(username: string, password: string): Observable<string> {
    console.log("In signin!")
    const data = { username, password };
    try {
      let logobs:Observable<any>;
      this.logMode.next(true);
      logobs=this.http.post<string>('http://localhost:3000/auth/signin', data);
      this.autologout();
      return logobs; 
    } catch (error) {
      console.log(error);
      this.logMode.next(false);
      return error;
    }
  }

  logout() {
    this.accessToken.next('');
    localStorage.removeItem('jwt');
    this.logMode.next(false);


    if (this.tokenexpiretime) {
      clearTimeout(this.tokenexpiretime);
    }

    this.tokenexpiretime = null;
  }

  autologin() {

    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('jwt'));
      // console.log(user);
      this.logMode.next(true);

      if (!user) {
        this.logMode.next(false);
        return;
      }

      this.accessToken.next(user);

      if (user) {
        this.autologout();
      }
    }

  }

  autologout() {
    this.tokenexpiretime = setTimeout(() => {
      this.logout();
    }, 3600000);
  }

}
