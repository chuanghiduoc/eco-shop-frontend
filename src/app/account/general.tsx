/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { getInforUser, updateUserInfo } from "@/store/userSlice";
import { apiChangePassword } from "@/services/user";
import Notification from "@/components/notifications";

interface User {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export default function OrderHistory() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.inforUser as User | null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    status: "success" | "error";
  } | null>(null);

  useEffect(() => {
    dispatch(getInforUser());
  }, [dispatch]);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    if (!editedUser) return;

    setIsLoading(true);
    setError(null);

    try {
      // Dispatch the action to update user information in the Redux store
      const updatedUser = await dispatch(updateUserInfo(editedUser)).unwrap();

      // Set the edited user to the newly updated user data
      setEditedUser(updatedUser);

      // Exit edit mode
      setIsEditing(false);
    } catch {
      setError("Failed to update user information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleUpdatePasswordClick = async () => {
    try {
      // Call the API to change the password
      const response = await apiChangePassword({
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        setCurrentPassword("");
        setNewPassword("");
        setNotification({
          title: "Thành công",
          message: "Cập nhật mật khẩu thành công!",
          status: "success",
        });
      } else {
        setNotification({
          title: "Thất bại",
          message: "Cập nhật mật khẩu thất bại!",
          status: "error",
        });
      }
    } catch {
      setNotification({
        title: "Thất bại",
        message: "Cập nhật mật khẩu thất bại!",
        status: "error",
      });
    }
  };

  return (
    <div>

      <div className="max-w-xl">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl pb-2">
          Tổng quan
        </h1>
      </div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Thông tin tài khoản
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        Thông tin này sẽ được hiển thị công khai vì vậy hãy cẩn thận với những
        gì bạn chia sẻ.
      </p>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6 pb-3">
        {/* Hiển thị họ và tên */}
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Họ và tên
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {isEditing ? (
              <input
                type="text"
                value={editedUser?.name || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, name: e.target.value })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <span>{user?.name || ""}</span>
            )}
          </dd>
        </div>

        {/* Hiển thị địa chỉ email */}
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Địa chỉ email
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {isEditing ? (
              <input
                type="email"
                value={editedUser?.email || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, email: e.target.value })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <span>{user?.email || ""}</span>
            )}
          </dd>
        </div>

        {/* Hiển thị địa chỉ */}
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Địa chỉ
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {isEditing ? (
              <input
                type="text"
                value={editedUser?.address || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, address: e.target.value })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <span>{user?.address || ""}</span>
            )}
          </dd>
        </div>

        {/* Hiển thị số điện thoại */}
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Số điện thoại
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {isEditing ? (
              <input
                type="text"
                value={editedUser?.phoneNumber || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, phoneNumber: e.target.value })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <span>{user?.phoneNumber || ""}</span>
            )}
          </dd>
        </div>
      </dl>

      {/* Nút sửa thông tin */}
      <div className="flex justify-end border-t border-gray-100 pt-6">
        {isEditing ? (
          <>
            <button
              type="button"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleUpdateClick}
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button
              type="button"
              className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handleCancelClick}
            >
              Hủy
            </button>
          </>
        ) : (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleEditClick}
          >
            Sửa thông tin
          </button>
        )}
      </div>
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Thay đổi mật khẩu
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Cập nhật mật khẩu được liên kết với tài khoản của bạn.
        </p>

        <ul
          role="list"
          className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
          <li className="flex justify-between gap-x-6 py-6">
            <div className="w-full">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu cũ
              </label>
              <input
                type="password"
                id="current-password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nhập mật khẩu cũ"
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
                minLength={8}
              />
            </div>
          </li>

          <li className="flex justify-between gap-x-6 py-6">
            <div className="w-full">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="new-password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nhập mật khẩu mới"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in, chữ hoa, số, và ký tự đặc biệt"
              />
            </div>
          </li>
        </ul>

        <div className="flex justify-end border-t border-gray-100 pt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleUpdatePasswordClick}
          disabled={isLoading || newPassword.length < 8}
        >
            Cập nhật mật khẩu
          </button>
          {notification?.message && notification.title && notification.status && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
        </div>
      </div>
    </div>
  );
}
