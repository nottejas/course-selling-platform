// Hero.tsx
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Hero = () => {
  return (
    <section>
      <div className="pt-10 bg-gradient-to-r from-gray-900 to-gray-800 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="max-w-md px-6 mx-auto sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">Unlock your</span>
                  <span className="block pb-3 text-transparent bg-gradient-to-r from-teal-200 to-green-400 bg-clip-text sm:pb-5">
                    Learning Potential
                  </span>
                </h1>
                <p className="text-base text-gray-300 sm:text-xl lg:text-xl">
                  Discover a world of knowledge with our course selling app.
                  Empower yourself with expert-led courses, personalized
                  learning experiences, and a gateway to your educational
                  aspirations.
                </p>
                <div className="mt-10 sm:mt-12">
                  <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                    <div className="sm:flex">
                      <div className="flex-1 min-w-0">
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="block w-full px-4 py-3 text-base text-gray-100 placeholder-gray-500 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link href="/courses">
                          <button
                            type="submit"
                            className="block w-full px-4 py-3 font-medium text-gray-100 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          >
                            Start free trial
                          </button>
                        </Link>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                      Start your free 14-day trial, no credit card necessary. By
                      providing your email, you agree to our{' '}
                      <Link
                        href="#"
                        className="font-medium text-white hover:underline"
                      >
                        terms of service
                      </Link>                      
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
              <div className="max-w-md px-6 mx-auto sm:max-w-2xl lg:max-w-none lg:px-0">
                {/* Abstract illustration using divs and CSS */}
                <div className="w-full h-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none">
                  <div className="relative w-full h-64 mx-auto overflow-hidden rounded-lg lg:h-auto lg:w-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-teal-400 to-green-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
                      <div className="absolute w-48 h-48 bg-gradient-to-tr from-blue-500 to-teal-300 rounded-full blur-lg opacity-70 -top-10 -left-10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-32 h-32 bg-gradient-to-bl from-green-400 to-emerald-200 rounded-full blur-lg opacity-70 -bottom-5 -right-5 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white">LearnHub</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
