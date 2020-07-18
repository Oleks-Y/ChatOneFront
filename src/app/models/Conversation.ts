export class Conversation{
  id : number
  sender_id : number
  receiver_id : number
  message : string
  status : MessageStatus
  created_at: string
}

enum MessageStatus{
  Sent,
  Delivered,
}
