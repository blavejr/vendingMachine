import * as Yup from 'yup';

export const create = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  deposit: Yup.number().default(0),
  role: Yup.string().oneOf(['seller', 'buyer']).default('buyer'),
});
