import { ApiProperty } from '@nestjs/swagger'

class UserData {
  @ApiProperty({ example: '1', description: 'User ID' })
  id?: string;

  @ApiProperty({ example: 'John', description: 'User name' })
  name: string;

}

const exampleUserData: UserData = {
  id: '1',
  name: 'John',
};

export class CreateGroupChatDto {
  @ApiProperty({ example: 'simple' })
  readonly name: string

  @ApiProperty({ example: [exampleUserData], description: 'Array of new members', type: [UserData] })
  readonly users: UserData[]
}

