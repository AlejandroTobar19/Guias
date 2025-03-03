const initialBudget = () => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? parseFloat(localStorageBudget) : 0
};

const localStorageExpenses = () => {
  const localStorageExpenses = localStorage.getItem('expenses')
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
};

// ✅ Ahora sí se puede usar en `initialState`
export const initialState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "", // Para edición
  currentCategory: "" // Para filtrar gastos por categoría
};

export const budgetReducer = (state, action) => {
  switch (action.type) {
    case "add-budget":
      return { ...state, budget: action.payload.budget }
    case "show-modal":
      return { ...state, modal: true }
    case "close-modal":
      return { ...state, modal: false, editingId: "" } // Se agregó para resetear editingId
    case "add-expense":
      const newTotalExpenses = state.expenses.reduce((total, expense) => total + expense.amount, 0) + action.payload.expense.amount;

      if (newTotalExpenses > state.budget) {
        alert("Error: No puedes agregar un gasto que exceda el presupuesto disponible."); // Opcional: mostrar alerta
        return state; // No modifica el estado
      }

      return {
        ...state,
        expenses: [
          ...state.expenses,
          { ...action.payload.expense, id: new Date().getTime() }
        ],
        modal: false
      };
    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
      }



    case "reset-app":
      localStorage.removeItem("budget"); // Eliminar el presupuesto de localStorage
      localStorage.removeItem("expenses"); // Eliminar los gastos de localStorage
      return {
        ...initialState, // Reinicia al estado inicial
        budget: 0,
        expenses: [],
        editingId: "",
        modal: false
      };


      
    case "get-expense-by-id":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true
      }
    case "update-expense":
      const updatedExpenses = state.expenses.map(expense =>
        expense.id === action.payload.expense.id ? action.payload.expense : expense
      );
      const updatedTotalExpenses = updatedExpenses.reduce((total, expense) => total + expense.amount, 0);

      if (updatedTotalExpenses > state.budget) {
        alert("Error: No puedes modificar este gasto porque excede el presupuesto.");
        return state; // No modifica el estado
      }

      return {
        ...state,
        expenses: updatedExpenses,
        modal: false,
        editingId: ""
      };
    case "add-filter-category":
      return { ...state, currentCategory: action.payload.categoryId }
    default:
      return state;
  }

};
