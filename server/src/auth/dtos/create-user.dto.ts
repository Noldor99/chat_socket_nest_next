import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin-v3v',
    description: 'The username of the user',
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty({
    example: 'Jw9gP2xqL',
    description: 'The password of the user',
  })
  @IsString({ message: 'Must be a string' })
  @Length(8, 16, { message: 'Must be between 8 and 16 characters' })
  readonly password: string;

  @ApiProperty({
    example: 'Jw9gP2xqL',
    description: 'The password of the user',
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Length(8, 16, { message: 'Must be between 8 and 16 characters' })
  readonly color?: 'black';
}
