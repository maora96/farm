import { EditOrderDTO } from 'src/modules/order/dtos/edit-order.dto';

export const handler = async (payload: EditOrderDTO) => {
  const content = await this.orderService.edit(payload);

  return { result: content };
};
