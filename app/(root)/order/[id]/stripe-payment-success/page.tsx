import { Button } from '@/components/ui/button';
import { getOrderById, updateOrderToPaid } from '@/lib/actions/order.actions'; // 导入更新函数
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  // Fetch order
  const order = await getOrderById(id);
  if (!order) notFound();

  

  // Retrieve payment intent
  let paymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    return redirect(`/order/${id}?error=payment_not_found`);
  }

  // Check if payment intent is valid
  if (
    !paymentIntent.metadata?.orderId || // Using optional chains and truth checking
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    console.error('Payment intent metadata mismatch:', {
      expected: order.id.toString(),
      actual: paymentIntent.metadata?.orderId
    });
    return redirect(`/order/${id}?error=invalid_payment`);
  }

  // Check if payment is successful
  const isSuccess = paymentIntent.status === 'succeeded';
  
  if (isSuccess) {
    try {
      // ✅ Key fix: Update order status here!
      await updateOrderToPaid({
        orderId: order.id.toString(),
        paymentResult: {
          id: paymentIntent.id,
          status: 'COMPLETED',
          email_address: paymentIntent.receipt_email || '',
          pricePaid: (paymentIntent.amount / 100).toFixed(2),
        },
      });
    } catch (updateError) {
      console.error('Failed to update order status:', updateError);
      
    }

    return (
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="flex flex-col gap-6 items-center">
          <h1 className="h1-bold">Thanks for your purchase</h1>
          <div>We are processing your order.</div>
          <Button asChild>
            <Link href={`/order/${id}`}>View Order</Link>
          </Button>
        </div>
      </div>
    );
  }

  // If payment is unsuccessful, redirect back to the order page and carry the error message.
  return redirect(`/order/${id}?error=payment_failed&status=${paymentIntent.status}`);
}