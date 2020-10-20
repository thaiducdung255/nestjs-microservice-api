import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { randomBytes } from 'crypto'


@Injectable()
export class UsersService {
  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3727,
      }
    })
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const salt: string = randomBytes(20).toString('hex')
    const createdUser = new this.userModel({ ...createUserDto, salt })
    return createdUser.save()
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find()
  }

  async getOne(id: string): Promise<User> {
    const FOUND_USER = await this.userModel.findOne({
      _id: id
    })

    if (FOUND_USER) {
      return FOUND_USER
    }

    throw new NotFoundException(`User #${id} does not exists`)
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const UPDATED_USER = await this.userModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: updateUserDto
      },
      {
        new: true
      }
    )

    if (UPDATED_USER) {
      return UPDATED_USER
    }

    throw new NotFoundException(`User #${id} does not exists`)
  }

  async deleteOne(id: string): Promise<User> {
    const DELETED_USER = await this.userModel.findOneAndDelete({ _id: id })

    if (DELETED_USER) {
      return DELETED_USER
    }

    throw new NotFoundException(`User #${id} does not exists`)
  }
}
