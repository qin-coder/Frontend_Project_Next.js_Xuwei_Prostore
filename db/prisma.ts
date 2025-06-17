import { neonConfig, PoolConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// 设置 WebSocket 构造函数
neonConfig.webSocketConstructor = ws;

// 手动创建 PoolConfig 对象（而不是直接传入 Pool 实例）
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};
class CustomPrismaClient extends PrismaClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(adapter: any) {
    super();
    // 自定义逻辑可以在这里实现
    this.adapter = adapter;
  }
}
// 传入 PoolConfig 而不是 Pool 实例
const adapter = new PrismaNeon(poolConfig);

// 扩展 PrismaClient
export const prisma = new CustomPrismaClient(adapter).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(cart) {
          return cart.price.toString();
        },
      },
    },
  },
});
