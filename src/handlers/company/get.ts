import { SearchFilters } from 'src/utils/filters';

export const handler = async (filters: SearchFilters) => {
  const content = await this.companyService.getMany(filters);

  return { result: content };
};
