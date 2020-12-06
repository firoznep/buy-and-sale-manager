import * as yup from 'yup';

export const saleYupValidation = yup.object().shape({
  productName: yup
    .string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  model: yup.string().min(2, 'Too short').required('Required'),
  unit: yup.string().min(2, 'Too short').required('Required'),
  size: yup.string().min(2, 'Too short').required('Required'),
  color: yup.string().min(2, 'Too short').required('Required'),
  quantity: yup.number().min(1).required('At least one number'),
  price: yup.number().min(1).required('At least one number'),
});
