export const handler = async (id: string) => {
  const content = await this.companyService.getOne(id);

  return { result: content };
};
