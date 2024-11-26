'use client';

import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon, XCircleIcon } from '@heroicons/react/20/solid';

interface NotificationCustomProps {
  title: string;
  message: string;
  status: 'success' | 'error';
}

export default function Notification({ title, message, status }: NotificationCustomProps) {
  const [show, setShow] = useState(true);

  const isSuccess = status === 'success';

  return (
<div
  aria-live="assertive"
  className="pointer-events-none fixed inset-x-0 top-10 flex justify-center px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          enter="transform transition duration-300 ease-out"
          enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
          enterTo="opacity-100 translate-y-0 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0 sm:translate-x-0"
          leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {isSuccess ? (
                    <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
