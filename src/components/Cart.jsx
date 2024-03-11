import { useContext } from 'react';
import { CartContext } from './store/shoppingCartContext.jsx';
import styled from 'styled-components'


export const MealList = styled.ul `
  list-style-type: none;
`


function Cart() {
  const { meals, updateMealQuantity } = useContext(CartContext);

  const totalPrice = meals.reduce(
    (acc, meal) => acc + meal.price * meal.quantity, 0
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  
  return (
    <div>
      {meals.length === 0 && <p>No items in cart!</p>}
      {meals.length > 0 && (
        <MealList>
          {meals.map((meal) => {

            return (
              <li key={meal.id}>
                <div>
                  <span>{meal.name}</span>
                  <span> ({meal.price})</span> 
                </div>
                <div>
                  <button onClick={() => updateMealQuantity(meal.id, -1)}> - </button>
                  <span>{meal.quantity}</span>
                  <button onClick={() => updateMealQuantity(meal.id, 1)}> + </button>
                </div>
              </li>
            );
          })}
        </MealList>
      )}
      <p>
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  )
}

export default Cart

