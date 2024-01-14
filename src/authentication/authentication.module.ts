import { Module } from '@nestjs/common';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { User } from './entity/user/user';
import { getConfig } from 'src/dbconnection/dbconfig/dbconfig';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { AuthController } from './controller/user/auth/auth.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController, AuthController],
    providers: [UserService],
    exports: [TypeOrmModule]
})
export class AuthenticationModule {}
