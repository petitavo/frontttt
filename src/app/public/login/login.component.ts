import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    MatButton
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  loginAsProducer() {
    // Redirige al sidenav del productor
    this.router.navigate(['/producer']);
  }

  loginAsConsumer() {
    // Redirige al sidenav del consumidor
    this.router.navigate(['/consumer']);
  }
}
