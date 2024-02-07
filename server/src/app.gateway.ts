import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, map, Observable, of, throwError } from 'rxjs';

import { MessagesEntity } from './entity/messages.entity';
import { CreateMessageDto } from './messages/dto/create-message.dto';

export interface RoomId {
  roomId: string;
}

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly msgRepository: Repository<MessagesEntity>,
  ) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('meeting')
  joinUserToMeeting(
    @MessageBody() data: RoomId,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<any>> {
    client.join(data.roomId);
    this.server.to(data.roomId).emit('meeting', 'a new challenger approaches');
    return from(data.roomId).pipe(
      map(() => {
        return {
          event: 'meeting',
          data: data.roomId,
        };
      }),
    );
  }

  @SubscribeMessage('send-message')
  async handleMessage(client: Socket, payload: CreateMessageDto): Promise<void> {

    const createNewMsg = await this.msgRepository.create({
      room: { id: payload.roomId },
      currentUserName: payload.currentUserName,
      currentUserId: payload.currentUserId,
      message: payload.message,
    });
    const result = await this.msgRepository.save(createNewMsg);
    this.server.to(payload.roomId).emit('receive-message', result);
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client}`);
  }
}
