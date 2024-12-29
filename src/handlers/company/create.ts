import { CreateCompanyDTO } from 'src/modules/company/dtos/create-company.dto';

export const handler = async (payload: CreateCompanyDTO) => {
  const content = await this.companyService.create(payload);

  return { result: content };
};
