/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import CryptoJS from "crypto-js";

// Ensure the SECRET_KEY is defined
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined. Please set it in your environment variables.");
}

// Hàm mã hóa dữ liệu
const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Hàm giải mã dữ liệu
const decryptData = (encryptedData: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  // Check if the decrypted data is valid JSON
  try {
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Failed to parse decrypted data:", error);
    return null;
  }
};

// Lưu cookie với dữ liệu đã mã hóa
const saveCookie = (name: string, data: any): void => {
  const encryptedData = encryptData(data);
  setCookie(name, encryptedData, { maxAge: 60 * 15 });
};

// Lấy và giải mã cookie
const getDecryptedCookie = (name: string): any | null => {
  const encryptedData = getCookie(name);
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};

// Xóa cookie
const clearCookie = (name: string): void => {
  deleteCookie(name);
};

export { saveCookie, getDecryptedCookie, clearCookie };
