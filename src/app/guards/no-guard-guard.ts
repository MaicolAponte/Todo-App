import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const noGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.navigate(['/home']); // 🔄 Si ya está logueado → redirigir a home
        resolve(false);
      } else {
        resolve(true); // ✅ Si no está logueado, permitir acceso
      }
    });
  });
};
