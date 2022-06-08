import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImagenes: string[] = [];
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(
    private postsService: PostsService,
    private router: Router,
    private geolocation: Geolocation,
    private camera: Camera
  ) {}

  async crearPost() {
    console.log(this.post);
    const creado = await this.postsService.crearPost(this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.router.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    console.log(this.post)
    if(!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });


  }

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.tempImagenes.push(img);
    }, (err) => {
     // Handle error
    });
  }

}
