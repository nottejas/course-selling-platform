import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../lib/withSession';
import dbConnect from '../../../lib/dbConnect';
import Course from '../../../models/Course';
import User from '../../../models/User';

type ResponseData = {
  success: boolean;
  message?: string;
  courses?: any[];
  course?: any;
  count?: number;
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

  const userId = req.session.user.id;
  
  try {
    switch (req.method) {
      case 'GET':
        return await getCourses(req, res);
      case 'POST':
        return await createCourse(req, res, userId);
      default:
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in courses handler:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Get courses with filtering, sorting, and pagination
async function getCourses(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      instructor, 
      status, 
      category,
      price_min, 
      price_max,
      search,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const query: any = {};
    const skip = (Number(page) - 1) * Number(limit);

    // Filter by instructor
    if (instructor) {
      if (instructor === 'me' && req.session.user) {
        query.instructor = req.session.user.id;
      } else {
        query.instructor = instructor;
      }
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (price_min || price_max) {
      query.price = {};
      if (price_min) query.price.$gte = Number(price_min);
      if (price_max) query.price.$lte = Number(price_max);
    }

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Count total documents matching the query
    const count = await Course.countDocuments(query);

    // Determine sort order
    const sortOptions: any = {};
    sortOptions[sort as string] = order === 'asc' ? 1 : -1;

    // Fetch courses with pagination and sorting
    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({ 
      success: true, 
      courses,
      count
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Create a new course
async function createCourse(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    // Check if user exists and is an instructor
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Optional: Check if user is allowed to create courses
    // if (!user.isInstructor) {
    //   return res.status(403).json({ success: false, message: 'User is not an instructor' });
    // }

    // Create course with default draft status
    const { title, description, price, category, image } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const newCourse = new Course({
      title,
      description: description || '',
      price: price || 0,
      instructor: userId,
      category: category || 'Other',
      image: image || '/images/course-placeholder.jpg',
      status: 'draft', // Default status
      sections: [], // Empty sections array
      enrollments: 0,
      ratings: {
        average: 0,
        count: 0
      }
    });

    await newCourse.save();

    return res.status(201).json({ 
      success: true, 
      message: 'Course created successfully', 
      course: newCourse 
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export default withSessionRoute(handler); 