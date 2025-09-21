'use client';

import useSWR from 'swr';
import Link from 'next/link';

interface NavigationItem {
  id: number;
  title: string;
  slug: string;
  url: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('http://localhost:3000/scraper/navigation', fetcher);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Loading Navigation...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-red-500">Failed to load navigation</h1>
        <p>Could not connect to the backend server.</p>
      </main>
    );
  }

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
              key={item.slug} // <-- FIX IS HERE
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