export const handler = async (id: string) => {
  const content = await this.productService.getOne(id);

  return { result: content };
};
