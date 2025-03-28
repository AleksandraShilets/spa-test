import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useStore from '@/store';
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from 'react-icons/ai';



const ProductsPage = () => {
  const router = useRouter();
  const { products, fetchProducts, toggleLike, removeProduct } = useStore();
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const handleCardClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts =
    filter === 'all' ? products : products.filter((product) => product.liked);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
  {/* Заголовок */}
  <h1 className="text-3xl font-bold text-center mb-8">Services</h1>

  {/* Контейнер для кнопок */}
  <div className="flex justify-between items-center mb-8">
    <button
      onClick={() => router.push('/products/create-product')}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Create product
    </button>
    <button
      onClick={() => router.push('/')}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Go to main
    </button>
  </div>
      {/* Фильтрация */}
      <div className="flex justify-center w-[200px] mx-auto mb-8 p-4 gap-4 flex-container">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-400 transition`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('liked')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'liked' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-blue-400 transition`}
        >
          Favourites
        </button>
      </div>

      {/* Сетка продуктов */}
      <div className="grid-container">
        {filteredProducts.map((product) => (
          <div
          key={product.id}
          className="card relative bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[400px]"
          onClick={() => handleCardClick(product.id)}
        >
           {/* Кнопка удаления */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeProduct(product.id);
              }}
              className="absolute cross top-2 right-2 bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 hover:text-black transition"
            >
              <AiOutlineClose size={24} />
            </button>


            {/* Изображение */}
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.title}
              style={{
                width: '400px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
                aspectRatio: '3/4',
              }}
            />

            {/* Кнопка лайка */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(product.id);
              }}
              className={`sticky ${
                product.liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'
              } hover:scale-[1.2] transition rounded-full p-[6px]`}
            >
              {product.liked ? (
                <AiFillHeart size={24} />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </button>

            {/* Контент */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-4 truncate">{product.description}</p>
              <p className="text-sm font-bold text-blue-600">Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
