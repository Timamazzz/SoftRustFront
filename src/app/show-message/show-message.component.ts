import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Message} from "../models/message";
import {MessageService} from "../services/MessageService";

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent {
  constructor(private activatedRoute: ActivatedRoute, private messageService: MessageService,) {
  }

  id: string = "";
  message: Message | undefined;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.messageService.getById(Number(this.id)).subscribe((data: any) => {
      this.message = data;
      console.log(this.message)
    });
  }
}

