import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  async canLoad() {
    const valido = await this.usuarioService.validarToken();
    return this.usuarioService.validarToken();
  }
  
}
