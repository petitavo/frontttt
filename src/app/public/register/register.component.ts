import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  private apiUrl = 'https://my-json-server.typicode.com/Villasystem/Grapeflow/clients'; // URL de tu API o json-server

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      dni: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      const newUser = this.registerForm.value;
      this.registerUser(newUser);
    } else {
      alert('Formulario inválido o las contraseñas no coinciden.');
    }
  }

  passwordsMatch() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  registerUser(user: any) {
    this.http.post(this.apiUrl, user)
      .pipe(
        catchError((error) => {
          alert('Error durante el registro');
          return of(null);
        })
      )
      .subscribe(() => {
        alert('Registro exitoso');

        // Redirigir según el rol seleccionado
        if (user.role === 'producer') {
          this.router.navigate(['/SideNav']);
        } else {
          this.router.navigate(['/consumerSidenav']);
        }
      });
  }
}
