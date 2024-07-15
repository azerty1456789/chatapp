import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../../services/country-state-city';
import { passwordMatchValidator } from '../../services/password-validator';
interface Country {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  private formBuilder = inject(FormBuilder)
  protected registrationForm!: FormGroup;
  private appService = inject(AppService)

  countries: Country[] = [];
  states:  string [] = [];


  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.createRegistrationForm();

    this.registrationForm.get('country')?.valueChanges.subscribe((country) => {
      this.registrationForm.get('state')?.reset({ value: '', disabled: true });
      if (country) {

        this.states = this.appService.getStatesByCountry(country);
        this.registrationForm.get('state')?.enable();

      }
    });

    
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
    },{ validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}