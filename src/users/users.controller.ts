import { Controller, Body, Param, Post, Get, Patch, Delete } from '@nestjs/common'
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

  @Get('/')
  getAll() {
    return this.usersService.getAll(true)
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(id)
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(id)
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(id, updateUserDto)
  }
}
