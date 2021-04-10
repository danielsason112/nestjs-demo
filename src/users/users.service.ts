import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        if (await this.usersRepository.findOne(createUserDto.email)) {
            throw new BadRequestException();
        }

        return this.usersRepository.save({ role: UserRole.SPACTATOR, ...createUserDto });
    }
}
