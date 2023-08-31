import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { configService } from 'src/core/config.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './classes/jwt.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.getJwtSecret(),
      signOptions: { algorithm: 'HS256' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
})
export class AuthModule {}
