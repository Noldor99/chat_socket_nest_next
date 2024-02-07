import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) { }

  async seed(): Promise<void> {

    const roles = await this.roleRepository.find();
    const users = await this.userRepository.find();

    await this.roleRepository.remove(roles);
    await this.userRepository.remove(users);
  }
}
