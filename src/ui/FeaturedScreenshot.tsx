// FeaturedScreenshot.tsx
import { PlayIcon } from '@heroicons/react/24/solid';

const FeaturedScreenshot = () => {
  return (
    <div className='relative pt-16 bg-gray-50 sm:pt-24 lg:pt-32'>
      <div className='max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8'>
        <h2 className='text-xl font-semibold text-green-500'>Featured Courses</h2>
        <div>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Start learning today.
          </p>
          <p className='mx-auto mt-5 text-xl text-gray-500 max-w-prose'>
            Empower yourself with our expert-led courses. Start learning today for a brighter, more knowledgeable tomorrow.
          </p>
        </div>
        
        {/* Custom course preview with mock video player */}
        <div className='mt-12 -mb-10 sm:-mb-24 lg:-mb-80'>
          <div className='rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden bg-white'>
            {/* Course mock browser header */}
            <div className='h-8 bg-gray-100 flex items-center px-4 border-b border-gray-200'>
              <div className='flex space-x-2'>
                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              </div>
              <div className='mx-auto text-xs text-gray-400'>learn-hub.com/courses/python-masterclass</div>
            </div>
            
            {/* Course video player mockup */}
            <div className='relative'>
              <div className='aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center'>
                <div className='text-white text-center'>
                  <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-all'>
                    <PlayIcon className='h-10 w-10 text-white' />
                  </div>
                  <h3 className='text-2xl font-bold'>Python Masterclass</h3>
                  <p className='text-white/80 mt-2'>Learn Python from basics to advanced concepts</p>
                </div>
              </div>
              
              {/* Course content preview */}
              <div className='p-4 bg-white'>
                <div className='flex justify-between items-center border-b pb-4'>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex-shrink-0'></div>
                    <div className='ml-3'>
                      <div className='font-medium'>Dr. Alex Johnson</div>
                      <div className='text-sm text-gray-500'>Python Expert</div>
                    </div>
                  </div>
                  <div className='text-green-600 font-bold'>$49.99</div>
                </div>
                <div className='mt-4 grid grid-cols-3 gap-4 text-sm'>
                  <div className='text-center'>
                    <div className='font-bold text-gray-900'>42</div>
                    <div className='text-gray-500'>Lessons</div>
                  </div>
                  <div className='text-center'>
                    <div className='font-bold text-gray-900'>12</div>
                    <div className='text-gray-500'>Hours</div>
                  </div>
                  <div className='text-center'>
                    <div className='font-bold text-gray-900'>Beginner</div>
                    <div className='text-gray-500'>Level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedScreenshot;
