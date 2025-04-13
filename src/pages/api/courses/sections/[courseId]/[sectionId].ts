import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../../../lib/withSession';
import dbConnect from '../../../../../lib/dbConnect';
import Course from '../../../../../models/Course';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
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
        return await getSection(res, courseId as string, sectionId as string);
      case 'PUT':
        return await updateSection(req, res, courseId as string, sectionId as string, userId);
      case 'PATCH':
        return await patchSection(req, res, courseId as string, sectionId as string, userId);
      case 'DELETE':
        return await deleteSection(req, res, courseId as string, sectionId as string, userId);
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in section handler:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get a specific section by ID
async function getSection(res: NextApiResponse, courseId: string, sectionId: string) {
  try {
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    const section = course.sections.id(sectionId);
    
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    return res.status(200).json({ success: true, section });
  } catch (error) {
    console.error('Error fetching section:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update a section (complete replace)
async function updateSection(req: NextApiRequest, res: NextApiResponse, courseId: string, sectionId: string, userId: string) {
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
    
    // Validate section data
    const { title, description, lessons } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Section title is required' });
    }
    
    // Update section fields
    section.title = title;
    section.description = description || '';
    
    // Update lessons if provided
    if (lessons && Array.isArray(lessons)) {
      // Validate lessons
      for (const lesson of lessons) {
        if (!lesson.title) {
          return res.status(400).json({ success: false, message: 'Each lesson must have a title' });
        }
      }
      section.lessons = lessons;
    }
    
    // Save the updated course
    await course.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Section updated successfully', 
      section: course.sections.id(sectionId) 
    });
  } catch (error) {
    console.error('Error updating section:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Partially update a section
async function patchSection(req: NextApiRequest, res: NextApiResponse, courseId: string, sectionId: string, userId: string) {
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
    
    // Update only the provided fields
    const updates = req.body;
    
    Object.keys(updates).forEach(key => {
      // Skip _id field to prevent errors
      if (key !== '_id') {
        // If updating lessons array, validate each lesson
        if (key === 'lessons' && Array.isArray(updates.lessons)) {
          for (const lesson of updates.lessons) {
            if (!lesson.title) {
              throw new Error('Each lesson must have a title');
            }
          }
        }
        section[key] = updates[key];
      }
    });
    
    // Save the updated course
    await course.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Section updated successfully', 
      section: course.sections.id(sectionId) 
    });
  } catch (error) {
    console.error('Error patching section:', error);
    if (error.message === 'Each lesson must have a title') {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Delete a section
async function deleteSection(req: NextApiRequest, res: NextApiResponse, courseId: string, sectionId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }
    
    // Find the section index
    const sectionIndex = course.sections.findIndex(
      section => section._id.toString() === sectionId
    );
    
    if (sectionIndex === -1) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    
    // Remove the section
    course.sections.splice(sectionIndex, 1);
    
    // Update the order of remaining sections
    course.sections.forEach((section, index) => {
      section.order = index;
    });
    
    // Save the updated course
    await course.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default withSessionRoute(handler); 