import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from '../auth.service';
import { Auth2Service } from '../auth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    public auth: AuthService,
    public auth2: Auth2Service,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser?.length) {
      const parsed = JSON.parse(currentUser) as IUser;
      this.auth2.login(parsed.email, parsed.password);

      // with firebase
      // this.auth.login(parsed.email, parsed.password);
    }
  }

  public login(): void {
    this.auth2.login(this.loginForm.value.email, this.loginForm.value.password);

    // with firebase
    // this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  public googleAuth(): void {
    this.auth.GoogleAuth();
  }
}
