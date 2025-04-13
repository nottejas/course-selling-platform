import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../../../../../../lib/withSession';
import dbConnect from '../../../../../../../../lib/dbConnect';
import Course from '../../../../../../../../models/Course';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
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

  const { courseId, sectionId, lessonId } = req.query;
  const userId = req.session.user.id;

  // Validate MongoDB IDs
  if (!mongoose.Types.ObjectId.isValid(courseId as string) || 
      !mongoose.Types.ObjectId.isValid(sectionId as string) ||
      !mongoose.Types.ObjectId.isValid(lessonId as string)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getLesson(res, courseId as string, sectionId as string, lessonId as string);
      case 'PUT':
        return await updateLesson(req, res, courseId as string, sectionId as string, lessonId as string, userId);
      case 'PATCH':
        return await patchLesson(req, res, courseId as string, sectionId as string, lessonId as string, userId);
      case 'DELETE':
        return await deleteLesson(req, res, courseId as string, sectionId as string, lessonId as string, userId);
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in lesson handler:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get a specific lesson
async function getLesson(
  res: NextApiResponse,
  courseId: string,
  sectionId: string,
  lessonId: string
) {
  try {
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    const section = course.sections.id(sectionId);
    
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    const lesson = section.lessons.id(lessonId);
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    
    return res.status(200).json({ success: true, lesson });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Complete update of a lesson
async function updateLesson(
  req: NextApiRequest,
  res: NextApiResponse,
  courseId: string,
  sectionId: string,
  lessonId: string,
  userId: string
) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }
    
    // Find the section and lesson
    const section = course.sections.id(sectionId);
    
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    const lesson = section.lessons.id(lessonId);
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    
    // Validate lesson data
    const { title, content, videoUrl, duration, type, isPreview, order } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Lesson title is required' });
    }
    
    // Update lesson properties
    lesson.title = title;
    lesson.content = content || '';
    lesson.videoUrl = videoUrl || '';
    lesson.duration = duration || 0;
    lesson.type = type || 'video';
    lesson.isPreview = isPreview || false;
    lesson.order = order !== undefined ? order : lesson.order;
    
    // Save the updated course
    await course.save();
    
    return res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      lesson
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Partial update of a lesson
async function patchLesson(
  req: NextApiRequest,
  res: NextApiResponse,
  courseId: string,
  sectionId: string,
  lessonId: string,
  userId: string
) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }
    
    // Find the section and lesson
    const section = course.sections.id(sectionId);
    
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    const lesson = section.lessons.id(lessonId);
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    
    // Update lesson properties that were provided
    const { title, content, videoUrl, duration, type, isPreview, order } = req.body;
    
    if (title !== undefined) lesson.title = title;
    if (content !== undefined) lesson.content = content;
    if (videoUrl !== undefined) lesson.videoUrl = videoUrl;
    if (duration !== undefined) lesson.duration = duration;
    if (type !== undefined) lesson.type = type;
    if (isPreview !== undefined) lesson.isPreview = isPreview;
    if (order !== undefined) lesson.order = order;
    
    // Save the updated course
    await course.save();
    
    return res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      lesson
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Delete a lesson
async function deleteLesson(
  req: NextApiRequest,
  res: NextApiResponse,
  courseId: string,
  sectionId: string,
  lessonId: string,
  userId: string
) {
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
    
    // Find the lesson index
    const lessonIndex = section.lessons.findIndex(
      (l: any) => l._id.toString() === lessonId
    );
    
    if (lessonIndex === -1) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    
    // Remove the lesson
    section.lessons.splice(lessonIndex, 1);
    
    // Reorder remaining lessons
    section.lessons.forEach((lesson: any, index: number) => {
      lesson.order = index;
    });
    
    // Save the updated course
    await course.save();
    
    return res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default withSessionRoute(handler); 