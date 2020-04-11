import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgsRevealModule} from 'ngx-scrollreveal';

import {AppComponent} from './app.component';
import {TypedDirective} from './directives/typed.directive';
import {CubeLoaderComponent} from './page-loader/cube-loader/cube-loader.component';
import {PageLoaderComponent} from './page-loader/page-loader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ImageHoveredComponent } from './image-hovered/image-hovered.component';
import { NgPhotoSwipeComponent } from './ng-photo-swipe/ng-photo-swipe.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

// данная функция необходима при AOT компиляции
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    TypedDirective,
    CubeLoaderComponent,
    PageLoaderComponent,
    ImageHoveredComponent,
    NgPhotoSwipeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgsRevealModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
