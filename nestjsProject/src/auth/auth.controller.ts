import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiProperty } from '@nestjs/swagger';

class userDto {
  @ApiProperty({ description: '账号',example:'用户账号' })
  account: string
  @ApiProperty({ description: '密码',example:'用户密码' })
  password: string
}

@Controller('auth')
@ApiTags('获取Token')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    // 传入name及password取得jwt token
    @Post('getToken')
    getTokenByUserId(@Body() userObj: userDto){
      return this.authService.createToken(userObj.account, userObj.password);
    }
}