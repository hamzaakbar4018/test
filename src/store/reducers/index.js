import { createSlice } from "@reduxjs/toolkit";
const admin = sessionStorage.getItem("karyana-admin");
export const authSlice = createSlice({
  name: "admin",
  initialState: {
    isAuthenticated: admin ? true : false,
    token: admin ? admin : null,
  },
  reducers: {
    authHandler: (state, action) => {
      return action.payload;
    },
  },
});

export const { authHandler } = authSlice.actions;

export default authSlice.reducer;
