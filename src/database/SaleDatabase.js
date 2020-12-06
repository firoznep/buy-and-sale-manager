export const SaleModel = {
  name: 'Sales',
  props: {
    date: '?datetime',
    customer: '?string',
    productName: 'string',
    quantity: 'int',
    price: 'int',
    total_amount: 'int',
    payment_method: '?string',
    model: '?string',
    size: '?string',
    color: '?string',
    unit: '?string',
    description: '?string',
  },
};
