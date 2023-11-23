import * as Yup from 'yup';

const DEFAULT_IMAGE = "https://www.freepnglogos.com/uploads/potato-chips-png/lays-classic-potato-chips-packet-png-image--0.png";

export const create = Yup.object().shape({
  amountAvailable: Yup.number().required(),
  cost: Yup.number().required(),
  productName: Yup.string().required(),
  image: Yup.string().url().default(DEFAULT_IMAGE)
});

export const update = Yup.object({
    amountAvailable: Yup.number(),
    cost: Yup.number(),
    productName: Yup.string(),
    image: Yup.string().url().default(DEFAULT_IMAGE)
  });
  