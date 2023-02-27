import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2022-11-15',
});

export const checkoutController = {
  async checkoutPayment(req: Request, res: Response) {
    try {
      // we still need ID coming from the front-end for this to work
      const customer = await stripe.customers.create({
        email: req.body.email,
        source: req.body.tokenId,
        description: 'Cypherteam customer',
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 4000, // generic number
        currency: 'usd',
        customer: customer.id,
        confirm: true,
      });

      res.status(200).json('successfully makde a payment');
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ success: false, error: err.message });
      }
    }
  },
};
