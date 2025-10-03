import Link from 'next/link';

// Force static rendering to avoid context issues during prerendering
export const dynamic = 'error';

export default function Custom500() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Server Error</h2>
        <p className="text-gray-600 mb-6">
          Sorry, something went wrong on our server. We're working to fix the issue.
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}