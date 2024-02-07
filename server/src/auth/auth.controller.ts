import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { LoginUserDto } from './dtos/login-user.dto'
import { LocalAuthGuard } from './local.guard'

@ApiTags('1.1.auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  private readonly accessTokenName: string =
    process.env.ACCESS_TOKEN_NAME || 'access_token'
  private readonly refreshTokenName: string =
    process.env.REFRESH_TOKEN_NAME || 'refresh_token'

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginUserDto,
  ) {
    const loginResponse = await this.authService.login(loginDto)
    const { accessToken, refreshToken, ...rest } = loginResponse

    if (rest.success) {
      res.cookie(
        this.accessTokenName,
        accessToken,
        this.authService.getCookieOptions(),
      )
      res.cookie(
        this.refreshTokenName,
        refreshToken,
        this.authService.getCookieOptions(),
      )
    }

    return rest.user
  }

  @Post('/registration')
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto)
  }

  @UseGuards(AuthGuard)
  @Get('/refresh')
  async me(@Req() req) {
    return this.authService.refresh(req)
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req) {
    res.clearCookie(this.accessTokenName)
    res.clearCookie(this.refreshTokenName)
    return { message: 'Logout successful', user: req.user }
  }
}
