import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { SignUpRequest } from "../model/sign-up.request";
import { SignUpResponse } from "../model/sign-up.response";
import { SignInRequest } from "../model/sign-in.request";
import { SignInResponse } from "../model/sign-in.response";

/**
 * Service for handling authentication operations.
 * This service is responsible for handling authentication operations like sign-up, sign-in, and sign-out.
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  basePath: string = `https://backend-villasystem-f5d5fndbbvgsbzb5.canadacentral-01.azurewebsites.net/api/v1`;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  // Inicializamos signedIn usando el método hasToken() para conservar el estado tras refresh.
  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient) { }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  // Método para verificar si hay token en el localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Sign up a new user.
   */
  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          console.log(`Signed up as ${response.username} with id ${response.id}`);
          this.router.navigate(['/sign-in']).then();
        },
        error: (error) => {
          console.error(`Error while signing up: ${error}`);
          this.router.navigate(['/sign-up']).then();
        }
      });
  }

  /**
   * Sign in a user.
   */
  signIn(signInRequest: SignInRequest) {
    console.log(signInRequest);
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          // Actualizamos los BehaviorSubject y almacenamos el token
          this.signedIn.next(true);
          this.signedInUserId.next(response.id);
          this.signedInUsername.next(response.username);
          localStorage.setItem('token', response.token);
          console.log(`Signed in as ${response.username} with token ${response.token}`);
          const userRole = response.roles[0]?.name;
          if (userRole === 'CONSUMER') {
            this.router.navigate(['/consumer/home-consumer']).then();
          } else {
            this.router.navigate(['/producer/home-producer']).then();
          }
        },
        error: (error) => {
          // Si ocurre error, se limpian los valores
          this.signedIn.next(false);
          this.signedInUserId.next(0);
          this.signedInUsername.next('');
          console.error(`Error while signing in: ${error}`);
          this.router.navigate(['/sign-in']).then();
        }
      });
  }

  /**
   * Sign out the user.
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }
}
