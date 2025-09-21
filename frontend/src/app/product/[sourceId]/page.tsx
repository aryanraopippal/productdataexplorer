'use client';

import useSWR from 'swr';
import Link from 'next/link';

// Define the shape of the detailed Product data
interface ProductDetail {
  id: number;
  sourceId: string;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  productUrl: string;
  category: {
    title: string;
    slug: string;
  };
  details: {
    description: string;
    publisher: string;
    publicationDate: string;
    isbn: string;
    reviews: { author: string; rating: number; text: string }[];
  }
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductDetailPage({ params }: { params: { sourceId: string } }) {
  const apiUrl = `http://localhost:3000/products/${params.sourceId}`;
  const { data: product, error, isLoading } = useSWR<ProductDetail>(apiUrl, fetcher);

  if (isLoading) {
    return <main className="flex min-h-screen flex-col items-center justify-center p-24"><h1 className="text-4xl font-bold">Loading Product...</h1></main>;
  }

  if (error || !product || !product.details) {
    return <main className="flex min-h-screen flex-col items-center justify-center p-24"><h1 className="text-4xl font-bold text-red-500">Failed to load product.</h1></main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href={`/category/${product.category.slug}`} className="text-green-600 hover:underline">
            &larr; Back to {product.category.title}
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image Column */}
          <div className="md:col-span-1">
            <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-cover rounded-md shadow-md" />
          </div>

          {/* Details Column */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
            <p className="text-xl text-gray-600 mt-2">by {product.author}</p>
            <p className="text-4xl font-bold text-green-700 my-4">£{product.price}</p>
            
            <div className="mt-6 border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.details.description}</p>
            </div>

            <div className="mt-6 border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Information</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Publisher:</strong> {product.details.publisher}</li>
                <li><strong>Published:</strong> {product.details.publicationDate}</li>
                <li><strong>ISBN:</strong> {product.details.isbn}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Reviews</h2>
          <div className="space-y-6">
            {product.details.reviews.map((review, index) => (
              <div key={index} className="border-t pt-4">
                <p className="font-semibold text-gray-900">{review.author}</p>
                <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                <p className="text-gray-700 mt-1">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}