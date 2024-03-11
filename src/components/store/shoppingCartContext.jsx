import { createContext, useReducer, useEffect, useState } from "react";
import { fetchMeals } from '../../http.js';


/* Trattiamo la variabile CartContext come un oggetto che ha
all'interno un componente React.

1. Creiamo il Context (da esportare destrutturato nei componenti figli) */
export const CartContext = createContext(
    { 
        meals: [],
        addItemToCart: () => {},
        updateItemQuantity: () => {},
    }
);

/* Nota: Aver impostato meal, addItemToCart, updateItemQuantity e removeItemFromCart serve per l'autocomplete con dot notation 
quando puntiamo poi ctxValue nei componenti figli. 
Se non li mettiamo l'applicazione funziona lo stesso ma diventa più difficile */


// 2. Definiamo la funzione Reducer --> Funzioni di aggiornamento dello stato (come se fossero setState)
function shoppingCartReducer(state, action) {

    if (action.type === 'ADD_MEAL') {
    
        const selectedMeal = action.payload;
        
        const existingMeal = state.meals.find(meal => meal.id === selectedMeal.id);

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
export default function CartContextProvider(props) {
    const [meals, setMeals] = useState([]);
    
    // Getting initial meals data
    useEffect(() => {
        const fetchData = async () => {
            try {
            const mealsData = await fetchMeals();
            setMeals(prev => {
                // Adding a quantity property settled to 0
                const updatedMeals = mealsData.map(meal => ({...meal, quantity: 0}));
                return updatedMeals;  
            });
            } catch (error) {
            console.error('Error fetching meals:', error);
            }
        };

        fetchData();
    }, []);

   
    
    /* 3.1. 
    a) ShoppingCartState = i dati che vanno manipolati 
    b) ShoppingCartDispatch = la funzione che racchiude i metodi che manipolano lo stato dei dati grazie allo useReducer e alle sue action

    /* 3.2. UseReducerDichiarato: 
    a) Il primo valore è la funzione fuori dal componente
    b) l'altro è il valore di default dello stato (cioè dei dati) che è opzionale  */

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {meals: [meals]});

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
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return (

        // 3.3. Il componente wrapper CartContext (grazie alla sua proprietà Provider) con una singola props ctxValue racchiude tutto
        <CartContext.Provider value={ctxValue}>
            {props.children}
        </CartContext.Provider>
    )

}


