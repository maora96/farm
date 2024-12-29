import { CreateUserDTO } from 'src/modules/user/dtos/create-user.dto';

export const handler = async (payload: CreateUserDTO) => {
  const content = await this.userService.create(payload);

  return { result: content };
};
