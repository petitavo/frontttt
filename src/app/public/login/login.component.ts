import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  private apiUrl = 'http://localhost:3000/clients'; // URL del json-server

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authenticateUser(email, password);
    }
  }

  authenticateUser(email: string, password: string) {
    // Consulta al servidor json-server para validar las credenciales
    this.http.get<any[]>(`${this.apiUrl}?correo=${email}&password=${password}`)
      .pipe(
        catchError((error) => {
          alert('Error en la autenticación');
          return of([]); // Retorna un array vacío si hay un error
        })
      )
      .subscribe((users) => {
        if (users.length > 0) {
          const user = users[0]; // Asumiendo que el correo y la contraseña son únicos

          // Verificar el rol del usuario y redirigir
          if (user.role === 'producer') {
            this.router.navigate(['/SideNav']); // Redirige a producer
          } else if (user.role === 'consumer') {
            this.router.navigate(['/consumerSidenav']); // Redirige a consumer
          } else {
            alert('Rol no reconocido');
          }
        } else {
          // Mostrar un mensaje de error si las credenciales son incorrectas
          alert('Credenciales incorrectas');
        }
      });
  }
}
