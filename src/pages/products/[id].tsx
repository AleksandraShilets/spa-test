import { useRouter } from 'next/router';
import useStore from '@/store'; 
import { Product } from '@/store';
import { useEffect, useState } from 'react';
import CreateProductPage from './create-product';

const ProductPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  const { products } = useStore();

  useEffect(() => {
    if (!id || !products.length) return;

    let productId = id;
    if (Array.isArray(id)) {
      productId = id[0];
    }

    if (productId === 'create-product') {
      return; 
    }

    const foundProduct = products.find((item: Product) => item.id === Number(productId));
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id, products]);

  if (id === 'create-product') {
    return <CreateProductPage />;
  }

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (!product) {
    return <div>Продукт не найден.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="product-card bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <img
          src={product.image}
          alt={product.title}
          className="product-image mx-auto rounded-lg mb-4"
        />
        <div className="product-details text-center">
          <h1 className="product-title text-2xl font-bold mb-2 product-details">{product.title}</h1>
          <p className="product-description text-gray-600 mb-4">
            {product.detailedDescription || product.description}
          </p>
          <p className="product-price text-lg font-semibold text-blue-500">
            Цена: ${product.price}
          </p>
          <button
            onClick={() => router.push('/products')}
            className="back-button mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
          >
            Назад к товарам
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
