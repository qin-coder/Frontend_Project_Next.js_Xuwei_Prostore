'use client';

import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Cart } from '@/types';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
//use sonner instead of useToast and toaster
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function CartTable({ cart }: { cart?: Cart }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="h1 py-4 h2-bold">Shopping Cart</div>

      {!cart || cart.items.length <= 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => {
                  return (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />{' '}
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="flex-center gap-2">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId
                              );
                              if (!res.success) toast.error(res.message);
                            });
                          }}
                        >
                          {isPending ? (
                            <Loader className="size-4 animate-spin" />
                          ) : (
                            <Minus className="size-4" />
                          )}
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={isPending}
                          variant="outline"
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              const res = await addItemToCart(item);
                              if (!res.success) toast.error(res.message);
                            });
                          }}
                        >
                          {isPending ? (
                            <Loader className="size-4 animate-spin" />
                          ) : (
                            <Plus className="size-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):{' '}
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                type="button"
                className="w-full"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push('/shipping-address'))
                }
              >
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <ArrowRight className="size-4" />
                )}{' '}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
