import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserModule } from './modules/user/user/user.module';
import { UserModule } from './modules/user/user.module';
import { SalonModule } from './salon/salon.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, SalonModule, AuthModule, ServiceModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
