import { EditUserDTO } from 'src/modules/user/dtos/edit-user.dto';

export const handler = async (payload: EditUserDTO) => {
  const content = await this.userService.edit(payload);

  return { result: content };
};
