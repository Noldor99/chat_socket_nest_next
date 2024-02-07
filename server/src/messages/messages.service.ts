import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { MessagesEntity } from '../entity/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) { }

  async getPrevMessage(roomId: string): Promise<MessagesEntity[]> {
    try {
      return await this.messageRepository.find({
        where: { room: { id: roomId } },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
