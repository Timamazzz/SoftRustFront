import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TopicService} from "../services/TopicService";
import {Topic} from "../classes/topic";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;

  editedTopic: Topic|null = null;
  topics: Array<Topic>;
  statusMessage: string = "";

  constructor(private topicService: TopicService){
    this.topics = new Array<Topic>();
  }

  ngOnInit() {
    this.loadTopics();
  }

  private loadTopics() {
    this.topicService.getTopics().subscribe((data: any) => {
      console.log(data);
      this.topics = data;
    });
  }

  editTopic(topic: Topic) {
    this.editedTopic = new Topic(topic.id, topic.name);
  }

  loadTemplate(topic: Topic) {
    if (this.editedTopic && this.editedTopic.id === topic.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveTopic() {
      this.topicService.updateTopic(this.editedTopic as Topic).subscribe(_ => {
        this.statusMessage = 'Данные успешно обновлены'
          this.loadTopics();
      });
      this.editedTopic = null;
    }
  cancel() {
    this.editedTopic = null;
  }

  deleteTopic(topic: Topic) {
    this.topicService.deleteTopic(topic.id).subscribe(_ => {
      this.statusMessage = 'Данные успешно удалены'
        this.loadTopics();
    });
  }
}


