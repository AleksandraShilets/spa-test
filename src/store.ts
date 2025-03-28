import { create } from 'zustand';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  liked?: boolean; 
  detailedDescription?: string; 
}

interface StoreState {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  toggleLike: (id: number) => void;
  removeProduct: (id: number) => void; 
}

const useStore = create<StoreState>((set) => ({
  products: [],

  fetchProducts: async () => {
    console.log("Fetching products...");
    try {
      const response = await fetch('https://67dc2b4d1fd9e43fe477817a.mockapi.io/products');
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log("Полученные данные:", data);

      if (Array.isArray(data)) {
        set({ products: data.map((product) => ({ ...product, liked: false })) });
      } else {
        console.error('API вернул некорректные данные:', data);
        set({ products: [] });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Ошибка при добавлении продукта:', error.message);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
    }
    
    
  },

  addProduct: async (product) => {
    console.log("Добавление продукта:", product);
    try {
      const response = await fetch('https://67dc2b4d1fd9e43fe477817a.mockapi.io/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP при добавлении продукта: ${response.status}`);
      }

      const newProduct = await response.json();
      set((state) => ({ products: [...state.products, newProduct] }));
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error.message);
    }
  },

  toggleLike: (id) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, liked: !product.liked } : product
      ),
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));

export default useStore;
