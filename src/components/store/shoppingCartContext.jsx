import { createContext, useReducer } from "react";


/* Trattiamo la variabile CartContext come un oggetto che ha
all'interno un componente React (cioè CartContextProvider).

1. Creiamo il Context */

export const CartContext = createContext(
    { items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
  }
);

function shoppingCartReducer(state, action) {

  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload_id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
      
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload_id);
      updatedItems.push({
        id: action.payload_id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    
    return {
      /* al return sempre meglio dare uno state 
      per essere certi di avere l'ultimo stato aggiornato */
      ...state, 
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {

    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload_id.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload_id.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };

  } 
}


export default function CartContextProvider(props) {
    
  // Il primo valore è la funzione fuori dal componente, l'altro è il valore di default dello stato che è opzionale 
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []});
  
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id) {

    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload_id: id
    })

    // setShoppingCart((prevShoppingCart) => {
     
  }

  function handleUpdateCartItemQuantity(productId, amount) {

    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload_id: { 
        productId: productId, 
        amount: amount
      }
    })

    // setShoppingCart((prevShoppingCart) => {

  }

  

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  }

  return (
    <CartContext.Provider value={ctxValue}>
      {props.children}
    </CartContext.Provider>
  )
}


/* Aver impostato item, addItemToCart e updateItemQuantity 
serve per l'autocomplete con dot notation quando puntiamo 
poi ctxValue nei componenti figli.
Se non li mettiamo l'applicazione funziona lo stesso
ma diventa più difficile */