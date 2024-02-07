import { ApiProperty } from '@nestjs/swagger'

export class CreateRoomDto {
  @ApiProperty({ example: 'simple' })
  readonly idUserOrGroop: string
}
