import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsEntity } from '../entity/rooms.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsEntity, User])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule { }
