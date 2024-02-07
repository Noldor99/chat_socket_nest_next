import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomsEntity } from './rooms.entity';

@Entity({ name: 'messages' })
export class MessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  currentUserId: string;

  @Column()
  currentUserName: string;

  @ManyToOne(() => RoomsEntity, (room) => room.messages)
  room: RoomsEntity;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date
}
