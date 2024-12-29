import { EditCompanyDTO } from 'src/modules/company/dtos/edit-company.dto';

export const handler = async (payload: EditCompanyDTO) => {
  const content = await this.companyService.edit(payload);

  return { result: content };
};
