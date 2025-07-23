import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, setAuthHeader} from "../helpers/axios_helpers";
import { setUser } from "../helpers/axios_helpers";

// Async Thunk for Logging In
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await request("POST", "/auth/hr/login", { email, password });

      if (response.data.token) {
        setAuthHeader(response.data.token); // Store token in headers
        setUser(response.data);
        return {
          email: response.data.email, // Assuming backend sends user data
          name: response.data.name, // ✅ Store firstName
          token: response.data.token,
        };
      }
    } catch (error) {
      return rejectWithValue("Invalid credentials");
    }
  }
);

// Create Slice
const authSlice = createSlice({
  name: "auth",
    initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
},
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
          name: action.payload.name,
        };
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
