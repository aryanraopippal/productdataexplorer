'use client';

import useSWR from 'swr';
import Link from 'next/link';

// Define the shape of the data we expect from our API
interface NavigationItem {
  id: number;
  title: string;
  slug: string;
  url: string;
}

// Create a simple "fetcher" function that SWR will use
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  // This now uses our environment variable
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/scraper/navigation`, fetcher);

  // 1. Handle the loading state
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Loading Navigation...</h1>
      </main>
    );
  }

  // 2. Handle the error state
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-red-500">Failed to load navigation</h1>
        <p>Could not connect to the backend server.</p>
      </main>
    );
  }

  // 3. Handle the success state
   return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">Product Data Explorer</h1>
        <p className="text-lg text-gray-600 mt-2">Powered by World of Books</p>
      </div>
      
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Main Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data && data.data.map((item: NavigationItem) => (
            <Link 
              key={item.slug}
              href={`/category/${item.slug}`}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-green-50 transition-all duration-300 text-center"
            >
              <span className="font-semibold text-gray-800">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}