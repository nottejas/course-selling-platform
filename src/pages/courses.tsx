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
    // ... (your course data)
  ];

  const router = useRouter();

  // Initialize showDetails state to hide the description for all courses
  const [showDetails, setShowDetails] = useState<ShowDetails>({});

  // Function to toggle the visibility of course details for a specific course
  const toggleDetails = (courseId: number) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId],
    }));
  };
  

  // Function to handle enrolling in a course
  const enrollNow = (courseId: number) => {
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
