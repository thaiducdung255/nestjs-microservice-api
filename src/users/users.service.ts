import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

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

  public createOne(createUserDto: CreateUserDto) {
    return this.client.send<User, CreateUserDto>({ cmd: 'create-user' }, createUserDto)
  }

  public getAll(_: boolean) {
    return this.client.send<User[], boolean>({ cmd: 'get-all-users' }, _)
  }

  public getOne(id: string) {
    return this.client.send<User, string>({ cmd: 'get-one-user' }, id)
  }

  public deleteOne(id: string) {
    return this.client.send<User, string>({ cmd: 'delete-one-user' }, id)
  }

  public updateOne(id: string, updateUserDto: UpdateUserDto) {
    return this.client.send<User, any>({
      cmd: 'update-one-user'
    },
    {
      id,
      updateUserDto
    })
  }
}
