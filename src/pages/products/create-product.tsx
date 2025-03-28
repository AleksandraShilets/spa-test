import { useState } from 'react';
import useStore from '@/store';
import Link from 'next/link';

const CreateProductPage = () => {
  const { addProduct } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct({
      id: Date.now(),
      title,
      description,
      price: Number(price),
      image,
    });
    setTitle('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name"
        required
      />
     <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Description"
  required
  className="w-96 h-32 resize-none border rounded-md p-2"
/>

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="URL image"
        required
      />
      <button type="submit">Add product</button>
      <div className='flex flex-col'>
      <Link href="/products" className="mt-auto py-4 text-right link-reset" >
             Back products 
      </Link>
      </div>
      
    </form>
  );
};

export default CreateProductPage;
