'use client';

import Image from 'next/image';
import Link from 'next/link';

const LINKS = [
  {
    title: 'Products',
    items: [
      { title: 'acrylic colors', link: '/acrylic-colors' },
      { title: 'stationary kits', link: '/stationary-kits' },
      { title: 'vintage diaries', link: '/vintage-diaries' },
      { title: 'customized planner', link: '/customized-planner' },
      { title: 'desk supplies', link: '/desk-supplies' },
    ],
  },
  {
    title: 'Company',
    items: [{ title: 'About Us', link: '/modules/AboutUs' }],
  },
  {
    title: 'Resource',
    items: [{ title: 'Blog', link: '/modules/Blog' }],
  },
];

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="relative w-full bg-transparent mt-5 z-50">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Link href="/">
            <Image 
              src="/Arty-US_logo.png" 
              alt="Arty Us Logo" 
              height={140} 
              width={140}
              className="h-auto w-auto"
            />
          </Link>

          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <h6 className="mb-3 text-sm font-medium opacity-40">{title}</h6>
                {items.map(({ title, link }, key) => (
                  <li key={key}>
                    <Link
                      href={link}
                      className="block py-1.5 text-gray-600 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <h5 className="text-sm font-normal text-blue-gray-900 text-center md:mb-0">
            © {currentYear} Arty Us. All Rights Reserved.
          </h5>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
