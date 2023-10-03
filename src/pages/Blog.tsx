// Blog.tsx
import Link from 'next/link';
import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Python',
      href: 'https://learnpython.com/blog/python-loop/',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { name: 'Article', href: '#' },
      imageUrl:
        'https://www.ntuclearninghub.com/documents/51786/4216795/Python-Symbol.png/369e410e-a90f-f887-c2dc-61f7ef761476?t=1679043970578',
      preview:
        'Discover the power of Python: A versatile programming language known for its simplicity and effectiveness in various domains, from web development to machine learning.',
      author: {
        name: 'Roel Aufderehar',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
      },
      readingLength: '6 min',
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      href: 'https://2ality.com/index.html', // Add the JavaScript link here
      date: 'Jan 20, 2021',
      datetime: '2021-01-20',
      category: { name: 'Tutorial', href: '#' },
      imageUrl:
        'https://cdn.geekboots.com/geek/javascript-meta-1652702081069.jpg',
      preview:
        'Dive into the world of JavaScript with our comprehensive tutorial. Learn the fundamentals and start building interactive web applications.',
      author: {
        name: 'Dr. Alex Rauschmayer',
        imageUrl:
          'https://2ality.com/img/axel-head.jpg',
        href: '#',
      },
      readingLength: '8 min',
    },
    {
      id: 3,
      title: 'Data Science Insights',
      href: 'https://github.com/Moataz-Elmesmary/Data-Science-Roadmap', // Add the Data Science link here
      date: 'Sep 8, 2022',
      datetime: '2022-09-08',
      category: { name: 'Data Science Roadmap', href: '#' },
      imageUrl:
        'https://imageio.forbes.com/specials-images/imageserve/615a844b0e678d9d11c5fc26/The-5-Biggest-Data-Science-Trends-In-2022/960x0.jpg?height=399&width=711&fit=bounds',
      preview:
        'Stay ahead in the field of data science. Explore the latest trends, tools, and techniques for analyzing and interpreting data.',
      author: {
        name: 'Moataz Elmesmary',
        imageUrl:
          'https://avatars.githubusercontent.com/u/92026137?v=4',
        href: '#',
      },
      readingLength: '7 min',
    },
    // Add more blog post data here...
  ];

  return (
    <div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
      <div className="relative py-16 bg-white sm:py-24 lg:py-32">
        <div className="relative">
          <div className="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <h2 className="text-lg font-semibold text-green-500">Learn</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Helpful Resources
            </p>
            <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
              Explore our Tech Resources hub for the latest insights, tutorials, and tools in the ever-evolving world of technology. Stay updated, enhance your skills, and unlock new possibilities with our curated tech resources.
            </p>
          </div>
          <div className="grid max-w-md gap-8 px-6 mx-auto mt-12 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <div className="flex-shrink-0">
                  <a href={post.href}>
                    <img
                      className="object-cover w-full h-48"
                      src={post.imageUrl}
                      alt=""
                    />
                  </a>
                </div>
                <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                  <div className="flex-1">
                    <span className="inline-flex items-center rounded-full bg-red-200/70 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      {post.category.name}
                    </span>
                    <Link href={post.href}>{post.title}</Link>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    {post.preview}
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={post.author.imageUrl}
                      alt={`Author: ${post.author.name}`}
                    />
                    <p className="ml-2 text-sm text-gray-700">{post.author.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;