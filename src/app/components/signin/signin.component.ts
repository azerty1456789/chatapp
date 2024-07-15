import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';import { User } from '../../models/User';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private formBuilder = inject(FormBuilder)
  protected loginForm!: FormGroup;
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


}
