import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { MessagesEntity } from './messages.entity';


@Entity({ name: 'rooms' })
export class RoomsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sender: string;

  @Column({ nullable: true })
  receiver?: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.userRooms)
  users: User[];

  @OneToMany(() => MessagesEntity, (message) => message.room)
  messages?: MessagesEntity[];
}
