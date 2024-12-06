import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private keycloak: KeycloakService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.keycloak.getKeycloakInstance().token;
        if (authToken && authToken !== '') {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authToken}`,
                },
            });
        }
        return next.handle(req);
    }
}
