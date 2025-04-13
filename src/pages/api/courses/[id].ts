import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../lib/withSession';
import dbConnect from '../../../lib/dbConnect';
import Course from '../../../models/Course';
import mongoose from 'mongoose';

type ResponseData = {
  success: boolean;
  message?: string;
  course?: any;
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

  const { id } = req.query;
  const userId = req.session.user.id;

  // Validate MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ success: false, message: 'Invalid course ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getCourse(res, id as string);
      case 'PUT':
        return await updateCourse(req, res, id as string, userId);
      case 'PATCH':
        return await patchCourse(req, res, id as string, userId);
      case 'DELETE':
        return await deleteCourse(res, id as string, userId);
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in course handler:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get a single course by ID
async function getCourse(res: NextApiResponse, courseId: string) {
  try {
    const course = await Course.findById(courseId)
      .populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.status(200).json({ success: true, course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update a course (complete replacement)
async function updateCourse(req: NextApiRequest, res: NextApiResponse, courseId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }

    // Get data from request body
    const { 
      title, 
      description, 
      price, 
      category, 
      image, 
      status,
      sections = []
    } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    // Validate sections structure if provided
    if (sections && Array.isArray(sections)) {
      for (const section of sections) {
        if (!section.title) {
          return res.status(400).json({ 
            success: false, 
            message: 'Each section must have a title' 
          });
        }

        if (section.lessons && Array.isArray(section.lessons)) {
          for (const lesson of section.lessons) {
            if (!lesson.title) {
              return res.status(400).json({ 
                success: false, 
                message: 'Each lesson must have a title' 
              });
            }
          }
        }
      }
    }

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId, 
      {
        title,
        description: description || '',
        price: price || 0,
        category: category || 'Other',
        image: image || course.image,
        status: status || course.status,
        sections: sections || course.sections
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Course updated successfully', 
      course: updatedCourse 
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Partially update a course
async function patchCourse(req: NextApiRequest, res: NextApiResponse, courseId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
    }

    // Validate sections structure if provided
    if (req.body.sections && Array.isArray(req.body.sections)) {
      for (const section of req.body.sections) {
        if (!section.title) {
          return res.status(400).json({ 
            success: false, 
            message: 'Each section must have a title' 
          });
        }

        if (section.lessons && Array.isArray(section.lessons)) {
          for (const lesson of section.lessons) {
            if (!lesson.title) {
              return res.status(400).json({ 
                success: false, 
                message: 'Each lesson must have a title' 
              });
            }
          }
        }
      }
    }

    // Update only the fields that are provided
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Course updated successfully', 
      course: updatedCourse 
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Delete a course
async function deleteCourse(res: NextApiResponse, courseId: string, userId: string) {
  try {
    // Check if course exists and belongs to this user
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this course' });
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({ 
      success: true, 
      message: 'Course deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default withSessionRoute(handler); 