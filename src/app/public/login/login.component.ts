import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatButton
  ]
})
export class LoginComponent {
  constructor(private router: Router) {}

  loginAsProducer() {
    this.router.navigate(['/sign-in']);
  }

  loginAsConsumer() {
    this.router.navigate(['/sign-up']);
  }
}
