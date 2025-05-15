import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loaded: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoaded(state) {
      state.loaded = true;
    },
  },
});

export const { login, logout, setLoaded } = authSlice.actions;
export default authSlice.reducer;
