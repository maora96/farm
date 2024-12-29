import { CreateProductDTO } from 'src/modules/product/dtos/create-product.dto';

export const handler = async (payload: CreateProductDTO) => {
  const content = await this.productService.create(payload);

  return { result: content };
};
