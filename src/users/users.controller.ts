import { Controller, Body, Post, Get, Patch, Delete } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  createOne(@Body() createUserDto: CreateUserDto) {
    this.usersService.createOne(createUserDto)
  }

  @Get()
  getAll(_) {
    return this.client.send<User[]>('get-all-users', _)
  }

  @Get()
  getOne(id: string) {
    return this.client.send<User, string>('get-one-user', id)
  }

  @Delete()
  deleteOne(id: string) {
    return this.client.send<User, string>('delete-one-user', id)
  }

  @Patch()
  updateOne(id: string, updateUserDto: UpdateUserDto) {
    return this.client.send<User, UpdateUserDto>('update-one-user', updateUserDto)
  }
}
