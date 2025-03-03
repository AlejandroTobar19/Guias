import { createContext, useEffect, useReducer } from "react";
import { budgetReducer, initialState } from "../reducers/budget-reducer";

export const BudgetStateContext = createContext();
export const BudgetDispatchContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  return (
    <BudgetStateContext.Provider value={state}>
      <BudgetDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetDispatchContext.Provider>
    </BudgetStateContext.Provider>
  );
};
