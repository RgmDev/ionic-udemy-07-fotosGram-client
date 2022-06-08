import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService 
  ) { }

  getPosts(pull: boolean = false) {
    if(pull) {
      this.paginaPost = 0;
    }
    this.paginaPost++;
    return this.http.get<RespuestaPosts>(`${URL}/post?pagina=${this.paginaPost}`);
  }

  crearPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise((resolve) => {
      this.http.post(`${URL}/post`, post, { headers }).subscribe( (resp) => {
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      });
    });
  }

}
