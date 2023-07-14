import { createSlice } from "@reduxjs/toolkit";
let isLoggedIn = false;
let barrierToken = "";
if (localStorage.getItem("token")) {
  isLoggedIn = true;
  barrierToken = String(localStorage.getItem("token"));
}
const initialAuthState = {
  isAuthenticated: isLoggedIn,
  token: barrierToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
