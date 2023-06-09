import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HomeComponent } from './home/home.component';
import {TopicService} from "./services/TopicService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ContactsComponent } from './contacts/contacts.component';
import {ContactService} from "./services/ContactService";
import { MessagesComponent } from './messages/messages.component';
import {MessageService} from "./services/MessageService";
import { FormComponent } from './form/form.component';
import {NgxCaptchaModule} from "ngx-captcha";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { ShowMessageComponent } from './show-message/show-message.component';


// определение маршрутов
const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'topics', component: TopicsComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'messages', component: MessagesComponent},
  { path: 'form', component: FormComponent},
  { path: 'show', component: ShowMessageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicsComponent,
    ContactsComponent,
    MessagesComponent,
    FormComponent,
    ShowMessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [TopicService, ContactService, MessageService, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
