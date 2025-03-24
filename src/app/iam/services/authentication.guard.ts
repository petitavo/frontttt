import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { map, take } from "rxjs";

/**
 * Guard for checking if the user is signed in.
 * This guard checks if the user is signed in. If the user is signed in, the guard returns true.
 * If the user is not signed in, the guard navigates the user to the sign-in page and returns false.
 */
export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  // Se comprueba el observable, pero se incluye una verificación adicional en el localStorage.
  return authenticationService.isSignedIn.pipe(take(1), map(isSignedIn => {
    if (isSignedIn || localStorage.getItem('token')) {
      return true;
    } else {
      router.navigate(['/sign-in']).then();
      return false;
    }
  }));
};
