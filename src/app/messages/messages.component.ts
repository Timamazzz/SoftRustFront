import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Message} from "../models/message";
import {MessageService} from "../services/MessageService";
import {TopicService} from "../services/TopicService";
import {ContactService} from "../services/ContactService";
import {Contact} from "../models/contact";
import {Topic} from "../models/topic";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;

  edited: Message|null = null;
  messages: Array<Message>;
  contacts: Array<Contact>;
  topics: Array<Topic>;
  statusMessage: string = "";

  constructor(private messageService: MessageService, private contactService: ContactService, private topicService: TopicService){
    this.messages = new Array<Message>();
    this.contacts = new Array<Message>();
    this.topics = new Array<Message>();

  }

  ngOnInit() {
    this.loadContacts();
    this.loadTopics();
    this.load();
  }

  private loadContacts() {
    this.contactService.get().subscribe((data: any) => {
      this.contacts = data;
      console.log(this.contacts);
    });
  }

  private loadTopics() {
    this.topicService.get().subscribe((data: any) => {
      this.topics = data;
    });
  }

  private load() {
    this.messageService.get().subscribe((data: any) => {
      this.messages = data;
    });
  }

  edit(message: Message) {
    this.edited = new Message(message.id, message.contactId, message.contactName,
      message.email, message.phone, message.text, message.topicId, message.topicName);
  }

  loadTemplate(message: Message) {
    if (this.edited && this.edited.id === message.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  update() {
    this.messageService.update(this.edited as Message).subscribe(_ => {
      this.statusMessage = 'Данные успешно обновлены'
      this.load();
    });
    this.edited = null;
  }
  cancel() {
    this.edited = null;
  }

  delete(message: Message) {
    this.messageService.delete(message.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены'
      this.load();
    });
  }
}
