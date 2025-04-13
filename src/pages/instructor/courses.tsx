import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  PlusIcon 
} from '@heroicons/react/24/outline';

interface Course {
  _id: string;
  title: string;
  price: number;
  level: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  enrolledStudents: number;
  createdAt: string;
  ratings: {
    average: number;
    count: number;
  };
}

const InstructorCourses = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Fetch instructor's courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses?instructor=me&sort=${sortField}&order=${sortOrder}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [sortField, sortOrder]);
  
  // Handle sort change
  const handleSort = (field: string) => {
    if (field === sortField) {
      // Toggle order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new field
      setSortField(field);
      setSortOrder('desc');
    }
  };
  
  // Handle course deletion
  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      
      // Remove from state
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };
  
  // Handle status change
  const handleStatusChange = async (courseId: string, status: 'draft' | 'published' | 'archived') => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update course status');
      }
      
      // Update in state
      setCourses(courses.map(course => 
        course._id === courseId ? { ...course, status } : course
      ));
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <Link href="/instructor/create-course">
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Course
              </a>
            </Link>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first course.</p>
              <Link href="/instructor/create-course">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Create Course
                </a>
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('title')}
                          className="flex items-center"
                        >
                          Title
                          {sortField === 'title' && (
                            sortOrder === 'asc' ? 
                              <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                              <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('price')}
                          className="flex items-center"
                        >
                          Price
                          {sortField === 'price' && (
                            sortOrder === 'asc' ? 
                              <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                              <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('status')}
                          className="flex items-center"
                        >
                          Status
                          {sortField === 'status' && (
                            sortOrder === 'asc' ? 
                              <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                              <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('enrolledStudents')}
                          className="flex items-center"
                        >
                          Students
                          {sortField === 'enrolledStudents' && (
                            sortOrder === 'asc' ? 
                              <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                              <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('ratings.average')}
                          className="flex items-center"
                        >
                          Rating
                          {sortField === 'ratings.average' && (
                            sortOrder === 'asc' ? 
                              <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                              <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button 
                          onClick={() => handleSort('createdAt')}
                          className="flex items-center"
                        >
                          Created
                          {sortField === 'createdAt' && (
                            sortOrder === 'asc' ? 
                              <ArrowUpIcon className="h-4 w-4 ml-1" /> : 
                              <ArrowDownIcon className="h-4 w-4 ml-1" />
                          )}
                        </button>
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-xs text-gray-500">{course.category} • {course.level}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${course.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={course.status}
                            onChange={(e) => handleStatusChange(course._id, e.target.value as any)}
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.enrolledStudents}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.ratings.average.toFixed(1)} ({course.ratings.count})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => router.push(`/courses/${course._id}`)}
                              className="text-gray-600 hover:text-gray-900"
                              title="View"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => router.push(`/instructor/edit-course/${course._id}`)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(course._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default InstructorCourses; 