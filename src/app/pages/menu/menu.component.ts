import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  //metodo para cerrar sesion
  salir(){
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.error('Error: ', error);
        
      }
    })
  }

  get mostrarMenu(): boolean {
    return this.router.url !== '/';
  }
}
