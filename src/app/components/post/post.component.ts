import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  img1 = '/assets/perro-1.jpg';

  @Input() post: Post = {};
  
  constructor() { }

  ngOnInit() { }

}
