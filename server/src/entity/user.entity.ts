import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Role } from "./role.entity";
import { RoomsEntity } from "./rooms.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  color?: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles?: Role[];

  @ManyToMany(() => RoomsEntity, (userRooms) => userRooms.users)
  @JoinTable()
  userRooms?: RoomsEntity[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
