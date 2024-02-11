import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesEntity } from 'src/entity/messages.entity';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) { }

  async seed(): Promise<void> {

    const roles = await this.roleRepository.find();
    const users = await this.userRepository.find();
    const message = await this.messageRepository.find();

    await this.roleRepository.remove(roles);
    await this.userRepository.remove(users);
    await this.messageRepository.remove(message);
  }
}
