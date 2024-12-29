import { CreateOrderDTO } from 'src/modules/order/dtos/create-order.dto';

export const handler = async (payload: CreateOrderDTO) => {
  const content = await this.orderService.create(payload);

  return { result: content };
};
