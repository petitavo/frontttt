import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor for adding the authentication token to the request headers.
 * This interceptor adds the authentication token to the request headers if it exists in local storage.
 */
export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  // Se obtiene el token del localStorage
  const token = localStorage.getItem('token');
  // Si el token existe, se clona la petición agregando la cabecera Authorization.
  const handledRequest = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;
  console.log(handledRequest);
  return next(handledRequest);
};
