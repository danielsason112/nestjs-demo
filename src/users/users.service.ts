import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { LoginCred } from './dto/login-cred.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    readonly SALT_ROUNDS: number = 10;

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        if (await this.usersRepository.findOne(createUserDto.email)) {
            throw new BadRequestException();
        }

        createUserDto.password = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);

        return this.usersRepository.save({ role: UserRole.SPECTATOR, ...createUserDto });
    }

    async findById(id: string): Promise<UserEntity> {
        return await this.usersRepository.findOneOrFail(id)
            .catch((err) => {
                throw new NotFoundException();
            });
    }

    async findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find()
    }

    async login(credentials: LoginCred): Promise<UserEntity> {
        let user = await this.usersRepository.findOneOrFail(credentials.email)
            .catch(() => {
                throw new UnauthorizedException();
            });

        if (!await bcrypt.compare(credentials.password, user.password)) {
            throw new UnauthorizedException();
        }

        return user;


    }
}
