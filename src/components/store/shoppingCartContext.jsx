import { createContext, useReducer} from "react";

/* Trattiamo la variabile CartContext come un oggetto che ha
all'interno un componente React.

1. Creiamo il Context (da esportare destrutturato nei componenti figli) */
export const CartContext = createContext(
    { 
        meals: [],
        addItemToCart: () => {},
        updateMealQuantity: () => {},
    }
);

/* Nota: Aver impostato meal, addItemToCart, updateItemQuantity e removeItemFromCart serve per l'autocomplete con dot notation 
quando puntiamo poi ctxValue nei componenti figli. 
Se non li mettiamo l'applicazione funziona lo stesso ma diventa più difficile */


// 2. Definiamo la funzione Reducer --> Funzioni di aggiornamento dello stato (come se fossero setState)
function shoppingCartReducer(state, action) {

    if (action.type === 'ADD_MEAL') {
    
        const selectedMeal = action.payload;

        console.log(selectedMeal);
        
        const existingMeal = state.meals.find(meal => meal.id === selectedMeal.id);

        console.log(existingMeal);

        if (existingMeal) {
        
            // Se il pasto esiste già nel carrello, aumenta solo la quantità
            const updatedMeals = state.meals.map(meal =>
            meal.id === selectedMeal.id ? { ...meal, quantity: meal.quantity + 1 } : meal
        );

        return {
            ...state,
            meals: updatedMeals
        };

        } else {
            // Se il pasto non esiste nel carrello, aggiungilo con la quantità 1
            return {
                ...state,
                meals: [...state.meals, { ...selectedMeal, quantity: 1 }]
            };
        }
    }      

    if (action.type === 'UPDATE_MEAL') {
       
        // Destructuring payload
        const { productId, amount } = action.payload;
        
        const updatedMeals = state.meals.map(meal =>
            meal.id === productId ? { ...meal, quantity: amount } : meal
        );

        return {
            ...state,
            meals: updatedMeals
        };

    } 

}

// 3. Leghiamo la funzione Reducer al Context tramite CartContextProvider
export default function CartContextProvider({meals, children}) {

    /* 3.1. 
    a) ShoppingCartState = i dati che vanno manipolati 
    b) ShoppingCartDispatch = la funzione che racchiude i metodi che manipolano lo stato dei dati grazie allo useReducer e alle sue action

    /* 3.2. UseReducerDichiarato: 
    a) Il primo valore è la funzione fuori dal componente
    b) l'altro è il valore di default dello stato (cioè dei dati) che è opzionale  */

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {meals: []});


    function handleAddItemToCart(selectedMeal) {

        shoppingCartDispatch({
        type: 'ADD_MEAL',
        payload: selectedMeal
        })

    }

    function handleUpdateCartItemQuantity(productId, amount) {

        shoppingCartDispatch({
        type: 'UPDATE_MEAL',
        payload: { 
            productId: productId, 
            amount: amount
        }
        })
    }

    // 3.2 Creiamo un oggetto di raccolta dei dati e delle funzioni che saranno accessibili da tutti i componenti figli
    const ctxValue = {
        meals: shoppingCartState.meals,
        addItemToCart: handleAddItemToCart,
        updateMealQuantity: handleUpdateCartItemQuantity,
    }

    return (

        // 3.3. Il componente wrapper CartContext (grazie alla sua proprietà Provider) con una singola props ctxValue racchiude tutto
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )

}


