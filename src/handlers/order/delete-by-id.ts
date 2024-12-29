export const handler = async (id: string) => {
  const content = await this.orderService.delete(id);

  return { result: content };
};
