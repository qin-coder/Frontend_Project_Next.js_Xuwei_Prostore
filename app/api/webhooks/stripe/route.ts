import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateOrderToPaid } from '@/lib/actions/order.actions';

export async function POST(req: NextRequest) {
  // Build the webhook event
  const event = await Stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  // Check for successful payment
  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as Stripe.PaymentIntent;

    // Update order status
    await updateOrderToPaid({
      orderId: intent.metadata.orderId,
      paymentResult: {
        id: intent.id,
        status: 'COMPLETED',
        email_address: intent.receipt_email ?? '',
        pricePaid: (intent.amount / 100).toFixed(),
      },
    });

    return NextResponse.json({
      message: 'updateOrderToPaid was successful',
    });
  }

  return NextResponse.json({
    message: 'event is not charge.succeeded',
  });
}
