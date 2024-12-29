export const handler = async (id: string) => {
  const content = await this.userService.delete(id);

  return { result: content };
};
