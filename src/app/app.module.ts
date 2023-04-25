import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HomeComponent } from './home/home.component';
import {TopicService} from "./services/TopicService";
import {FormsModule} from "@angular/forms";
import { ContactsComponent } from './contacts/contacts.component';
import {ContactService} from "./services/ContactService";
import { MessagesComponent } from './messages/messages.component';
import {MessageService} from "./services/MessageService";


// определение маршрутов
const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'topics', component: TopicsComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'messages', component: MessagesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicsComponent,
    ContactsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [TopicService, ContactService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
