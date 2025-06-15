import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
// shema for inserting products
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must be a valid number with up to two decimal places'
  );
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().min(1, 'Description is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z
    .string()
    .min(3, 'description must be at least 3 characters long'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
