import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>ReVu Systems</title>
        <meta name="description" content="The Dental Intelligence Platform" />
      </Head>

      <main className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          ReVu Systems
        </h1>
        
        <div className="flex flex-col space-y-6 items-center">
          <div className="bg-indigo-100 p-4 rounded-lg text-center">
            <p className="text-lg text-indigo-800 mb-4">
              Welcome to the Dental Intelligence Platform
            </p>
            <p className="text-sm text-indigo-600">
              AI-powered billing optimization and practice management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <Link href="/test-tailwind" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-center transition-colors">
              Tailwind CSS Test
            </Link>
            
            <Link href="/login" className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-center transition-colors">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}