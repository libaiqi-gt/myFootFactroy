import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // 建立jsonwebtoken时的相关信息
    JwtModule.register({
        secretOrPrivateKey: 'geekjc-demo',
        // signOption可以在JwtModule设定
        // 或是在createToken时候设定
        signOptions: {
            // expiresIn: 3600,
            issuer: 'https://www.geekj.com',
        },
    }),
    UserModule],
  providers: [AuthService, HttpStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}