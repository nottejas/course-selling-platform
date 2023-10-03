/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['spectrum.ieee.org', 'images.unsplash.com', 'cdn.geekboots.com', '2ality.com', 'imageio.forbes.com', 'avatars.githubusercontent.com', 'img-c.udemycdn.com', 'img-c.udemycdn.com', 'tailwindui.com', ],
    dangerouslyAllowSVG: true, // Add the domain for your images
  },
};
