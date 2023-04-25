import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../services/MessageService";
import {Message} from "../models/message";
import {TopicService} from "../services/TopicService";
import {Topic} from "../models/topic";
import {provideRouter, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  FormGroup!: FormGroup;

  constructor(
    private messageService: MessageService,
    private topicService: TopicService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  siteKey: string = "6LcdZlskAAAAAKQGYOa43IYg0sXas0g8RdD0cMq3";

  submitFlag : boolean = false;
  recaptchaSubmitFlag: boolean = false;

  message: Message = new Message();
  topics: Array<Topic> = new Array<Topic>();

  data = new FormGroup( {
    contactName: new FormControl<string>('', [
      Validators.required,
    ]),
    Email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    Phone: new FormControl<string>('', [
      Validators.required,
    ]),
    TopicId: new FormControl<string>('', [
      Validators.required,
    ]),
    Text: new FormControl<string>('', [
      Validators.required,
    ]),
  } )

  ngOnInit() {
    this.FormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.loadTopics();
  }

  loadTopics() {
    this.topicService.get().subscribe((data: any) => {
      this.topics = data;
    });
  }

  recaptchaSub() {
    this.recaptchaSubmitFlag = true;
  }

  submitData() {
    this.submitFlag = this.exceptionsForm();

    console.log(this.submitFlag);
    console.log("rec::", this.recaptchaSubmitFlag);

    if(!this.submitFlag && this.recaptchaSubmitFlag) {
      this.message.contactName = "" + this.data.controls.contactName.value;
      this.message.email = "" + this.data.controls.Email.value;
      this.message.phone = "+7" + this.data.controls.Phone.value;
      this.message.topicId = Number(this.data.controls.TopicId.value);
      this.message.text = "" + this.data.controls.Text.value;
      console.log("Submit form", this.message)
      this.messageService.create(this.message).subscribe((data: any) => {
        this.router.navigate(["show"], {queryParams: {id: data}});
      });
    }
  }

  exceptionsForm(): boolean {
    let flag = false;

    Object.values(this.data.controls).forEach(value => {
      if(value.errors) {
        flag = true;
      }
    });

    return flag;
  }
}
