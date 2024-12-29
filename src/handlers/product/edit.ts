import { EditProductDTO } from 'src/modules/product/dtos/edit-product.dto';

export const handler = async (payload: EditProductDTO) => {
  const content = await this.productService.edit(payload);

  return { result: content };
};
