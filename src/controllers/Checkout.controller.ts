import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2022-11-15',
});

export const checkoutController = {
  async checkoutPayment(_req: Request, res: Response) {
    try {
      // we still need ID coming from the front-end for this to work
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 4000, // generic number
        currency: 'usd',
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ success: false, error: err.message });
      }
    }
  },
};
