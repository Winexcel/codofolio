import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-hovered',
  templateUrl: './image-hovered.component.html',
  styleUrls: ['./image-hovered.component.scss']
})
export class ImageHoveredComponent implements OnInit {

  @Input('src') imageSrc: string;
  @Input('buttonText') buttonText = 'Галерея';

  constructor() { }

  ngOnInit(): void {
  }

}
