enum UserStatus {
  ACTIVE,
  INACTIVE
}

export class User extends Document {
  username: string;

  password: string;

  salt: string;

  age: number;

  status: UserStatus
}
