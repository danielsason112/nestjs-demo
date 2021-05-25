import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() user: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(user)
            .then(entity => new UserEntity(entity));
    }

    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.findById(id)

    }
}
