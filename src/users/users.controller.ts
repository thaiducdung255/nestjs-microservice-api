import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete
} from '@nestjs/common'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { User } from './schemas/user.schema'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll()
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(id)
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateOne(id, updateUserDto)
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteOne(id)
  }
}
