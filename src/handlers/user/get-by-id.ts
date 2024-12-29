export const handler = async (id: string) => {
  const content = await this.userService.getOne(id);

  return { result: content };
};
