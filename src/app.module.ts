import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { configService } from './core/config.service';
import { SalonModule } from './modules/salon/salon.module';
import { ServiceModule } from './modules/service/service.module';
import { OrderModule } from './modules/order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MulterModule,
    UserModule,
    AuthModule,
    SalonModule,
    ServiceModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
