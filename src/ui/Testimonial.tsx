import Image from "next/image";

const Testimonial = () => {
  return (
    <div id="testimonial-section">
      <div className='pt-24 pb-16 bg-white sm:pt-32 sm:pb-24 xl:pb-32'>
        <div className='pb-20 bg-gray-900 sm:pb-24 xl:pb-0'>
          <div className='flex flex-col items-center px-6 mx-auto max-w-7xl gap-y-10 gap-x-8 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch'>
            <div className='w-full max-w-2xl -mt-8 xl:-mb-8 xl:w-96 xl:flex-none'>
              <div className='relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto'>
                <Image
                  className='absolute inset-0 object-cover w-full h-full bg-gray-800 shadow-2xl rounded-2xl'
                  src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80'
                  alt=''
                  height={100}
                  width={900}
                />
              </div>
            </div>
            <div className='w-full max-w-2xl xl:max-w-none xl:flex-auto xl:py-24 xl:px-16'>
              <figure className='relative pt-6 isolate sm:pt-12'>
                <svg
                  viewBox='0 0 162 128'
                  fill='none'
                  aria-hidden='true'
                  className='absolute top-0 left-0 h-32 -z-10 stroke-white/20'>
                  <path
                    id='b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb'
                    d='M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.2760 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.4550 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.7030 43.4454 34.3114 38.3450 38.8667 33.6325C43.5812 28.7610 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.64970 72.6341 0.62247 68.8814 1.15270C61.1635 2.24320 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.6180 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.49010 56.6544 0.50000 66.6148 0.50000 77.4391C0.50000 84.2996 1.61702 90.7679 3.85425 96.8404L3.85580 96.8445C6.08991 102.749 9.12394 108.020 12.9590 112.654L12.9590 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z'
                  />
                  <use href='#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb' x={86} />
                </svg>
                <blockquote className='text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9'>
                  <p>
                    I&apos;m a passionate full-stack coder with a relentless curiosity for learning new frameworks and cutting-edge technologies. My interests extend beyond traditional development, as I&apos;m captivated by the realms of AI and the decentralized web (Web3). I thrive on the ever-evolving landscape of tech, where I can transform ideas into innovative digital experiences.
                  </p>
                </blockquote>
                <figcaption className='mt-8 text-base'>
                  <div className='font-semibold text-white'>Priya Pandey, Mansi Patil</div>
                  <div className='mt-1 text-gray-400'>CEO of CourseVista</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
