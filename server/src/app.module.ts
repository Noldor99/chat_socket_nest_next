import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { RoomsModule } from './rooms/rooms.module';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CookiesMiddleware } from './auth/cookies.middleware';
import { AppGateway } from './app.gateway';
import { MessagesModule } from './messages/messages.module';
import { MessagesEntity } from './entity/messages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  providers: [AppGateway],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/api',
      rootPath: path.resolve(__dirname, 'static'),
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret:
          configService.get('ACCESS_TOKEN_SECRET') ||
          'your_access_token_secret_value_web3',
        signOptions: {
          expiresIn: configService.get('ACCESS_TOKEN_EXPIRES_IN') || '36000s',
        },
      }),
    }),
    TypeOrmModule.forFeature([MessagesEntity]),
    DatabaseModule,
    AuthModule,
    UserModule,
    RolesModule,
    RoomsModule,
    MessagesModule
  ]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookiesMiddleware).forRoutes('*')
  }
}