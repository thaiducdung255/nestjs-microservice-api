import { Module } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
