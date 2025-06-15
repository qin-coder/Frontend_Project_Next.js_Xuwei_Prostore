import { getLatestProducts } from '@/lib/actions/product.action';
import ProductList from '@/components/shared/product/product-list';
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <div>
      <ProductList data={latestProducts} title="Newest Arrivals" />
    </div>
  );
};

export default Homepage;
