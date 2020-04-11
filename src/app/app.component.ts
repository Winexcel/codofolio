import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgsRevealService} from 'ngx-scrollreveal';
import {Subscription} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {NgPhotoSwipeComponent} from './ng-photo-swipe/ng-photo-swipe.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {$e} from 'codelyzer/angular/styles/chars';

const themes = {
  light: 'codo-light__theme',
  dark: 'codo-dark__theme'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('gallery', {static: true}) gallery: NgPhotoSwipeComponent;
  @ViewChild('aboutSec') aboutSec: ElementRef;
  @ViewChild('contactsPanel') contactsPanel: ElementRef;

  aboutPanelExpanded = false;
  contactsPanelExpanded = false;
  contactsNeedScroll = false;
  curentYear = (new Date()).getFullYear();
  projects = {
    currentProjectName: '',
    imgList: {
      DarkTraffic: [
        '../assets/img/projects/darktraffic/1.jpg',
        '../assets/img/projects/darktraffic/2.jpg',
        '../assets/img/projects/darktraffic/3.jpg',
        '../assets/img/projects/darktraffic/4.jpg',
        '../assets/img/projects/darktraffic/5.jpg',
      ]
    },
    currentImgList: [],
  };
  themeName = themes.light;
  beforeRevealSubscription: Subscription;
  typingsTextMain = [];
  galleryIsOpen = false;

  constructor(private revealService: NgsRevealService, private translateService: TranslateService) {

    // устанавливаем язык по умолчанию
    this.translateService.setDefaultLang('ru');

    this.beforeRevealSubscription = this.revealService.beforeReveal$.subscribe(
      (el: HTMLElement) => {
        if (el.classList.value.includes('project')) {
          el.classList.add('animated');
          el.classList.add('fadeInLeft');
        }
      });
  }


  ngOnDestroy(): void {
    this.beforeRevealSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.translateService.get('main.typingsTextMain').subscribe(typingsTextMain => {
      this.typingsTextMain = typingsTextMain;
    });
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.typingsTextMain = event.translations.main.typingsTextMain;
    });
  }

  changeTheme(slide: MatSlideToggleChange) {
    if (slide.checked) {
      this.themeName = themes.dark;
    } else {
      this.themeName = themes.light;
    }
  }

  openGallery(projectName) {
    this.projects.currentImgList = this.projects.imgList[projectName];
    this.galleryIsOpen = true;
  }

  getInTouch() {
    if (this.aboutPanelExpanded && this.contactsPanelExpanded) {
      this.contactsPanel.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
    } else {
      this.aboutPanelExpanded = true;
      this.contactsPanelExpanded = true;
      this.contactsNeedScroll = true;
    }
  }

  handleContactsExpand() {
    if (this.contactsNeedScroll && this.contactsPanelExpanded) {
      this.contactsPanel.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  handleAboutPanelExpand() {
    if (this.contactsNeedScroll) {
      this.contactsPanel.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  handleSwitchLanguageChange(slide: MatSlideToggleChange) {
    if (slide.checked) {
      this.setLanguage('en');
    } else {
      this.setLanguage('ru');
    }
  }
}
