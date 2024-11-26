
'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProducts } from '@/store/productSlice';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product._id}`}>
              <h2>{product.name}</h2>
            </Link>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
