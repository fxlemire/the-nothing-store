// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Nothing',
          },
          unit_amount: 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Nothing more',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Nothing at all',
          },
          unit_amount: 10000,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Nothing as in "You got Fucked."',
          },
          unit_amount: 100000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://thenothingstore.ngrok.io/',
    cancel_url: 'https://thenothingstore.ngrok.io/',
  });

  res.status(200).json({ id: session.id });
}
