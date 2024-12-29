export const handler = async (id: string) => {
  const content = await this.companyService.delete(id);

  return { result: content };
};
