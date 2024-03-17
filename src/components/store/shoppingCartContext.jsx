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

/* Nota: Aver impostato meals, addItemToCart, updateItemQuantity serve per l'autocomplete con dot notation 
quando puntiamo poi ctxValue nei componenti figli. 
Se non li mettiamo l'applicazione funziona lo stesso ma diventa più difficile */


// 2. Definiamo la funzione Reducer --> Funzioni di aggiornamento dello stato (come se fossero setState)
function shoppingCartReducer(state, action) {

    if (action.type === 'ADD_MEAL') {

    // Importa e assegna il meal selezionato (viene passato da addItemToCart che prende come argomento il meal al click del button)
    const selectedMeal = action.payload;

    // Trasforma il meal selezionato in un "meal del carrello" cercando l'indice (se non c'è l'indice vale -1)
    const existingMealIndex = state.meals.findIndex(meal => meal.id === selectedMeal.id);


        // Se il pasto esiste già nel carrello, aumenta solo la quantità di quello (creando un array nuovo con map, quindi no bisogno di prev)
        if (existingMealIndex !== -1) {

            // Vecchi meal salvati nella costante e poi aggiornati con il piatto selezionato e la sua nuova quantità
            const updatedMeals = [...state.meals];
            updatedMeals[existingMealIndex].quantity += 1;
            
            // Tieni aggiornato lo stato dei meal
            return {
            ...state,
            meals: updatedMeals
            };


        } else {
            // Se il pasto non esiste nel carrello, aggiungilo con la quantità 1 e aggiorna lo stato
            return {
                ...state,
                meals: [...state.meals, {...selectedMeal, quantity: 1 }]
            };
        }
    }
    
    if (action.type === 'UPDATE_MEAL') {
        
        // Destruttura l'oggetto payload
        const { productId, amount } = action.payload;

        const updatedMeals = state.meals.map(meal =>
        meal.id === productId ? { ...meal, quantity: meal.quantity + amount } : meal
        );
        
        // Mostra solo i meal la cui quantità è maggiore di 0
        const filteredMeals = updatedMeals.filter(meal => meal.quantity > 0);

        return {
        ...state,
        meals: filteredMeals
        };
    }

    // Lo stato rimane invariato (ex-prev) per azioni non riconosciute
    return state;
}

// 3. Leghiamo la funzione Reducer al Context tramite CartContextProvider
export default function CartContextProvider({children}) {

    /* 3.1. 
    a) ShoppingCartState = i dati che vanno manipolati 
    b) ShoppingCartDispatch = la funzione che racchiude i metodi che manipolano lo stato dei dati grazie allo useReducer e alle sue action

    /* 3.2. UseReducerDichiarato: 
    a) Il primo valore è la funzione fuori dal componente
    b) l'altro è il valore di default dello stato (cioè dei dati) che è opzionale  */

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

    // 3.2 Creiamo un oggetto di raccolta dei dati e delle funzioni che saranno accessibili da tutti i componenti figli
    const ctxValue = {
        meals: shoppingCartState.meals,
        addItemToCart: handleAddMealToCart,
        updateMealQuantity: handleUpdateMealQuantity,
    }

    return (

        // 3.3. Il componente wrapper CartContext (grazie alla sua proprietà Provider) con una singola props ctxValue racchiude tutto
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )

}


