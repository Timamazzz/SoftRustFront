import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HomeComponent } from './home/home.component';
import {TopicService} from "./services/TopicService";
import {FormsModule} from "@angular/forms";


// определение маршрутов
const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'topics', component: TopicsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [TopicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
