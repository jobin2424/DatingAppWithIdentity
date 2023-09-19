import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

// did it this way because canActivate is not depcricated for new verisions of angular
// however in the app-routing-module, we call it wiht canActive even tho creating a canactive component using ng g g wont work anymore
// REMEMBER, security is always on the api side, angular helps us hide things, and using canActive is a way to do so
// export const authGuard = () => {
//   const accountService = inject(AccountService);
//   const toastr = inject(ToastrService);

//   return accountService.currentUser$.pipe(
//     map((user) => {
//       if (user) return true;
//       else {
//         toastr.error('you shall not pass!');
//         return false;
//       }
//     })
//   );
// };

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map((user) => {
      if (user) return true;
      else {
        toastr.error('you shall not pass!');
        return false;
      }
    })
  );
};
