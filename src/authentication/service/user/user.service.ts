import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/authentication/entity/user/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser, IUserLoginRequest, IUserLoginResponse } from 'src/authentication/interface/user/user.interface';
import { hash, genSalt } from 'bcrypt';
const salt = '$2b$10$rzVh1z6Qtq2aJ5MHNIe5Ou'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
       
    }

    async createUser(userData: IUser) {
        userData.isActive =  true;
        const hashedPwd =  await this.encryptPassword(userData.password);
        userData.password = hashedPwd;
        const createdUser = this.userRepository.create(userData);
        const savedUserData = await this.userRepository.save(createdUser);
        delete(savedUserData.password);
        return savedUserData;
    }

    async findUserByuserName(userData: IUser) : Promise<User> {
        return await this.userRepository.findOneBy({userName: userData.userName});
    }

    async findAllUser() : Promise<User[]> {
        try{
            return await this.userRepository.find({});
        } catch(err) {
            return Promise.resolve([]);
        }
    }

    async findByUserId(userId: string) : Promise<User> {
        return await this.userRepository.findOneBy({id: userId})
    }

    async authenticateUser(userCredentials: IUserLoginRequest): Promise<IUserLoginResponse | undefined> {
        try {
            const findUserQuery = await this.userRepository.findOneBy({ userName: userCredentials.userName });
            if (!findUserQuery) {
                new Error('UNAUTHORIZED');
            }
            const hasedPassword = await this.encryptPassword(userCredentials.password);
            if (findUserQuery.password === hasedPassword) {
                const responseQuery = findUserQuery.password === hasedPassword ? {userName: findUserQuery.userName} : undefined;
                
                return Promise.resolve (responseQuery);
            }
            new Error('UNAUTHORIZED');
        } catch(err) {
            return Promise.reject(err);
        }
       

    }

    async encryptPassword(password: string): Promise<string> {
        const genHash = await hash(password, salt);
        return Promise.resolve(genHash)
    }
}
