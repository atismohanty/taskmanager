import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IUser, IUserResponse } from 'src/authentication/interface/user/user.interface';
import { UserService } from 'src/authentication/service/user/user.service';
@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService) {}
    @Post('new')
    public async createUser(@Body() payload: IUser): Promise<IUserResponse> {
        const foundUser = await this.userService.findUserByuserName(payload);

        if (foundUser) {
            delete(foundUser.password);
            return Promise.resolve(foundUser);
        }
        return await this.userService.createUser(payload);
    }

    @Get('')
    public async getAlluser(): Promise<IUserResponse[] | []> {
        const foundUser = await this.userService.findAllUser();
        if(foundUser.length) {
            foundUser.map((user) => delete(user.password));
        }
        return foundUser;

    }

    @Get('/:id')
    public async getUserById(@Param('id') userId: string): Promise<IUserResponse> {
        const foundUser = await this.userService.findByUserId(userId);
        if (foundUser) {
            delete(foundUser.password);
            return Promise.resolve(foundUser);
        }
        return Promise.resolve(null);
    }
}
