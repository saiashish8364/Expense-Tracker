import { createSlice } from "@reduxjs/toolkit";

const initialexpensesState = {
  expenses: [],
  total: 0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialexpensesState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
    },
    emptyExpense(state) {
      state.expenses = [];
      state.total = 0;
    },
    countExpense(state, action) {
      state.total = Number(state.total) + Number(action.payload);
    },
  },
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
