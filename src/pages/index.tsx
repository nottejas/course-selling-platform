import LandingPageLayout from '../layouts/LandingPageLayout';
import Hero from '@/ui/Hero';
import FeaturedScreenshot from '@/ui/FeaturedScreenshot';
import FeaturedGrid from '@/ui/FeaturedGrid';
import Testimonial from '@/ui/Testimonial';
import Blog from 'src/pages/Blog';
import CallToAction from '@/ui/CallToAction';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    // Check for user session or token here
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <LandingPageLayout>
      <main>
        <Hero />
        {isLoggedIn && (
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome back!</h2>
              <Link href="/courses" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
        <FeaturedScreenshot />
        <FeaturedGrid />
        <Testimonial />
        <Blog />
        <CallToAction />
      </main>
    </LandingPageLayout>
  );
}
