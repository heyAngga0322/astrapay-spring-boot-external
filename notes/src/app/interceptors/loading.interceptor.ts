import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

let totalRequests = 0;

export function loadingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  
  totalRequests++;
  
  // Set loading state
  loadingService.setLoading(true);
  
  return next(request).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        // All requests completed
        loadingService.setLoading(false);
      }
    })
  );
}
