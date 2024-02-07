import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { RolesModule } from 'src/roles/roles.module'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entity/user.entity'

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    ConfigModule,
  ],
  exports: [UserService],
})
export class UserModule { }
