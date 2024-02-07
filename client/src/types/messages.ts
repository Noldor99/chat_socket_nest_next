export interface IMessage {
  id: string;
  currentUserId: string;
  currentUserName: string;
  recipientUserId: string;
  recipientUserName: string;
  message: string;
  createdAt: Date;
}