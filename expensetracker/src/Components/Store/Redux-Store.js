import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from "./EcpensesSlice";
import themeReducer from "./ThemeReducer";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer },
});

export default store;
