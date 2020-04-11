import {
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit, Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import * as PhotoSwipe from '../../assets/vendor/photoswipe/photoswipe';
import * as PhotoSwipeUI from '../../assets/vendor/photoswipe/photoswipe-ui-default';

@Component({
  selector: 'app-ng-photo-swipe',
  templateUrl: './ng-photo-swipe.component.html',
  styleUrls: ['./ng-photo-swipe.component.scss']
})
export class NgPhotoSwipeComponent implements OnInit, OnChanges {

  _opened: boolean;

  set opened(opened: boolean) {
    this._opened = opened;
    this.isOpenChange.emit(this._opened);
  }

  get opened(): boolean {
    return this._opened;
  }

  protected pswpGallery: PhotoSwipe;

  @Input('container') container: TemplateRef<any> = null;

  @Input('isOpen')
  set setIsOpen(open: boolean) {
    if (open) {
      this.tryOpen();
    } else {
      this.tryClose();
    }
  }

  @Output('isOpenChange') isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('imgList') imgList: Array<string> = [];
  @ViewChild('pswpTopBar', {static: true}) pswpTopBar: ElementRef;
  @ViewChild('pswpButtonArrowRight', {static: true}) pswpButtonArrowRight: ElementRef;

  constructor(private renderer2: Renderer2) {
  }

  tryOpen() {
    if (this.imgList.length === 0) {
      this.opened = false;
    }

    const pswpElement = document.querySelectorAll('.pswp')[0];

    const items = [];
    this.imgList.forEach(imgSrc => items.push({src: imgSrc, w: 0, h: 0}));


    // define options (if needed)
    const options = {
      // optionName: 'option value'
      // for example:
      index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    this.pswpGallery = new PhotoSwipe(pswpElement, PhotoSwipeUI, items, options);

    this.pswpGallery.listen('gettingData', (index, item) => {
      if (item.w < 1 || item.h < 1) { // unknown size
        const img = new Image();
        img.onload = () => { // will get size after load
          item.w = img.width; // set image width
          item.h = img.height; // set image height
          this.pswpGallery.invalidateCurrItems(); // reinit Items
          this.pswpGallery.updateSize(true); // reinit Items
        };
        img.src = item.src; // let's download image
      }
    });

    this.pswpGallery.init();
    this.pswpGallery.listen('destroy', this.destroyGallery.bind(this));
    this.opened = true;
  }

  tryClose() {
    if (this.opened) {
      this.pswpGallery.close();
      this.isOpenChange.emit(false);
    }
  }

  destroyGallery() {
    this.opened = false;
    this.pswpGallery = null;
  }

  toggle() {
    console.log('i am toggled');
    if (!this.opened) {
      this.tryOpen();
    } else {
      this.tryClose();
    }
  }

  hasScrollbar(element: ElementRef) {
    return element.nativeElement.scrollHeight - element.nativeElement.clientHeight;
  }

  ngOnInit(): void {
    if (this.container) {
      // check if container has scrollbar then add padding to PhotoSwipeUI
      if (this.hasScrollbar(this.container.elementRef)) {
        this.renderer2.setStyle(this.pswpTopBar.nativeElement, 'paddingRight', this.getScrollbarWidth() + 'px');
        this.renderer2.setStyle(this.pswpButtonArrowRight.nativeElement, 'transform', `translateX(-${this.getScrollbarWidth()}px)`);
      }
    }
  }

  // taked from https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
  getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
