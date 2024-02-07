import {
  Body,
  Controller,
  Get,
} from '@nestjs/common';

import { MessagesService } from './messages.service';
import { MessagesEntity } from '../entity/messages.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) { }

  @Get()
  getPrevMessage(
    @Body() roomId: string,
  ): Promise<MessagesEntity[]> {
    return this.messageService.getPrevMessage(roomId);
  }
}
