import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa: ElementRef;

  constructor() { } 

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoicnVnbyIsImEiOiJjbDE0M2x5YTAwYmJ4M2NxYWozazhnc3M4In0.Ou4D46_9v0DHdtnHUKX3RQ';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [lng, lat], 
      zoom: 15 
    });
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    map.on('idle',function(){
      map.resize();
    });
  }

}

