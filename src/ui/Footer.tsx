import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

// Define the footerNavigation object
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/tejas.padmakar',
      colorClass: 'text-blue-500 hover:text-blue-700',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/iampadmakartejas/',
      colorClass: 'text-pink-500 hover:text-pink-700',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/nottejas17',
      colorClass: 'text-blue-500 hover:text-blue-700',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/nottejas',
      colorClass: 'text-gray-900 hover:text-gray-700',
    },
  ],
};

const Footer = () => {
  return (
    <div id="contact-us">
      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-md px-6 pt-12 mx-auto sm:max-w-7xl lg:px-8 lg:pt-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <img
                className="h-10"
                src="https://tailwindui.com/img/logos/mark.svg?from-color=teal&from-shade=200&to-color=green&to-shade=400&toShade=400"
                alt="CourseVista"
              />
              <p className="text-base text-gray-500">
                Making the world a better place through constructing elegant
                hierarchies.
              </p>
              <div className="flex space-x-6">
              {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-400 transition duration-300 ${item.colorClass}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    {item.name === 'Facebook' && <FaFacebook />}
                    {item.name === 'Instagram' && <FaInstagram />}
                    {item.name === 'Twitter' && <FaTwitter />}
                    {item.name === 'GitHub' && <FaGithub />}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-base font-medium text-gray-900">
                    Support
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    Company
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-base font-medium text-gray-900">Legal</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="py-8 mt-12 border-t border-gray-200">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2023 CourseVista, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
