'use client';

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';

// Define the shape of our Product data
interface Product {
  id: number;
  sourceId: string;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  productUrl: string;
}

// Our reusable fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Create the dynamic API URL based on the slug from the page's URL
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.slug}`;

  // Use SWR to fetch the product data for this specific category
  const { data: products, error, isLoading } = useSWR<Product[]>(apiUrl, fetcher);

  // A simple function to make the slug look nicer for the title
  const formatTitle = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle Loading State
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24"><h1 className="text-4xl font-bold">Loading products...</h1></main>
    );
  }

  // Handle Error State
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24"><h1 className="text-4xl font-bold text-red-500">Failed to load products.</h1></main>
    );
  }

  // Handle Success State
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

        {/* Product Grid */}
        {products && Array.isArray(products) && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.sourceId}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl h-full">
                  <div className="w-full h-80 bg-gray-200 relative">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.title} 
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
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