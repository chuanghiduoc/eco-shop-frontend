import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { apiRefreshToken } from "@/services/user";

export const refreshAccessToken = async () => {
  const refreshToken = getCookie("refreshToken");
  
  try {
    // Gọi hàm apiRefreshToken với đối tượng chứa refreshToken
    if (typeof refreshToken !== 'string') {
      throw new Error("Invalid refreshToken");
    }
    const response = await apiRefreshToken(refreshToken);

    // Lấy accessToken từ phản hồi
    const accessToken = response.data.data.accessToken; 
    
    if (!accessToken) {
      throw new Error("Không nhận được accessToken từ phản hồi");
    }

    // Lưu accessToken mới vào cookie với thời gian sống 15 phút
    setCookie("accessToken", accessToken, { maxAge: 60 * 0.5 });
    
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Xóa cả accessToken và refreshToken nếu không thể làm mới
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    // Chuyển hướng người dùng về trang đăng nhập
    window.location.href = "/login";
    // console.log("Chuyển hướng người dùng về trang đăng nhập");
    
  }
};
