'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product) => {
          return (
            <CarouselItem key={product.id}>
              <Link href={`/product/${product.slug}`}>
                <div className="relative mx-auto">
                  <Image
                    src={`/images/${product.banner}`} // 确保路径正确
                    alt={product.name}
                    height="0"
                    width="0"
                    sizes="100vw"
                    className="size-full"
                  />
                  <div className="absolute inset-0 flex items-end justify-center">
                    <h2 className="bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
                      {product.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
