export class Message {
  constructor(
    public id?:number,
    public contactId?:number,
    public contactName?:string,
    public email?:string,
    public phone?:string,
    public text?:string,
    public topicId?:number,
    public topicName?:string,
    ) {}
}
