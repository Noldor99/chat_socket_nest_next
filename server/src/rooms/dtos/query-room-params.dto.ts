import { IsOptional } from 'class-validator';

export class QueryRoomParamsDto {
  @IsOptional()
  userId?: string;
}
