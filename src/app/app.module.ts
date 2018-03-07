import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Route, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AnimeComponent} from './components/anime/anime.component';
import {HomeComponent} from './components/home/home.component';
import {RectComponent} from './components/rect/rect.component';
import {SecnavComponent} from './components/secnav/secnav.component';
import {SecnavDirective} from './components/secnav/secnav.directive';
import { AnimeNavDirective } from './components/secnav/anime-nav.directive';


const routes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'anime', component: AnimeComponent},
  {path: 'rect', component: RectComponent},
  {path: 'sec-nav', component: SecnavComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AnimeComponent,
    RectComponent,
    HomeComponent,
    SecnavComponent,
    SecnavDirective,
    AnimeNavDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
