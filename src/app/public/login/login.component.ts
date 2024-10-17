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
    // Redirige al home del productor
    this.router.navigate(['/producer/home-producer']);
  }

  loginAsConsumer() {
    // Redirige al home del consumidor
    this.router.navigate(['/consumer/home-consumer']);
  }
}
