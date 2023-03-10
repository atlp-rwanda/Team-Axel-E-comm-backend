import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

export const checkoutController = {
  async checkoutPayment(req: Request, res: Response) {
    try {
      const { email, tokenId, amount } = req.body;

      const customer = await stripe.customers.create({
        email,
        source: tokenId,
        description: "Customer from the e-commerce",
      });

      await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        customer: customer.id,
        confirm: true,
      });

      return res.status(200).json({
        data: customer,
        message: "Successfully made payment",
        success: true,
        status: 200,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          error: err.message,
          message: "Failed to make payment",
          status: 400,
          success: false,
        });
      }
    }
  },
};
