import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { RoleSeeder } from './generation/roleSeeder'
import { UserSeed } from './generation/userSeed'
import { RolesModule } from 'src/roles/roles.module'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity'
import { AuthModule } from 'src/auth/auth.module'
import { User } from 'src/entity/user.entity'
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Role, User]),
    UserModule,
    AuthModule,
    RolesModule,
  ],
  providers: [
    SeedService,
    RoleSeeder,
    UserSeed,
    ResetTotalDataSeed
  ],
  exports: [SeedService]

})
export class SeedModule { }
