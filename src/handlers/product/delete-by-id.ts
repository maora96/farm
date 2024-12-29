export const handler = async (id: string) => {
  const content = await this.productService.delete(id);

  return { result: content };
};
