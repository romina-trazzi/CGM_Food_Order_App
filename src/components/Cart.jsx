import { useContext } from 'react';
import { CartContext } from './store/shoppingCartContext.jsx';
import styled from 'styled-components';

export const MealList = styled.ul `
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
`;
export const MealRow = styled.li `
  padding: 0.5rem;
  padding-right: 0;
`;
export const MealData = styled.div`
  display: grid; 
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;
`;
export const MealUpdateButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: none;
  background-color: #312c1d;
  color: #ffc404;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover, &:active {
    background-color: #ffab04;
    border-color: #ffab04;
    color: #1f1a09; 
  }
`;
export const MealCartTotal = styled.p`
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;
  font-size: 1.15rem;
  font-weight: bold;
  color: #46443c;
`;
export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`

function Cart({title}) {
  const { meals, updateMealQuantity } = useContext(CartContext);

  const totalPrice = meals.reduce(
    (acc, meal) => acc + meal.price * meal.quantity, 0
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  const handleIncrementQuantity = (event, mealId) => {
    event.preventDefault();
    updateMealQuantity(mealId, 1);
  };

  const handleDecrementQuantity = (event, mealId) => {
    event.preventDefault();
    updateMealQuantity(mealId, -1);
  };
  
  return (
    <div>
      <Title style={{marginLeft: "0.5rem"}}>{title}</Title>
      {meals.length === 0 && <p>No items in cart!</p>}
      {meals.length > 0 && (
        <MealList>
          {meals.map((meal) => (
            <MealRow key={meal.id}>
              <MealData>
                <div>{meal.name} - ({meal.quantity} x {meal.price})</div>
                <div style={{display: "flex", justifyContent: "end"}}>
                  <MealUpdateButton onClick={(e) => handleIncrementQuantity(e, meal.id)}> + </MealUpdateButton>
                  <span style={{paddingLeft: "1rem", paddingRight: "1rem"}}>{meal.quantity}</span>
                  <MealUpdateButton onClick={(e) => handleDecrementQuantity(e, meal.id)}> - </MealUpdateButton>
                </div>
              </MealData>
            </MealRow>
          ))}
        </MealList>
      )}
      <MealCartTotal><strong>{formattedTotalPrice}</strong></MealCartTotal>
    </div>
  );
}

export default Cart;


