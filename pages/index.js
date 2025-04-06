import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Starfield from "../components/Starfield";
import HeroTerminal from "../components/HeroTerminal";

export default function Home() {
  return (
    <>
      <Head>
        <title>ReVu Systems</title>
        <meta name="description" content="Born in Cold Lake. Built for Canadian dentistry." />
        <style>{`
          @keyframes fadeIn { 0%{opacity:0;} 100%{opacity:1;} }
          @keyframes rotate { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.4); }
          }
          .animate-rotate { animation: rotate 60s linear infinite; }
          .animate-fade { animation: fadeIn 2s ease-out forwards; }
          .animate-twinkle { animation: twinkle 5s ease-in-out infinite; }
          .animate-fade-delayed { animation: fadeIn 2s ease-out 1.5s forwards; opacity: 0; }
        `}</style>
      </Head>

      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <Starfield />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-900 to-black opacity-50 animate-rotate"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-screen space-y-8 px-4">
          <div className="pt-12">
            <HeroTerminal />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold animate-fade text-center">ReVu Systems</h1>
          
          <p className="text-xl text-center max-w-xl animate-fade-delayed">
            Born in Cold Lake. Built for Canadian dentistry. Powered by AI.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md animate-fade-delayed">
            <Link href="/family-reveal" className="bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded text-center transition-colors">
              Family Reveal
            </Link>
            
            <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded text-center transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}