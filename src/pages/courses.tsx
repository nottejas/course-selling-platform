import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Complete Python Developer in 2023: Zero to Mastery',
      description: 'Comprehensive Python Developer Course',
      imageUrl: 'https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg',
      duration: '8 weeks',
      price: '$99',
      summary:
        'This comprehensive and project-based course will introduce you to all of the modern skills of a Python developer (Python 3) and along the way, we will build over 12 real-world projects to add to your portfolio (You will get access to all the code from the 12+ projects we build so that you can put them on your portfolio right away)!',
    },
    {
      id: 2,
      title: 'The Complete 2023 Web Development Bootcamp',
      description:
        'Master the art of web development as you build real-world projects. Learn HTML, CSS, JavaScript, and more to create interactive websites and applications. Get hands-on experience and access to project code to boost your portfolio immediately.',
      imageUrl:
        'https://miro.medium.com/v2/resize:fit:750/0*QmxDMtQShSHGzC6v.jpg',
      duration: '6 weeks',
      price: '$79',
      summary: 'Learn important skills in this course.',
    },
    // Add more courses as needed
  ];

  const router = useRouter();

  // Initialize showDetails state to hide the description for all courses
  const [showDetails, setShowDetails] = useState({});

  // Function to toggle the visibility of course details for a specific course
  const toggleDetails = (courseId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };

  // Function to handle enrolling in a course
  const enrollNow = (courseId) => {
    // Redirect to another page, e.g., /enroll/courseId
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
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-36 object-cover"
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
