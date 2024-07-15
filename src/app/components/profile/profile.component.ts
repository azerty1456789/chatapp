import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../../services/country-state-city';
import { passwordMatchValidator } from '../../services/password-validator';
interface Country {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private formBuilder = inject(FormBuilder);
  protected profileForm!: FormGroup;
  private appService = inject(AppService);

  countries: Country[] = [];
  states: string[] = [];
  cities: { name: string }[] = [];
  selectedPhoto: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.createProfileForm();

    this.profileForm.get('country')?.valueChanges.subscribe((country) => {
      this.profileForm.get('state')?.reset({ value: '', disabled: true });
      if (country) {

        this.states = this.appService.getStatesByCountry(country);
        this.profileForm.get('state')?.enable();

      }
    });
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      photo: [null]
    }, { validators: passwordMatchValidator });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedPhoto = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(this.selectedPhoto);
      this.profileForm.patchValue({ photo: this.selectedPhoto });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Form Submitted', this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
