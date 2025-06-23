import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const prices = [
  { name: '$1 to $50', value: '1-50' },
  { name: '$51 to $100', value: '51-100' },
  { name: '$101 to $200', value: '101-200' },
  { name: '$201 to $500', value: '201-500' },
  { name: '$501 to $1000', value: '501-1000' },
  { name: 'over $1000', value: '1001-9999999' },
];

const ratings = [4, 3, 2, 1];
const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet =
    category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search 
      ${isQuerySet ? q : ''} 
      ${isCategorySet ? `Category ${category}` : ''}
      ${isPriceSet ? `Price ${price}` : ''}
      ${isRatingSet ? `Rating ${rating}` : ''}`,
    };
  } else return { title: 'Search Products' };
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    p,
    s,
    r,
    pg,
  }: {
    c?: string;
    p?: string;
    s?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      {/* Filter Sidebar */}
      <div className="filter-links pr-4 max-w-[220px]">
        {/* Category */}
        <div className="text-base font-semibold mb-2 mt-6 text-gray-900">
          Categories
        </div>
        <ul className="space-y-2 text-sm text-gray-800">
          {[
            { label: 'Any', value: 'all' },
            ...categories.map((c) => ({
              label: c.category,
              value: c.category,
            })),
          ].map((item) => {
            const isSelected =
              category === item.value ||
              (item.value === 'all' && (category === 'all' || category === ''));
            return (
              <li key={item.value}>
                <Link
                  href={getFilterUrl({ c: item.value })}
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span
                    className={cn(
                      'w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center',
                      isSelected ? 'border-2 border-black' : ''
                    )}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </span>
                  <span
                    className={
                      isSelected ? 'font-medium text-black' : 'text-gray-700'
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Price */}
        <div className="text-base font-semibold mb-2 mt-8 text-gray-900">
          Price
        </div>
        <ul className="space-y-2 text-sm text-gray-800">
          {[{ name: 'Any', value: 'all' }, ...prices].map((p) => {
            const isSelected = price === p.value;
            return (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span
                    className={cn(
                      'w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center',
                      isSelected ? 'border-2 border-black' : ''
                    )}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </span>
                  <span
                    className={
                      isSelected ? 'font-medium text-black' : 'text-gray-700'
                    }
                  >
                    {p.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Ratings */}
        <div className="text-base font-semibold mb-2 mt-8 text-gray-900">
          Customer Ratings
        </div>
        <ul className="space-y-2 text-sm text-gray-800">
          {[
            { label: 'Any', value: 'all' },
            ...ratings.map((r) => ({
              label: `${r} stars & up`,
              value: `${r}`,
            })),
          ].map((r) => {
            const isSelected = rating === r.value;
            return (
              <li key={r.value}>
                <Link
                  href={getFilterUrl({ r: r.value })}
                  className="flex items-center gap-2 hover:text-black"
                >
                  <span
                    className={cn(
                      'w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center',
                      isSelected ? 'border-2 border-black' : ''
                    )}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </span>
                  <span
                    className={
                      isSelected ? 'font-medium text-black' : 'text-gray-700'
                    }
                  >
                    {r.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Product Section */}
      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {q !== 'all' && q !== '' && <span>Query: {q}</span>}
            {category !== 'all' && category !== '' && (
              <span>Category: {category}</span>
            )}
            {price !== 'all' && <span>Price: {price}</span>}
            {rating !== 'all' && <span>Rating: {rating} stars & up</span>}
            {(q !== 'all' && q !== '') ||
            (category !== 'all' && category !== '') ||
            rating !== 'all' ||
            price !== 'all' ? (
              <Button variant="link" asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>

          <div className="text-sm">
            <div className="text-base font-semibold mb-2 text-gray-900">
              Sort by
            </div>
            <div className="flex items-center gap-4">
              {sortOrders.map((s) => {
                const isSelected = sort === s;
                return (
                  <Link
                    key={s}
                    href={getFilterUrl({ s })}
                    className="flex items-center gap-2 hover:text-black"
                  >
                    <span
                      className={cn(
                        'w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center',
                        isSelected ? 'border-2 border-black' : ''
                      )}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 bg-black rounded-full" />
                      )}
                    </span>
                    <span
                      className={
                        isSelected ? 'font-medium text-black' : 'text-gray-700'
                      }
                    >
                      {s}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length <= 0 && <div>No products found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
