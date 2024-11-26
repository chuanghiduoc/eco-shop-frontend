/* eslint-disable @next/next/no-img-element */
"use client";

import {
  CreditCardIcon,
  CubeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import OrderHistory from "./order-history"; 
import General from "./general";
import { refreshAccessToken } from "@/utils/refreshAccessToken"; 

const secondaryNavigation = [
  { name: "General", key: "general", icon: UserCircleIcon },
  { name: "Order history", key: "orderHistory", icon: CubeIcon },
  { name: "Billing", key: "billing", icon: CreditCardIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AccountPage = () =>  {
  const [activeSection, setActiveSection] = useState("general");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccessToken = getCookie("accessToken");
    
    const fetchAccessToken = async () => {
      if (!getAccessToken) {
        // Gọi refreshAccessToken để lấy access token mới
        const newToken = await refreshAccessToken();        
        // Nếu không có token mới, chuyển hướng đến trang đăng nhập
        if (!newToken) {
          window.location.href = "/login";
        }
      }
      setLoading(false);
    };

    fetchAccessToken();
  }, []);

  const handleNavigation = (sectionKey: string) => {
    setActiveSection(sectionKey);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <h2 className="text-lg font-medium text-gray-900">Đang tải...</h2>
          <p className="mt-2 text-gray-500">Vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-8">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.key}>
                  <a
                    href="#"
                    onClick={() => handleNavigation(item.key)}
                    className={classNames(
                      activeSection === item.key
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                      "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        activeSection === item.key
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-4 sm:px-6 lg:flex-auto lg:px-0 lg:py-8">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            {activeSection === "general" && ( <General />)}

            {activeSection === "orderHistory" && <OrderHistory />}

            {activeSection === "billing" && (
              <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Thông tin thanh toán
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Cung cấp thông tin thẻ tín dụng của bạn để xử lý thanh toán.
                </p>

                <form className="mt-6">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số thẻ
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="expiry-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày hết hạn
                      </label>
                      <input
                        type="text"
                        id="expiry-date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="XXX"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Lưu thông tin thanh toán
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default React.memo(AccountPage);
