import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

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

        return this.usersRepository.save({ role: UserRole.SPACTATOR, ...createUserDto });
    }
}
