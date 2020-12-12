import * as yup from 'yup';

export const customerYupValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  contact: yup
    .string()
    .min(10)
    .max(10)
    .required('Required 10 Digits, Ex: 1234567890'),
});
