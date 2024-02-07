import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { RoomsEntity } from '../entity/rooms.entity';
import { CreateGroupChatDto } from './dtos/create-groupChat.dto';
import { UpdateGroupChatDto } from './dtos/update-groupChat.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConnectRoomDto } from './dtos/connect-room.dto';
import { QueryRoomParamsDto } from './dtos/query-room-params.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post('connectToRoom')
  connectToRoom(
    @Req() req,
    @Body() roomData: ConnectRoomDto,
  ) {
    return this.roomsService.connectToRoom(req.user.id, roomData)
  }

  @Post('createGroupChat')
  createGroupChat(@Req() req, @Body() groupData: CreateGroupChatDto) {

    return this.roomsService.createGroupChat(req.user.id, groupData);
  }

  @Get(':id')
  async getRoomById(@Param('id') roomId: string) {
    const room = await this.roomsService.getRoomById(roomId);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  @Patch('/editGroupChat/:groupId')
  editGroupChat(
    @Param('groupId') groupId: string,
    @Req() req,
    @Body() groupData: UpdateGroupChatDto
  ): Promise<RoomsEntity> {
    return this.roomsService.editGroupChat(req.user.id, groupId, groupData);
  }

  @Get()
  @ApiQuery({ name: 'userId', type: String, required: false })
  getAllGroups(
    @Query() params: QueryRoomParamsDto
  ) {
    return this.roomsService.getAllGroups(params);
  }

}
