import { createContext, useReducer } from "react";

/* Trattiamo la variabile CartContext come un oggetto che ha
all'interno un componente React (cioè CartContextProvider).

1. Creiamo il Context */
export const CartContext = createContext(
    { items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    removeItemFromCart: () => {}
  }
);

/* Nota: Aver impostato item, addItemToCart, updateItemQuantity e removeItemFromCart serve per l'autocomplete con dot notation 
quando puntiamo poi ctxValue nei componenti figli. 
Se non li mettiamo l'applicazione funziona lo stesso ma diventa più difficile */


// 2. Definiamo la funzione Reducer --> Funzioni di aggiornamento dello stato (come se fossero setState)
function shoppingCartReducer(state, action) {

  if (action.type === 'ADD_ITEM') {
    // const updatedMeals = prev.map((meal) => {
    //       if (meal.id === selectedMeal.id) {
    //         return { ...meal, quantity: meal.quantity + 1 };
    //       }
    //       setChosenMeals (prev => [...prev, updatedMeals]);
    //       return meal;
    //     });
    //     return updatedMeals;
    //   });

    
    return {
      /* al return sempre meglio dare uno state 
      per essere certi di avere l'ultimo stato aggiornato */
      ...state, 
      items: updatedItems,
    };
  }


  if (action.type === 'UPDATE_ITEM') {


    return {
      ...state,
      items: updatedItems,
    };

  } 

}

// 3. Leghiamo la funzione Reducer al Context con il componente CartContextProvider
export default function CartContextProvider(props) {
    
    /* 3.1. UseReducerDichiarato: 
    a) Il primo valore è la funzione fuori dal componente
    b) l'altro è il valore di default dello stato che è opzionale  */

    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []});

    function handleAddItemToCart(id) {

        shoppingCartDispatch({
        type: 'ADD_ITEM',
        payload: id
        })

    }

    function handleUpdateCartItemQuantity(productId, amount) {

        shoppingCartDispatch({
        type: 'UPDATE_ITEM',
        payload: { 
            productId: productId, 
            amount: amount
        }
        })
    }

    // 3.2 Creiamo un oggetto di raccolta dei dati e delle funzioni che saranno accessibili da tutti i componenti figli
    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }

    return (

        // 5. Il componente wrapper CartContex (grazie alla sua proprietà Provider) con una singola props ctxValue racchiude tutto
        <CartContext.Provider value={ctxValue}>
            {props.children}
        </CartContext.Provider>
    )

}


