import { PartialType } from '@nestjs/swagger';
import { CreateGroupChatDto } from './create-groupChat.dto';


export class UpdateGroupChatDto extends PartialType(CreateGroupChatDto) { }
