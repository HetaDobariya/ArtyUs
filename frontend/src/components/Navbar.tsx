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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [dynamicNavigation, setDynamicNavigation] = useState<NavigationData>({ categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { user, setUser, loading } = useUser();

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

  const navDataToRender = dynamicNavigation;

  // Show a loading skeleton while fetching - only render on client to avoid hydration mismatch
  if (!isClient || isLoading) {
    return (
      <div className="bg-white">
        <header className="bg-white z-50">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="ml-4 flex lg:ml-0">
                  <Link href="/">
                    <Image src={logo} alt="Logo" height={140} width={140} />
                  </Link>
                </div>

                <div className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                  <div className="flex h-full space-x-8">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse self-center rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 animate-pulse self-center rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 animate-pulse self-center rounded"></div>
                  </div>
                </div>

                <div className="ml-auto flex items-center">
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded ml-4"></div>
                  <div className="h-6 w-6 bg-gray-200 animate-pulse rounded ml-4"></div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* User info in mobile menu - only render when we have user data */}
                {user && (
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        {getUserIcon()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Nav Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navDataToRender.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-bold'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navDataToRender.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p className="font-medium text-gray-900">{section.name}</p>
                            <ul className="mt-6 flex flex-col space-y-6">
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500 hover:text-gray-800"
                                    onClick={() => setOpen(false)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                              {section.items.length === 0 && (
                                <li className="text-gray-400 text-sm">No items available</li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {/* Mobile user menu */}
                <div className="mt-auto px-4 py-6 space-y-3">
                  {user ? (
                    <>
                      {user.role === 'trader' && (
                        <Link
                          href="/trader/profile"
                          className="block text-sm font-medium text-gray-900 hover:text-indigo-600"
                          onClick={() => setOpen(false)}
                        >
                          Trader Profile
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        className="block text-sm font-medium text-gray-900 hover:text-indigo-600"
                        onClick={() => setOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="block text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/modules/auth/SignIn"
                        className="block text-sm font-medium text-gray-900 hover:text-indigo-600"
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/modules/auth/TraderSignUp"
                        className="block text-sm font-medium text-gray-900 hover:text-indigo-600"
                        onClick={() => setOpen(false)}
                      >
                        Become a Trader
                      </Link>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Navbar */}
      <header className="bg-white z-50">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
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
                  <Image src={logo} alt="Logo" height={140} width={140} />
                </Link>
              </div>

              {/* Categories */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                <div className="flex h-full space-x-8">
                  {navDataToRender.categories.map((category) => (
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
                              <div
                                className="fixed inset-0 top-16"
                                onClick={close}
                              />
                              <div className="absolute inset-0 top-1/2 bg-white shadow" />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p className="font-medium text-gray-900 mb-4">
                                            {section.name}
                                          </p>
                                          <ul className="space-y-3">
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link
                                                  href={item.href}
                                                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                                  onClick={close}
                                                >
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                            {section.items.length === 0 && (
                                              <li className="text-gray-400 text-sm">No slugs available</li>
                                            )}
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
                </div>
              </Popover.Group>

              {/* Profile + Cart */}
              <div className="ml-auto flex items-center">
                {/* User greeting - only show when we have user data */}
                {user && (
                  <div className="hidden md:flex lg:flex items-center mr-4">
                    <span className="text-sm font-bold text-gray-700">
                      {getUserDisplayName()}
                    </span>
                  </div>
                )}

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
                          <div
                            className="fixed inset-0"
                            onClick={close}
                          />
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
                                    <Link
                                      href="/modules/auth/SignIn"
                                      className="font-semibold text-gray-900"
                                      onClick={close}
                                    >
                                      Login
                                    </Link>
                                  </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link
                                      href="/modules/auth/TraderSignUp"
                                      className="font-semibold text-gray-900"
                                      onClick={close}
                                    >
                                      Become a Trader
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