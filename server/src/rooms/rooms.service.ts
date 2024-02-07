import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomsEntity } from '../entity/rooms.entity';
import { User } from 'src/entity/user.entity';
import { CreateGroupChatDto } from './dtos/create-groupChat.dto';
import { UpdateGroupChatDto } from './dtos/update-groupChat.dto';
import { ConnectRoomDto } from './dtos/connect-room.dto';
import { QueryRoomParamsDto } from './dtos/query-room-params.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomsEntity)
    private readonly roomsRepository: Repository<RoomsEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async connectToRoom(currentUserId: string, roomData: ConnectRoomDto) {
    const { idUserOrGroop } = roomData;

    const isGroup = await this.roomsRepository.findOne({
      where: { id: idUserOrGroop },
      relations: { users: true, messages: true },
    });

    if (isGroup) return isGroup

    const recipientUserId = idUserOrGroop

    if (currentUserId && recipientUserId) {
      const existingRoom = await this.roomsRepository.findOne({
        where: [
          {
            sender: currentUserId,
            receiver: recipientUserId,
          },
          {
            sender: recipientUserId,
            receiver: currentUserId,
          },
        ],
        relations: { users: true, messages: true },
      })


      if (existingRoom) {
        return existingRoom
      }
      const newRoom = this.roomsRepository.create({
        name: 'simple',
        sender: currentUserId,
        receiver: recipientUserId,
        users: [{ id: currentUserId }, { id: recipientUserId }],
      });

      const savedRoom = await this.roomsRepository.save(newRoom);

      return this.roomsRepository.findOne({
        where: {
          id: savedRoom.id
        },
        relations: { users: true, messages: true },
      });
    }
  }

  async createGroupChat(currentUserId: string, groupData: CreateGroupChatDto): Promise<RoomsEntity> {
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: { userRooms: true },
    });

    if (!currentUser) {
      throw new Error(`User with ID ${currentUserId} not found`);
    }

    const newUserIds = groupData.users.map(user => user.id);
    const allUserIds = [...newUserIds, currentUserId];

    const users = await this.userRepository.findByIds(allUserIds);

    const createGroupData: RoomsEntity = {
      id: undefined,
      sender: currentUserId,
      users: [currentUser, ...users],
      name: `${groupData.name}`,

    };

    const newGroup = this.roomsRepository.create(createGroupData);

    await this.roomsRepository.save(newGroup);

    return newGroup;
  }

  async getRoomById(roomId: string): Promise<RoomsEntity | undefined> {
    const room = await this.roomsRepository.findOne({
      where: { id: roomId },
      relations: { users: true, messages: true },
    });

    return room;
  }


  async editGroupChat(currentUserId, groupId: string, groupData: UpdateGroupChatDto): Promise<RoomsEntity | undefined> {
    const { name, users } = groupData

    const editingGroup = await this.roomsRepository.findOne({
      where: { id: groupId },
      relations: { users: true },
    });

    if (!editingGroup) {
      throw new NotFoundException('Group not found');
    }

    if (name) editingGroup.name = name;

    if (users) {

      editingGroup.users = await Promise.all(
        groupData.users.map(async (newUser) => {
          const existingUser = editingGroup.users.find(user => user.id === newUser.id);

          if (existingUser) {
            return { ...existingUser, ...newUser };
          } else {
            const userEntity = await this.userRepository.findOne({
              where: { id: newUser.id }
            });
            if (userEntity) {
              return userEntity;
            } else {
              throw new NotFoundException(`User with ID ${newUser.id} not found`);
            }
          }
        }),
      );
      const currentUser = await this.userRepository.findOne({
        where: { id: currentUserId },
      });
      editingGroup.users.push(currentUser)
    }
    const updatedGroup = await this.roomsRepository.save(editingGroup);

    return updatedGroup;
  }

  async getAllGroups(params: QueryRoomParamsDto): Promise<RoomsEntity[]> {
    let queryBuilder = this.roomsRepository
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.users', 'users')
      .leftJoinAndSelect('rooms.messages', 'messages');

    if (params.userId) {
      queryBuilder = queryBuilder.where('users.id = :userId', { userId: params.userId });
    }

    const userGroups = await queryBuilder.getMany();

    return userGroups;
  }

}
