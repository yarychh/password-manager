import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/constants/user.interface';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
            ),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: CustomValidators.MatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  get passwordMatchError(): boolean {
    return !!this.registerForm.errors?.['mismatch'];
  }

  register(): void {
    const { firstName, lastName, email, password } = this.registerForm.value;
    const newUser: IUser = {
      email,
      firstName,
      lastName,
      password,
      id: Date.now(),
      pairs: [],
    };

    this.auth.register(newUser)
      .catch(err => console.log('register failed', err))
  }
}
