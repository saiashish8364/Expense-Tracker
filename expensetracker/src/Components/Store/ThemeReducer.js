import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  themeShow: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    changeTheme(state) {
      state.themeShow = !state.themeShow;
    },
  },
});
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
