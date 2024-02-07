import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Length } from 'class-validator'

export class EditUserDto {
  @ApiProperty({
    description: 'The id of the moder',
    required: false,
  })
  @IsString()
  readonly userId: string

  @ApiProperty({
    example: 'Volt',
    description: 'The username of the user',
    required: false,
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly name: string

  @ApiProperty({
    example: 'password1234',
    description: 'The password of the user',
    required: false,
  })
  @IsString({ message: 'Must be a string' })
  @Length(8, 16, { message: 'Must be between 8 and 16 characters' })
  readonly password?: string
}
