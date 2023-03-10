import Joi from "joi";

type CheckoutAttributes = {
  tokenId: string;
  email: string;
  amount: number;
};

export const CheckoutSchema = {
  checkout: {
    create: Joi.object<CheckoutAttributes>({
      email: Joi.string().email().required(),
      tokenId: Joi.string().required(),
      amount: Joi.number().required(),
    }),
  },
};
