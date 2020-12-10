import * as yup from 'yup';

export const saleYupValidation = yup.object().shape({
  product_Name: yup
    .string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  quantity: yup.number().min(1).required('At least one number'),
  price: yup.number().min(1).required('At least one number'),
});
