import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';

/**
 * ReVu Systems - Home Page
 * 
 * This is the main landing page for authenticated users,
 * providing navigation to key features of the ReVu platform.
 */
export default function Home() {
  const { data: session, status } = useSession();
  
  // Handle loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Head>
          <title>Loading... | ReVu Systems</title>
        </Head>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg">Loading ReVu Systems...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>ReVu Systems | Dental Billing Intelligence</title>
      </Head>
      
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">ReVu Systems</h1>
          {session && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{session.user.email}</span>
              <button 
                onClick={() => signOut()} 
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Dental Billing Intelligence</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The AI-powered platform that optimizes dental billing workflows
            and improves insurance claims management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <FeatureCard 
            title="Family Reveal"
            description="The personal heart of ReVu Systems."
            link="/family-reveal"
          />
          
          <FeatureCard 
            title="Clinical Notes"
            description="AI-enhanced dental notes with insurance optimization."
            link="/notes"
          />
          
          <FeatureCard 
            title="Vault Browser"
            description="Secure access to practice documents and records."
            link="/vault"
          />
        </div>
      </main>
      
      <footer className="border-t border-gray-800 px-6 py-4 text-center text-gray-500">
        &copy; 2025 ReVu Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}

/**
 * Feature Card Component
 * Displays a feature with title, description and link
 */
function FeatureCard({ title, description, link }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors duration-200">
      <h3 className="text-xl font-bold mb-3 text-blue-400">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <Link href={link} legacyBehavior>
        <a className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
          Open {title}
        </a>
      </Link>
    </div>
  );
}