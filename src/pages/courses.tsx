import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  price: string;
  summary: string;
  imageWidth: number;
  imageHeight: number;
}

interface ShowDetails {
  [key: number]: boolean;
}

const Courses = () => {
  const courses: Course[] = [
    {
      id: 1,
      title: 'Complete Python Developer in 2023: Zero to Mastery',
      description: 'Comprehensive Python Developer Course',
      imageUrl: 'https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg',
      duration: '8 weeks',
      price: '₹3499',
      summary:
        'This comprehensive and project-based course will introduce you to all of the modern skills of a Python developer (Python 3) and along the way, we will build over 12 real-world projects to add to your portfolio (You will get access to all the code from the 12+ projects we build so that you can put them on your portfolio right away)!',
      imageWidth: 750, // Add the width here
      imageHeight: 422, // Add the height here
    },
    {
      id: 2,
      title: 'The Complete 2023 Web Development Bootcamp',
      description:
        'Master the art of web development as you build real-world projects. Learn HTML, CSS, JavaScript, and more to create interactive websites and applications. Get hands-on experience and access to project code to boost your portfolio immediately.',
      imageUrl:
        'https://img-c.udemycdn.com/course/750x422/1565838_e54e_16.jpg',
      duration: '6 weeks',
      price: '₹2999',
      summary: 'Learn important skills in this course.',
      imageWidth: 750, // Add the width here
      imageHeight: 422, // Add the height here
    },
    {
      id: 3,
      title: 'Machine Learning A-Z: Hands-On Python & R In Data Science',
      description: 'Learn to create Machine Learning Algorithms in Python and R from scratch',
      imageUrl: 'https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg',
      duration: '10 weeks',
      price: '₹4999',
      summary: 'Learn how to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included for you to download and use in your own projects.',
      imageWidth: 750,
      imageHeight: 422,
    },
    {
      id: 4,
      title: 'React - The Complete Guide 2023',
      description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and more!',
      imageUrl: 'https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg',
      duration: '7 weeks',
      price: '₹3799',
      summary: 'This course will teach you React.js in a practice-oriented way, using all the latest patterns and best practices. You will learn all the key fundamentals as well as advanced concepts and related topics to turn you into a React.js developer.',
      imageWidth: 750,
      imageHeight: 422,
    },
    {
      id: 5,
      title: 'The Data Science Course 2023: Complete Data Science Bootcamp',
      description: 'Complete Data Science Training: Mathematics, Statistics, Python, Advanced Statistics, Machine & Deep Learning',
      imageUrl: 'https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg',
      duration: '12 weeks',
      price: '₹4599',
      summary: 'The Data Science Course is the most comprehensive, yet straight-forward, course for the data science and machine learning field. Learn statistical analysis, Python, and the most in-demand skills needed for data scientist roles.',
      imageWidth: 750,
      imageHeight: 422,
    },
    {
      id: 6,
      title: 'JavaScript: The Advanced Concepts',
      description: 'Learn modern advanced JavaScript practices and be in the top 10% of JavaScript developers',
      imageUrl: 'https://img-c.udemycdn.com/course/750x422/1501104_967d_13.jpg',
      duration: '5 weeks',
      price: '₹2499',
      summary: 'Advanced JavaScript concepts such as prototype inheritance, scope, closures, execution context, higher-order functions, and more. Gain a deep understanding of how JavaScript works behind the scenes.',
      imageWidth: 750,
      imageHeight: 422,
    }
  ];

  const router = useRouter();

  const [showDetails, setShowDetails] = useState<ShowDetails>({});

  // Provide type annotations for courseId parameter
  const toggleDetails = (courseId: number) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  // Provide type annotations for courseId parameter
  const enrollNow = (courseId: number) => {
    router.push(`/enroll/${courseId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-4 text-blue-900">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-36 object-cover"
                width={course.imageWidth} // Add width property
                height={course.imageHeight} // Add height property
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-black">
                  {course.title}
                </h2>
                {/* Display Price and Duration */}
                <div className="flex justify-between mt-4">
                  <div className="text-gray-700">
                    Price: <span className="text-black">{course.price}</span>
                  </div>
                  <div className="text-gray-700">
                    Duration:{' '}
                    <span className="text-black">{course.duration}</span>
                  </div>
                </div>

                {/* Conditional rendering of description */}
                {showDetails[course.id] && (
                  <>
                    <p className="text-gray-600">{course.description}</p>
                    <p className="text-gray-700">{course.summary}</p>
                    <button
                      onClick={() => enrollNow(course.id)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      Enroll Now
                    </button>
                  </>
                )}

                {!showDetails[course.id] && (
                  <button
                    onClick={() => toggleDetails(course.id)}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    Show Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
