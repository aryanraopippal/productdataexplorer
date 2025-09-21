export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800">About This Project</h1>
        <p className="text-lg text-gray-600 mt-6 leading-relaxed">
          This Product Data Explorer was built as a full-stack assignment. It is powered by a Next.js frontend and a NestJS backend, with data seeded into a PostgreSQL database.
        </p>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
          The project demonstrates a complete user flow from a homepage, through category pages, to product detail pages, all built with a production-minded approach.
        </p>
        <a href="/" className="mt-8 inline-block text-green-600 hover:underline">
          &larr; Back to Home
        </a>
      </div>
    </main>
  );
}