import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit, OnDestroy {

  pageLoaded = false;

  @HostListener('window:load') onLoad() {
    setTimeout(() => {
      this.pageLoaded = true;
    }, 0);
  }

  constructor() {
  }

  ngOnInit(): void {
    window.addEventListener('load', this.onLoadListener.bind(this));
  }

  onLoadListener() {

  }

  ngOnDestroy(): void {
    window.removeEventListener('load', this.onLoadListener.bind(this));
  }

}
