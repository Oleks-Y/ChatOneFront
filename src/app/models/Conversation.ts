export class Conversation{
  id : number
  sender_id : number
  receiver_id : number
  message : string
  status : MessageStatus
  created_at: string
  public constructor(message : string) {
    this.message = message;
  }
}

enum MessageStatus{
  Sent,
  Delivered,
}
