'use client';

import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { ChevronDownIcon, ShoppingBagIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/Arty-US_logo.png';
import { Fragment, useState, useEffect } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
          method: 'GET',
          credentials: 'include', // ⬅️ send cookies automatically
        });

        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/logout`, {
        method: 'POST',
        credentials: 'include', // include cookies so backend can clear session
      });
      setCurrentUser(null);
      window.location.href = '/'; // redirect to homepage
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-white">
      <header className="bg-white z-50">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image src={logo} alt="Logo" height={140} width={140} />
                </Link>
              </div>

              {/* 👋 Greeting user */}
              {currentUser && (
                <span className="ml-6 text-gray-700 font-semibold">
                  Hi, {currentUser.name?.split(' ')[0]}
                </span>
              )}

              {/* Profile + Cart */}
              <div className="ml-auto flex items-center">
                <Popover className="relative">
                  {({ open, close }) => (
                    <>
                      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none hover:text-gray-700">
                        <span className="p-2 ">
                          {currentUser?.role === 'trader' ? (
                            <StorefrontIcon />
                          ) : (
                            <PersonOutlineIcon />
                          )}
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
                        <Popover.Panel className="absolute right-0 z-10 mt-5 w-60 max-w-max px-4">
                          {/* Click outside closes */}
                          <div className="fixed inset-0" onClick={close} />
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5 relative">
                            <div className="p-4">
                              {!currentUser ? (
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
                                </>
                              ) : currentUser.role === 'trader' ? (
                                <>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link href="/trader/profile" className="font-semibold text-gray-900" onClick={close}>
                                      Trader Profile
                                    </Link>
                                  </div>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link href="/user/profile" className="font-semibold text-gray-900" onClick={close}>
                                      My Profile
                                    </Link>
                                  </div>
                                  <div
                                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={handleLogout}
                                  >
                                    <span className="font-semibold text-gray-900">Logout</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <Link href="/user/profile" className="font-semibold text-gray-900" onClick={close}>
                                      My Profile
                                    </Link>
                                  </div>
                                  <div
                                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={handleLogout}
                                  >
                                    <span className="font-semibold text-gray-900">Logout</span>
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
