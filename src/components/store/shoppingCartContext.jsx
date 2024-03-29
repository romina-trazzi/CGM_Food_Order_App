import { createContext, useReducer} from "react";

// 1. Create context
export const CartContext = createContext(
    { 
        meals: [],
        addItemToCart: () => {},
        updateMealQuantity: () => {},
        clearCart: () => {},
    }
);


// 2. Setting the Reducer function (like setState of the ShoppingCart)
function shoppingCartReducer(state, action) {

    if (action.type === 'ADD_MEAL') {

    const selectedMeal = action.payload;
    const existingMealIndex = state.meals.findIndex(meal => meal.id === selectedMeal.id);
    
    if (existingMealIndex !== -1) {
        
        const updatedMeals = state.meals.map((meal, index) => {
            if (index === existingMealIndex) {
                return {
                    ...meal,
                    quantity: meal.quantity + 1
                };
            }
            return meal;
        });
 
        return {
            ...state,
            meals: updatedMeals
        };


        } else {
            // If meal is not into the cart, add it with quantity 1
            return {
                ...state,
                meals: [...state.meals, {...selectedMeal, quantity: 1 }]
            };
        }
    }
    
    if (action.type === 'UPDATE_MEAL') {
        
        const { productId, amount } = action.payload;

        const updatedMeals = state.meals.map(meal =>
            meal.id === productId ? { ...meal, quantity: meal.quantity + amount } : meal
        );
        
        const filteredMeals = updatedMeals.filter(meal => meal.quantity > 0);

        return {
            ...state,
            meals: filteredMeals
        };
    }

    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            meals: []
        };
    }

    return state;
}

// 3. Link the context to the reducer 
export default function CartContextProvider({children}) {

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {meals: []});

    function handleAddMealToCart(selectedMeal) {

        shoppingCartDispatch({
            type: 'ADD_MEAL',
            payload: selectedMeal
        })

    }

    function handleUpdateMealQuantity(productId, amount) {

        shoppingCartDispatch({
        type: 'UPDATE_MEAL',
        payload: { 
            productId: productId, 
            amount: amount
        }
        })
    }

    function handleClearCart() {
        shoppingCartDispatch({
        type: "CLEAR_CART",
        });
    }


    // 4. Create the value object
    const ctxValue = {
        meals: shoppingCartState.meals,
        addItemToCart: handleAddMealToCart,
        updateMealQuantity: handleUpdateMealQuantity,
        clearCart: handleClearCart,
    }

    return (

        // Wrap the context into CartContext component
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )

}


