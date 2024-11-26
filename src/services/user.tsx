import axios from "../utils/axiosInstance";

interface RegisterData {
    name: string;
    password: string;
    email: string;
}

export const apiRegister = (data: RegisterData) => {
    return (
        axios.post("/users/register", data)
    )
}

export const apiLogin = async (data: { email: string, password: string }) => {
    return (
      await axios.post("/users/login", data)
    )
}

export const apiRefreshToken = async (token: string ) => {
  return (
    await axios.post("/users/refresh", { token })
  )
}

export const apiGetInforUser = async () => {
  return await axios.get('/users/me');
};

export const apiUpdateUserInfo = async (data: {name: string, email: string, address: string, phoneNumber: string}) => {
  return await axios.put('/users/me/update', data);
};

export const apiChangePassword = async (data: {currentPassword: string, newPassword: string}) => {
  return await axios.put('/users/update-password', data);
}

