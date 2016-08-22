import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';


@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private af: AngularFire, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let auth = null;
        this.af.auth.forEach( a => auth = a);
        if (auth != null) {
            return true; 
        }
        
        this.router.navigate(['/notloggedin']);
        return false;
    }
}
