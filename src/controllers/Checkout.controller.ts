import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2022-11-15",
});

// This controller will record a customer and also make charges
export const checkoutController = {
  async checkoutPayment(req: Request, res: Response) {
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
        source: req.body.tokenId,
        description: "Cypherteam customer",
      });

      await stripe.paymentIntents.create({
        amount: 4000, // generic number
        currency: "usd",
        customer: customer.id,
        confirm: true,
      });

      return res.status(200).json({
        message: "Successfully made payment",
        succes: true,
        status: 200,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          success: false,
          error: err.message,
          message: "Failed to make payment",
          status: 400,
        });
      }
    }
  },
};
