'use client';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { ChevronDownIcon, ShoppingBagIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Arty-US_logo.png';
import { Fragment, useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';

interface ApiCategory {
  id: number;
  name: string;
  created_at: string;
}

interface ApiChildCategory {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
}

interface ApiSlug {
  id: number;
  slug_name: string;
  child_category_name: string;
}

interface UiItem {
  name: string;
  href: string;
}

interface UiSection {
  id: string;
  name: string;
  items: UiItem[];
}

interface UiFeatured {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface UiCategory {
  id: string | number;
  name: string;
  featured: UiFeatured[];
  sections: UiSection[];
}

interface NavigationData {
  categories: UiCategory[];
}

const navigation = {
  categories: [
    {
      id: 'Stationery Supplies',
      name: 'Stationery Supplies',
      featured: [
        {
          name: 'Stationery Essentials1',
          href: '#',
          imageSrc: '/image/navbarImages/schoolsupplies1.jpg',
          imageAlt: 'Stationery Image',
        },
        {
          name: 'Stationery Essentials2',
          href: '#',
          imageSrc: '/image/navbarImages/schoolsupplies2.jpg',
          imageAlt: 'Stationery Image.',
        },
      ],
      sections: [
        {
          id: 'StationeryBasics',
          name: 'Stationery Basics',
          items: [
            { name: 'Pencil' },
            { name: 'Pens' },
            { name: 'Sharpeners' },
            { name: 'Erasers' },
            { name: 'Geometric Tools' },
            { name: 'Exam Boards' },
            { name: 'Glue and Adhesives' },
            { name: 'Desk Supplies' },
          ],
        },
        {
          id: 'Artsupplies',
          name: 'Art Supplies',
          items: [
            { name: 'Color Pencils' },
            { name: 'Water Colors' },
            { name: 'Crayon Colors' },
            { name: 'Poster Colors' },
            { name: 'Sketch Pens' },
            { name: 'Markers and Highlighters' },
            { name: 'Color Palette' },
            { name: 'Paint Brushes' },
          ],
        },
      ],
    },

    {
      id: 'art&craft',
      name: 'Art & Craft',
      featured: [
        {
          name: 'Art Essentials1',
          href: '#',
          imageSrc: '/image/navbarImages/artandcraft1.jpg',
          imageAlt: 'Art Essentials',
        },
        {
          name: 'Art Essentials2',
          href: '#',
          imageSrc: '/image/navbarImages/artandcraft2.jpg',
          imageAlt: 'Art Essentials',
        },
      ],
      sections: [
        {
          id: 'ArtPaints',
          name: 'Art Paints',
          items: [
            { name: 'Acrylic Colors' },
            { name: 'Fabric Colors' },
            { name: 'Oil Colors' },
            { name: 'Spray Paints' },
          ],
        },
      ],
    },

    {
      id: 'Planners',
      name: 'Planners',
      featured: [
        {
          name: 'Meetings Planner',
          href: '#',
          imageSrc: '/image/navbarImages/planner.jpg',
          imageAlt: 'Meetings Planner',
        },
        {
          name: 'Everyday Journal',
          href: '#',
          imageSrc: '/image/navbarImages/journal.jpg',
          imageAlt: 'Everyday Journal',
        },
      ],
      sections: [
        {
          id: 'Planners',
          name: 'Planners and Journals',
          items: [
            { name: 'Daily Planner' },
            { name: 'Weekly Planner' },
            { name: 'Monthly Planner' },
            { name: 'Customized Planner' },
            { name: 'Journals' },
          ],
        },
        {
          id: 'Diaries',
          name: 'Diaries',
          items: [
            { name: 'Simple Diaries' },
            { name: 'Vintage Diaries' },
            { name: 'Little Diaries' },
            { name: 'Sticky Notes' },
          ],
        },
      ],
    },

    {
      id: 'Kits and hampers',
      name: 'Kits and hampers',
      featured: [
        {
          name: 'Stationery Hamper',
          href: '#',
          imageSrc: '/image/navbarImages/hamper1.webp',
          imageAlt: 'Stationery Hamper',
        },
        {
          name: 'Art-and-Craft Hamper',
          href: '#',
          imageSrc: '/image/navbarImages/hamper2.jpg',
          imageAlt: 'Art & Craft Hamper',
        },
      ],
      sections: [
        {
          id: 'essential kits',
          name: 'Essential Kits',
          items: [
            { name: 'Stationary Kits' },
            { name: 'Art-and-Craft Kits' },
          ],
        },
      ],
    },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const { user, setUser, loading } = useUser();
  const [dynamicNavigation, setDynamicNavigation] = useState<NavigationData>({ categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        setIsLoading(true);

        const catUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/category/getCategory`;
        const childCatUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/category/getChildCategory`;
        const slugsUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/category/getslugs`;

        const [catRes, childCatRes, slugsRes] = await Promise.all([
          fetch(catUrl, { credentials: 'include' }),
          fetch(childCatUrl, { credentials: 'include' }),
          fetch(slugsUrl, { credentials: 'include' })
        ]);

        // Handle responses - 404 means no data, which is acceptable
        let catData, childCatData, slugsData;
        
        try {
          catData = catRes.ok ? await catRes.json() : { data: [] };
        } catch (e) {
          catData = { data: [] };
        }
        
        try {
          childCatData = childCatRes.ok ? await childCatRes.json() : { data: [] };
        } catch (e) {
          childCatData = { data: [] };
        }
        
        try {
          slugsData = slugsRes.ok ? await slugsRes.json() : { data: [] };
        } catch (e) {
          slugsData = { data: [] };
        }

        const mainCategories: ApiCategory[] = (catData?.data || (Array.isArray(catData) ? catData : [])) || [];
        const allChildCategories: ApiChildCategory[] = (childCatData?.data || (Array.isArray(childCatData) ? childCatData : [])) || [];
        const allSlugs: ApiSlug[] = (slugsData?.data || (Array.isArray(slugsData) ? slugsData : [])) || [];

        const structuredCategories: UiCategory[] = mainCategories.map(mainCat => {
          const childrenForThisCat = allChildCategories.filter(
            child => child.category_id === mainCat.id
          );

          const uiSections: UiSection[] = childrenForThisCat.map(childSection => {
            const slugsForThisChild = allSlugs.filter(
              slug => slug.child_category_name === childSection.name
            );

            const items: UiItem[] = slugsForThisChild.map(slug => ({
              name: slug.slug_name,
              href: `/products?category=${slug.slug_name}`
            }));

            return {
              id: childSection.name.replace(/\s+/g, ''),
              name: childSection.name,
              items: items
            };
          });

          return {
            id: mainCat.id,
            name: mainCat.name,
            featured: [],
            sections: uiSections
          };
        });

        setDynamicNavigation({ categories: structuredCategories });
        
      } catch (err) {
        console.error("Failed to fetch nav data. Navigation will be empty.", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getUserIcon = () =>
    user?.role === 'trader' ? (
      <BusinessIcon className="h-5 w-5" />
    ) : (
      <PersonOutlineIcon className="h-5 w-5" />
    );

  const getUserDisplayName = () => {
    if (loading) return 'Loading...';
    if (!user) return null;
    const firstName = user.name.split(' ')[0];
    return `Hello, ${firstName}`;
  };

  return (
    <div className="bg-white">
      {/* Mobile menu stays unchanged */}
      <Transition.Root show={open} as={Fragment}>
        {/* ... your existing mobile Dialog + Tabs ... */}
      </Transition.Root>

      {/* Desktop Navbar */}
      <header className="bg-white z-50">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image 
                    src={logo} 
                    alt="Logo" 
                    height={140} 
                    width={140}
                    priority
                    className="h-auto w-auto"
                  />
                </Link>
              </div>

              {/* Categories */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent hover:text-gray-700',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-16 text-sm text-gray-500 z-50">
                              <div className="fixed inset-0 top-16" onClick={close} />
                              <div className="absolute inset-0 top-1/2 bg-white shadow" />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <Image
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                              height={400}
                                              width={400}
                                            />
                                          </div>
                                          <Link href={item.href} className="mt-6 block font-medium text-gray-900" onClick={close}>
                                            {item.name}
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p className="font-medium text-gray-900">{section.name}</p>
                                          <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link
                                                  href={`/${item.name.replaceAll(' ', '-').toLowerCase()}`}
                                                  className="hover:text-gray-800"
                                                  onClick={close}
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                  
                  {/* Services Link - Added at the end */}
                  <Link
                    href="/modules/services"
                    className="flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200"
                  >
                    Services
                  </Link>
                </div>
              </Popover.Group>

              {/* Profile + Cart */}
              <div className="ml-auto flex items-center">
                {/* ✅ Added user greeting */}
                {user && (
                  <div className="hidden md:flex lg:flex items-center mr-4">
                    <span className="text-sm font-bold text-gray-700">
                      {getUserDisplayName()}
                    </span>
                  </div>
                )}

                {/* ✅ Dynamic Profile Dropdown */}
                <Popover className="relative">
                  {({ open, close }) => (
                    <>
                      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none hover:text-gray-700">
                        <span className="p-2">
                          {getUserIcon()}
                        </span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 z-10 mt-5 flex w-60 max-w-max px-4">
                          <div className="fixed inset-0" onClick={close} />
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 relative">
                            <div className="p-4">
                              {user ? (
                                <>
                                  {user.role === 'trader' && (
                                    <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                      <Link
                                        href="/profile/trader"
                                        className="font-semibold text-gray-900 flex items-center gap-2"
                                        onClick={close}
                                      >
                                        <BusinessIcon className="h-4 w-4" />
                                        Trader Profile
                                      </Link>
                                    </div>
                                  )}
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link
                                      href="/profile/user"
                                      className="font-semibold text-gray-900 flex items-center gap-2"
                                      onClick={close}
                                    >
                                      <PersonOutlineIcon className="h-4 w-4" />
                                      My Profile
                                    </Link>
                                  </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <button
                                      onClick={() => {
                                        handleLogout();
                                        close();
                                      }}
                                      className="font-semibold text-red-600 flex items-center gap-2 w-full text-left"
                                    >
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                      </svg>
                                      Logout
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link href="/modules/auth/SignIn" className="font-semibold text-gray-900" onClick={close}>
                                      Login
                                    </Link>
                                  </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link href="/modules/auth/TraderSignUp" className="font-semibold text-gray-900" onClick={close}>
                                      Become a Trader
                                    </Link>
                                  </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link href="/modules/auth/ServiceProviderSignup" className="font-semibold text-gray-900" onClick={close}>
                                      Become a Service Provider
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 hover:text-gray-700"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
