import { useContext } from "react";
import { categories } from "../data/categories";
import { BudgetDispatchContext } from "../context/BudgetContext"; // ✅ Importación del contexto
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

export const ExpenseDetails = ({ expense }) => {
    const dispatch = useContext(BudgetDispatchContext); 

    // Define una acción que se mostrará cuando el usuario deslice hacia la izquierda.
    const leadingAction = () => ( 
        <LeadingActions> 
            <SwipeAction onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    // Define una acción que se mostrará cuando el usuario deslice hacia la derecha.
    const trailingAction = () => (
        <TrailingActions> 
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    const categoryInfo = categories.find(cat => cat.id === expense.category); 

    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1} leadingActions={leadingAction()} trailingActions={trailingAction()}>
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                        <div>
                            <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono gasto" className="w-20" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold uppercase text-slate500">{categoryInfo.name}</p>
                            <p>{expense.expenseName}</p>
                            <p className="text-slate-600 text-sm">
                                {expense.date
                                    ? new Date(expense.date).toLocaleDateString("es-ES", {
                                          weekday: "long",
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : "Fecha no disponible"}
                            </p>
                        </div>
                        <div className="text-2xl text-blue-600 font-bold">
                            <span className="font-black text-black"> ${expense.amount}</span>
                        </div>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};
