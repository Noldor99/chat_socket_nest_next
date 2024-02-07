import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'your_room_id', description: 'ID of the room' })
  readonly roomId: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the current user' })
  readonly currentUserName: string;

  @ApiProperty({ example: 'current_user_id', description: 'ID of the current user' })
  readonly currentUserId: string;

  @ApiProperty({ example: 'Jane Doe', description: 'Name of the recipient user' })
  readonly recipientUserName: string;

  @ApiProperty({ example: 'recipient_user_id', description: 'ID of the recipient user' })
  readonly recipientUserId: string;

  @ApiProperty({ example: 'Hello, how are you?', description: 'Message content' })
  readonly message: string;
}
