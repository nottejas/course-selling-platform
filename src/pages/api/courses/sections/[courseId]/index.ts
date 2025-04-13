import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../../../lib/withSession';
import dbConnect from '../../../../../lib/dbConnect';
import Course from '../../../../../models/Course';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  sections?: any[];
  section?: any;
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

  const { courseId } = req.query;
  const userId = req.session.user.id;

  // Validate MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(courseId as string)) {
    return res.status(400).json({ success: false, message: 'Invalid course ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getSections(res, courseId as string);
      case 'POST':
        return await addSection(req, res, courseId as string, userId);
      case 'PUT':
        return await updateSections(req, res, courseId as string, userId);
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in sections handler:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get all sections for a course
async function getSections(res: NextApiResponse, courseId: string) {
  try {
    const course = await Course.findById(courseId).select('sections');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, sections: course.sections || [] });
  } catch (error) {
    console.error('Error fetching sections:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Add a new section to a course
async function addSection(req: NextApiRequest, res: NextApiResponse, courseId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }

    // Validate section data
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Section title is required' });
    }

    // Create new section
    const newSection = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description: description || '',
      lessons: [],
      order: course.sections ? course.sections.length : 0
    };

    // Add section to course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { sections: newSection } },
      { new: true }
    ).select('sections');

    // Find the newly added section
    const addedSection = updatedCourse.sections.find(
      section => section._id.toString() === newSection._id.toString()
    );

    return res.status(201).json({ 
      success: true, 
      message: 'Section added successfully', 
      section: addedSection 
    });
  } catch (error) {
    console.error('Error adding section:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update all sections (reorder, bulk update)
async function updateSections(req: NextApiRequest, res: NextApiResponse, courseId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }

    // Validate sections data
    const { sections } = req.body;
    
    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ success: false, message: 'Sections array is required' });
    }

    // Validate each section
    for (const section of sections) {
      if (!section.title) {
        return res.status(400).json({ success: false, message: 'Each section must have a title' });
      }
      
      // If section has lessons, validate them
      if (section.lessons && Array.isArray(section.lessons)) {
        for (const lesson of section.lessons) {
          if (!lesson.title) {
            return res.status(400).json({ success: false, message: 'Each lesson must have a title' });
          }
        }
      }
    }

    // Update course with new sections
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { sections },
      { new: true }
    ).select('sections');

    return res.status(200).json({ 
      success: true, 
      message: 'Sections updated successfully', 
      sections: updatedCourse.sections 
    });
  } catch (error) {
    console.error('Error updating sections:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default withSessionRoute(handler); 