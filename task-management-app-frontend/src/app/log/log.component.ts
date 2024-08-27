import { Component, EventEmitter, Inject, inject, Output, PLATFORM_ID } from '@angular/core';
import { SnackbarComponent } from "../utility/snackbar/snackbar.component";
import { LoaderComponent } from "../utility/loader/loader.component";
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [SnackbarComponent, LoaderComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  loginmode: boolean = true;
  isloading: boolean = false;
  errormessage: string | undefined;
  accessToken:string;
  authobs: Observable<any>;

  signupinform: FormGroup;

  router = inject(Router)
  authservice = inject(AuthService);

  ngOnInit(): void {
    this.authservice.logMode.subscribe((data)=>{
      this.loginmode=data;
    })
    this.signupinform = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  onsubmit() {
    // console.log(this.signupinform.value);

    const username = this.signupinform.value.username;
    const passward = this.signupinform.value.password;

    // console.log(username)
    // console.log(passward)

    if (this.loginmode) {
      this.isloading = true;
      this.authservice.signin(username, passward).subscribe({
        next: (res) => {
          let data:any=res;
          this.accessToken=data.accessToken;
          // console.log(this.accessToken);

          this.authservice.accessToken.next(this.accessToken);

          if (isPlatformBrowser(this.platformId)){
            localStorage.setItem('jwt', JSON.stringify(this.accessToken));
          }

          this.isloading = false;
          this.router.navigate(['/Home']);
        },
        error: (errmsg) => {
          this.isloading = false;
          this.errormessage = errmsg;
          console.log(this.errormessage)
  
          this.hidesnackbar();
        }
      });

    } else {
      this.isloading = true;
      this.authservice.signup(username, passward).subscribe({
        next: (res) => {
          this.loginmode = !this.loginmode;
          this.isloading = false;
        },
        error: (errmsg) => {
          this.isloading = false;
          this.errormessage = errmsg;
          console.log(this.errormessage)
  
          this.hidesnackbar();
        }
      });
    }

    this.signupinform.reset();

  }

  hidesnackbar() {
    setTimeout(() => {
      this.errormessage = null;
    }, 3000);
  }

  onchangemode() {
    this.loginmode = !this.loginmode;
  }

}
