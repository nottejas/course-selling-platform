import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../../../../../lib/withSession';
import dbConnect from '../../../../../../../lib/dbConnect';
import Course from '../../../../../../../models/Course';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  lessons?: any[];
  lesson?: any;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();

  // Check if user is authenticated
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { courseId, sectionId } = req.query;
  const userId = req.session.user.id;

  // Validate MongoDB IDs
  if (!mongoose.Types.ObjectId.isValid(courseId as string) || 
      !mongoose.Types.ObjectId.isValid(sectionId as string)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getLessons(res, courseId as string, sectionId as string);
      case 'POST':
        return await addLesson(req, res, courseId as string, sectionId as string, userId);
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in lessons handler:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get all lessons for a specific section
async function getLessons(res: NextApiResponse, courseId: string, sectionId: string) {
  try {
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    const section = course.sections.id(sectionId);
    
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    return res.status(200).json({ success: true, lessons: section.lessons || [] });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Add a new lesson to a section
async function addLesson(req: NextApiRequest, res: NextApiResponse, courseId: string, sectionId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }
    
    // Find the section
    const section = course.sections.id(sectionId);
    
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    // Validate lesson data
    const { title, content, videoUrl, duration, type, isPreview } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Lesson title is required' });
    }
    
    // Create new lesson
    const newLesson = {
      title,
      content: content || '',
      videoUrl: videoUrl || '',
      duration: duration || 0,
      type: type || 'video',
      isPreview: isPreview || false,
      order: section.lessons ? section.lessons.length : 0
    };
    
    // Add lesson to section
    if (!section.lessons) {
      section.lessons = [];
    }
    
    section.lessons.push(newLesson);
    
    // Save the updated course
    await course.save();
    
    // Get the newly created lesson (with MongoDB _id)
    const addedLesson = section.lessons[section.lessons.length - 1];
    
    return res.status(201).json({ 
      success: true, 
      message: 'Lesson added successfully', 
      lesson: addedLesson 
    });
  } catch (error) {
    console.error('Error adding lesson:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default withSessionRoute(handler); 