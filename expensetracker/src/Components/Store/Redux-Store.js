import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from "./EcpensesSlice";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
});

export default store;
