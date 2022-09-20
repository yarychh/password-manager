import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.scss']
})
export class AddPasswordComponent {
  public passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<AddPasswordComponent>
  ) {
    this.passwordForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
      confirmPassword: [null, [Validators.required, Validators.pattern( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    },
    {
      validators: CustomValidators.MatchValidator(
        'password',
        'confirmPassword'
      ),
    });
  }

  get passwordMatchError(): boolean {
    return !!this.passwordForm.errors?.['mismatch'];
  }

  public save(): void {
    this.ref.close(this.passwordForm.value);
  }

}
