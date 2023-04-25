import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TopicService} from "../services/TopicService";
import {Topic} from "../models/topic";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;

  edited: Topic|null = null;
  topics: Array<Topic>;
  statusMessage: string = "";

  constructor(private topicService: TopicService){
    this.topics = new Array<Topic>();
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.topicService.get().subscribe((data: any) => {
      this.topics = data;
    });
  }

  edit(topic: Topic) {
    this.edited = new Topic(topic.id, topic.name);
  }

  loadTemplate(topic: Topic) {
    if (this.edited && this.edited.id === topic.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  update() {
      this.topicService.update(this.edited as Topic).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены'
          this.load();
      });
      this.edited = null;
    }
  cancel() {
    this.edited = null;
  }

  delete(topic: Topic) {
    this.topicService.delete(topic.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены'
        this.load();
    });
  }
}


