import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser?.length) {
      const parsed: IUser = JSON.parse(currentUser);
      this.auth.login(parsed.email, parsed.password);
    }
  }

  public login(): void {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  public googleAuth(): void{
    this.auth.GoogleAuth();
  }
}
