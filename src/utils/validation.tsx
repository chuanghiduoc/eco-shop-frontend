interface ValidationResult {
  valid: boolean;
  message: string;
}

export function validatePassword(password: string, confirmPassword: string): ValidationResult {
  // Kiểm tra độ dài mật khẩu tối thiểu là 8 ký tự
  if (password.length < 8) {
    return { valid: false, message: "Mật khẩu phải có ít nhất 8 ký tự." };
  }

  // Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết hoa
  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) {
    return { valid: false, message: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa." };
  }

  // Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết thường
  const hasLowercase = /[a-z]/.test(password);
  if (!hasLowercase) {
    return { valid: false, message: "Mật khẩu phải chứa ít nhất một chữ cái viết thường." };
  }

  // Kiểm tra mật khẩu có chứa ít nhất một chữ số
  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) {
    return { valid: false, message: "Mật khẩu phải chứa ít nhất một chữ số." };
  }

  // Kiểm tra mật khẩu có chứa ít nhất một ký tự đặc biệt
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasSpecialChar) {
    return { valid: false, message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt." };
  }

  // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
  if (password !== confirmPassword) {
    return { valid: false, message: "Mật khẩu và xác nhận mật khẩu không khớp." };
  }

  // Nếu tất cả các điều kiện đều hợp lệ
  return { valid: true, message: "Mật khẩu hợp lệ." };
}
