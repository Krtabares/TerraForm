import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/guard/auth/auth.service';
import { AlertService } from 'src/modules/shared/services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private alert: AlertService) {
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      Password: new FormControl('', [Validators.pattern(/^(?!.*').*$/)]),
      RememberMe: new FormControl(true)
    })
   }
  loginForm: FormGroup;


  ngOnInit(): void {
  }

  singIn() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        // console.log('response headers', res.headers.keys())

        if (res.msg == 'usuario no encontrado') {
          this.alert.warning("Datos Invalidos", "El usuario o la contraseña no son correctos")
        } else {
          // console.log(res);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("token_user_access", res.token);
          localStorage.setItem("remember_user", JSON.stringify({ value: this.loginForm.get("RememberMe").value }));
          this.auth.setUser(res['user']);

          this.auth.setPermissions(res['permissions'])
          this.router.navigate(['../admin']);
        }
      }, (err:any)=>{
        this.alert.warning("Datos Invalidos", "El usuario o la contraseña no son correctos")
      })
    } else {
      this.alert.warning("Datos Invalidos", "El usuario o la contraseña no son correctos")
    }
  }

}
