import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  authservice = inject(AuthService);
    
    intercept(req: HttpRequest<any>, next: HttpHandler){

        return this.authservice.accessToken.pipe(take(1), exhaustMap((user)=>{
            console.log('authinterceptor called!')
            
            if(!user){
                return next.handle(req);
            }
            
            // console.log(user);
            const authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${user}`
                }
              });
            return next.handle(authReq);
        }))
    }
}
