import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { CreateUserDto } from 'src/auth/dtos/create-user.dto'
import { UserService } from 'src/user/user.service'
import { SeederInterface } from '../seeder.interface'

@Injectable()
export class UserSeed implements SeederInterface {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  async seed() {
    const usersSeedData: CreateUserDto[] = [
      {
        username: 'admin-v3v',
        surname: 'admin-surname',
        email: 'new_user@example.com',
        password: 'Jw9gP2xqL',
        color: 'black'
      },
      {
        username: 'jane_doe',
        surname: 'doe-surname',
        email: 'new_user2@example.com',
        password: 'strongPassword',
        color: 'black'
      },
      {
        username: 'light',
        surname: 'light-surname',
        email: 'new_user3@example.com',
        password: 'secure',
        color: 'black'
      },
    ];


    for (const userData of usersSeedData) {
      await this.authService.register(userData)
    }

    const user = await this.userService.getUserByUsername(
      usersSeedData[0].username,
    )

    await this.userService.addAdmin(user.id)
  }
}
