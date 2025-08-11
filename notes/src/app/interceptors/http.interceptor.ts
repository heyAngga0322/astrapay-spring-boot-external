import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { inject } from '@angular/core';

let activeRequests = 0;

function addHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
  // Get token from localStorage (if you have authentication)
  const token = localStorage.getItem('authToken');
  
  let headers = request.headers;
  
  // Add authorization header if token exists
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Add common headers
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Accept', 'application/json');
  
  // Clone the request with new headers
  return request.clone({ headers });
}

function handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'An unknown error occurred';
  
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Client Error: ${error.error.message}`;
  } else {
    // Server-side error
    switch (error.status) {
      case 0:
        errorMessage = 'Network Error - Please check your connection or ensure the server is running';
        break;
      case 400:
        errorMessage = 'Bad Request - Please check your input';
        break;
      case 401:
        errorMessage = 'Unauthorized - Please log in again';
        // Optionally redirect to login page
        // this.router.navigate(['/login']);
        break;
      case 403:
        errorMessage = 'Forbidden - You don\'t have permission to access this resource';
        break;
      case 404:
        errorMessage = 'Not Found - The requested resource was not found. Please check if the server is running.';
        break;
      case 500:
        errorMessage = 'Internal Server Error - Please try again later';
        break;
      default:
        errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
  }
  
  console.error(`❌ HTTP Error: ${errorMessage}`, error);
  
  // You can also show a toast notification here
  // this.toastService.showError(errorMessage);
  
  return throwError(() => new Error(errorMessage));
}

export function httpInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  activeRequests++;
  
  // Clone the request and add headers
  const modifiedRequest = addHeaders(request);
  
  // Log the request
  console.log(`🚀 HTTP Request: ${request.method} ${request.url}`);
  
  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      return handleError(error);
    }),
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        console.log('✅ All HTTP requests completed');
      }
    })
  );
}
