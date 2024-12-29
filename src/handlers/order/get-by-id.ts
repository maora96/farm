export const handler = async (id: string) => {
  const content = await this.orderService.getOne(id);

  return { result: content };
};
