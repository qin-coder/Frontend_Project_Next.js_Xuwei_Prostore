'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function AdminSearch() {
  const pathname = usePathname();
  const formActionUrl = pathname.includes('/admin/orders')
    ? '/admin/orders'
    : pathname.includes('/admin/users')
      ? '/admin/users'
      : '/admin/products';

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
      />
      <Button className="sr-only" type="button"></Button>
    </form>
  );
}
