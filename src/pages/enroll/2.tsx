// pages/enroll/[courseId].js
import React from 'react';
import { useRouter } from 'next/router';

const CourseEnroll = () => {
  const router = useRouter();
  const { courseId } = router.query;

  // Define the course video URL for each course ID (replace with actual YouTube video URLs)
  const courseVideos = {
    1: 'https://www.youtube.com/embed/ZxKM3DCV2kE?si=KM0Akf9bJT5KPRcT',
    // Add more course IDs and video URLs as needed
  };

  // Get the video URL for the selected course
  const videoUrl = courseVideos[1]; // You can replace this with courseId to dynamically select the video URL

  if (!videoUrl) {
    // Handle cases where courseId is not found or invalid
    return <div>Course not found.</div>;
  }

  return (
    <div className="video-container">
      <p className="welcome-text">Welcome to the course!</p>
      {/* Embed the YouTube video with styling */}
      <div className="video-wrapper">
        <div className="video-inner">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ZxKM3DCV2kE?si=KM0Akf9bJT5KPRcT" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
      <style jsx>{`
        .video-container {
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .welcome-text {
          background-color: black;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .video-wrapper {
          width: 80%; /* Adjust the width as needed */
          max-width: 800px; /* Set a maximum width for larger screens */
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }

        .video-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .video-inner iframe {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Prevents video thumbnail from being cut */
        }
      `}</style>
    </div>
  );
};

export default CourseEnroll;
