import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Contact} from "../classes/contact";
import {ContactService} from "../services/ContactService";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;

  edited: Contact|null = null;
  contacts: Array<Contact>;
  statusMessage: string = "";

  constructor(private contactService: ContactService){
    this.contacts = new Array<Contact>();
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.contactService.get().subscribe((data: any) => {
      this.contacts = data;
    });
  }

  edit(contact: Contact) {
    this.edited = new Contact(contact.id, contact.name, contact.email, contact.phone);
  }

  loadTemplate(contact: Contact) {
    if (this.edited && this.edited.id === contact.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  update() {
    this.contactService.update(this.edited as Contact).subscribe(_ => {
      this.statusMessage = 'Данные успешно обновлены'
      this.load();
    });
    this.edited = null;
  }
  cancel() {
    this.edited = null;
  }

  delete(contact: Contact) {
    this.contactService.delete(contact.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены'
      this.load();
    });
  }
}
