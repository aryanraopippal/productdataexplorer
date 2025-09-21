'use client'; // <-- FIX #1: Make this a Client Component

import useSWR from 'swr';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  productUrl: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const apiUrl = `http://localhost:3000/categories/${params.slug}`;
  const { data: products, error, isLoading } = useSWR<Product[]>(apiUrl, fetcher);

  const formatTitle = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (isLoading) {
    return <main className="flex min-h-screen flex-col items-center p-24"><h1 className="text-4xl font-bold">Loading products...</h1></main>;
  }

  if (error) {
    return <main className="flex min-h-screen flex-col items-center p-24"><h1 className="text-4xl font-bold text-red-500">Failed to load products.</h1></main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="mb-8">
          <Link href="/" className="text-green-600 hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-2">
            {formatTitle(params.slug)}
          </h1>
        </div>

        {products && Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              // --- THIS IS THE WRAPPER WE ARE ADDING ---
              <Link key={product.id} href={`/product/${product.sourceId}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl h-full">
                  <div className="w-full h-80 bg-gray-200">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 truncate group-hover:text-green-700">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.author}</p>
                    <p className="font-bold text-lg text-gray-900 mt-2">£{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found for this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}