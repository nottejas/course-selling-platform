// FeaturedGrid.tsx
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Hands on learning',
    description:
      'Hands-on learning that empowers you to apply knowledge in real-world scenarios, enhancing your practical skills.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Built-in note taking',
    description:
      'Effortlessly capture and organize your insights with built-in note-taking tools to help you retain key concepts.',
    icon: LockClosedIcon,
  },
  {
    name: 'Set and track goals',
    description:
      'Set, monitor, and achieve your learning goals with our goal-tracking feature, ensuring steady progress toward mastery.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Earn a certificate',
    description:
      'Earn valuable certificates of completion as proof of your accomplishments, boosting your professional profile.',
    icon: ShieldCheckIcon,
  },
];

const FeaturedGrid = () => {
  return (
    <div className='relative py-16 bg-white sm:py-24 lg:py-32'>
      <div className='max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8'>
        <h2 className='text-xl font-semibold text-green-500'>Deploy faster</h2>
        <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Everything you need to deploy your app
        </p>
        <p className='mx-auto mt-5 text-xl text-gray-500 max-w-prose'>
        Unlock the tools, skills, and resources you need to bring your app vision to life. From ideation to deployment, we've got you covered on your web app development journey.
        </p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature) => (
              <div key={feature.name} className='pt-6'>
                <div className='flow-root px-6 pb-8 rounded-lg bg-gray-50'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 rounded-md shadow-lg bg-gradient-to-r from-teal-400 to-green-600'>
                        <feature.icon
                          className='w-6 h-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium tracking-tight text-gray-900'>
                      {feature.name}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGrid;
