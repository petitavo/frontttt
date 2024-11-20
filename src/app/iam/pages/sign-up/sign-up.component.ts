import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from '../../services/authentication.service';
import {SignUpRequest} from "../../model/sign-up.request";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatInput,
    MatButton,
    MatOption,
    MatSelect,
    MatLabel
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    let username = this.form.value.username;
    let password = this.form.value.password;
    let role = this.form.value.role
    const signUpRequest = new SignUpRequest(username, password,[role]);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }


  backToLogin() {
    this.router.navigate(['/login']).then();
  }


}
