import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetInforUser, apiUpdateUserInfo } from "@/services/user";

export const getInforUser = createAsyncThunk(
  "users/me",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetInforUser();
      if (response && response.status === 200) {        
        return response.data.data.user;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "users/update",
  async (user: { name: string; email: string; address: string; phoneNumber: string; }, { rejectWithValue }) => {
    try {
      const response = await apiUpdateUserInfo(user);
      if (response.status === 200) {
        // console.log(response.data.data);
        // {id: '6706f447852525e2fd142424', name: 'Lê Vạn Bảo Trọng', email: 'levanbaotrong03@gmail.com', address: 'Hà Nội', phoneNumber: '0853698575'}
        return response.data.data;
      }
      return rejectWithValue("Failed to update user information");
    } catch {
      return rejectWithValue("An error occurred while updating user data");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    inforUser: null,
    loading: false,
    error: null as unknown | null, 
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.inforUser = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.inforUser = null;
    },
  },
  extraReducers: (builder) => {
    // Handling user information fetch
    builder
      .addCase(getInforUser.pending, (state) => {
        state.loading = true; 
        state.error = null; 
      })
      .addCase(getInforUser.fulfilled, (state, action) => {
        state.isLoggedIn = true; 
        state.inforUser = action.payload; 
        state.loading = false;
      })
      .addCase(getInforUser.rejected, (state, action) => {
        state.isLoggedIn = false; 
        state.inforUser = null; 
        state.loading = false; 
        state.error = action.payload; 
      })
      // Handling user information update
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.inforUser = action.payload;
        state.loading = false;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
