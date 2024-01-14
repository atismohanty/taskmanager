import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbconnectionModule } from './dbconnection/dbconnection.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
   DbconnectionModule,
   AuthenticationModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
