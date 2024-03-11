import { useContext } from 'react';
import { CartContext } from './store/shoppingCartContext.jsx';
import styled from 'styled-components'



export const MealList = styled.ul `
  list-style-type: none;
`


function Cart() {
  const { meals, updateItemQuantity } = useContext(CartContext);

  // const totalPrice = meals.reduce(
  //   (acc, meal) => acc + meal.price * meal.quantity,
  //   0
  // );
  // const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;


  return (
    <div>
      {meals.length === 0 && <p>No items in cart!</p>}
      {meals.length > 0 && (
        <MealList id="cart-items">
          {meals.map((meal) => {
            // const formattedPrice = `$${meal.price.toFixed(2)}`;

            return (
              <li key={meal.id}>
                <div>
                  <span>{meal.name}</span>
                  {/* <span> ({formattedPrice})</span> */}
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(meal.id, -1)}>
                    -
                  </button>
                  <span>{meal.quantity}</span>
                  <button onClick={() => updateItemQuantity(meal.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </MealList>
      )}
      <p id="cart-total-price">
        {/* Cart Total: <strong>{formattedTotalPrice}</strong> */}
        Cart Total: PriceHardcoded
      </p>
    </div>
  )
}

export default Cart


