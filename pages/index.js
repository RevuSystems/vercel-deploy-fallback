/**
 * ReVu Systems - Main Index Page
 * 
 * This is the main landing page for ReVu Systems.
 * It handles authentication and redirects to the appropriate dashboard.
 */

// Import React and Next.js components
const { useEffect } = require('react');
const { useRouter } = require('next/router');

/**
 * Main Index Page Component
 * Handles authentication and redirect flow
 */
function IndexPage() {
  const router = useRouter();

  // Effect to handle authentication and redirect
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = false; // This will be replaced with actual auth check
    
    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      router.push('/login');
    } else {
      // If authenticated, redirect to dashboard
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-900 sm:text-[5rem]">
          ReVu <span className="text-blue-600">Systems</span>
        </h1>
        <p className="text-2xl text-center text-gray-700">
          Advanced Dental Billing Intelligence Platform
        </p>
        <div className="animate-pulse">
          <p className="text-gray-500">Authenticating...</p>
        </div>
      </div>
    </div>
  );
}

module.exports = IndexPage;