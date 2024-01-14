import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { IUserLoginRequest, IUserLoginResponse } from 'src/authentication/interface/user/user.interface';
import { UserService } from 'src/authentication/service/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService
    ){}
    @Post()
    authenticate(@Body() req: IUserLoginRequest): Promise<any> {
        console.log('Request received --->', req.reqNo, );
        return new Promise((resolve) => this.userService.authenticateUser(req)
        .then( (res: IUserLoginResponse) => 
            {
                console.log('Request completed -------------->', req.reqNo, res);
                resolve(!!res);
            })
        ).catch((err) => {
            if(err === 'UNAUTHORIZED') {
                throw new UnauthorizedException();
            }
            throw new BadRequestException();
        })
    }
}
