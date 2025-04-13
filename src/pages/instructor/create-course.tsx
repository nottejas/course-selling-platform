import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

// Course section type
interface CourseSection {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz';
    content: string;
  }[];
}

const CreateCourse = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('beginner');
  const [category, setCategory] = useState('programming');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [sections, setSections] = useState<CourseSection[]>([
    {
      id: '1',
      title: 'Introduction',
      lessons: [
        {
          id: '1',
          title: 'Welcome to the course',
          type: 'video',
          content: ''
        }
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Add a new section
  const addSection = () => {
    setSections([...sections, {
      id: Date.now().toString(),
      title: 'New Section',
      lessons: []
    }]);
  };
  
  // Update section title
  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    ));
  };
  
  // Add a lesson to a section
  const addLesson = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        lessons: [
          ...section.lessons,
          {
            id: Date.now().toString(),
            title: 'New Lesson',
            type: 'video',
            content: ''
          }
        ]
      } : section
    ));
  };
  
  // Update lesson details
  const updateLesson = (sectionId: string, lessonId: string, field: string, value: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        lessons: section.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
        )
      } : section
    ));
  };
  
  // Remove a lesson
  const removeLesson = (sectionId: string, lessonId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? {
        ...section,
        lessons: section.lessons.filter(lesson => lesson.id !== lessonId)
      } : section
    ));
  };
  
  // Remove a section
  const removeSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate form
      if (!title || !description || !price) {
        throw new Error('Please fill in all required fields');
      }
      
      // Format course data
      const courseData = {
        title,
        description,
        price: parseFloat(price),
        level,
        category,
        thumbnailUrl,
        sections,
        instructorId: user?._id
      };
      
      // Submit to API
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create course');
      }
      
      // Navigate to courses page on success
      router.push('/instructor/courses');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Course</h1>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title *</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Course Description *</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($) *</label>
                      <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                      <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="programming">Programming</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                        <option value="marketing">Marketing</option>
                        <option value="personal-development">Personal Development</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                      <input
                        type="text"
                        id="thumbnail"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Course Content */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Course Content</h3>
                    <button
                      type="button"
                      onClick={addSection}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Add Section
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {sections.map((section, index) => (
                      <div key={section.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={section.title}
                              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-medium"
                              placeholder="Section Title"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSection(section.id)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="ml-4 space-y-3 mt-3">
                          {section.lessons.map((lesson) => (
                            <div key={lesson.id} className="border-b pb-3">
                              <div className="flex items-center mb-2">
                                <input
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                  placeholder="Lesson Title"
                                />
                                <select
                                  value={lesson.type}
                                  onChange={(e) => updateLesson(section.id, lesson.id, 'type', e.target.value)}
                                  className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                >
                                  <option value="video">Video</option>
                                  <option value="text">Text</option>
                                  <option value="quiz">Quiz</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => removeLesson(section.id, lesson.id)}
                                  className="ml-2 text-red-600 hover:text-red-800 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                              
                              <textarea
                                value={lesson.content}
                                onChange={(e) => updateLesson(section.id, lesson.id, 'content', e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                placeholder={lesson.type === 'video' ? 'Video URL' : lesson.type === 'quiz' ? 'Quiz questions (JSON format)' : 'Lesson content'}
                                rows={3}
                              />
                            </div>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => addLesson(section.id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Add Lesson
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateCourse; 