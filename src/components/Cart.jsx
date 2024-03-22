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
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
export const CheckoutButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: #ffc404;
  border: 1px solid #ffc404;
  color: #1f1a09;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;

  &:hover, &:active {
    background-color: #ffab04;
    border-color: #ffab04;
    color: #1f1a09;
  }
`
export const CloseModalButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1d1a16;

  &:hover, &:active {
    color: #312c1d;
  }

`

function Cart({title, totalCartPrice, cartMealsQuantity, onHandleSetBuyStep}) {
  const { meals, updateMealQuantity } = useContext(CartContext);

  const handleIncrementQuantity = (event, mealId) => {
    event.preventDefault();
    
    // Aggiorna q.tà pasto selezionato +1
    updateMealQuantity(mealId, 1);
  
  };

  const handleDecrementQuantity = (event, mealId) => {
    event.preventDefault();
    
    // Seleziona il pasto da aggiornare
    const mealToUpdate = meals.find(meal => meal.id === mealId);
    
    // Se il pasto esiste e la sua quantità è pari a zero rimuovilo dal carrello filtrando l'array meals
    if (mealToUpdate && mealToUpdate.quantity === 0) {

      // Filtra ed elimina i pasti con q.tà 0
      const updatedMeals = meals.filter(meal => meal.id !== mealId);
      updateMealQuantity(updatedMeals);
    } else {
      // Altrimenti aggiorna q.tà pasto selezionato -1
      updateMealQuantity(mealId, -1);
    }
  };

  const sendModalAction = (event, buyStepAction) => {
    onHandleSetBuyStep(buyStepAction, event);
  }

  return (
    <div>
      <Title style={{marginLeft: "0.5rem"}}>{title}</Title>
      {meals.length === 0 && <p style={{marginLeft: "0.5rem"}}>No items in cart!</p>}
      {meals.length > 0 && (
        <MealList>
          {meals.map((meal) => (
            <MealRow key={meal.id}>
              <MealData>
                <div>{meal.name} - ({meal.quantity} x {meal.price})</div>
                <div style={{display: "flex", justifyContent: "end"}}>
                  <MealUpdateButton onClick={(event) => handleIncrementQuantity(event, meal.id)}> + </MealUpdateButton>
                  <span style={{paddingLeft: "1rem", paddingRight: "1rem"}}>{meal.quantity}</span>
                  <MealUpdateButton onClick={(event) => handleDecrementQuantity(event, meal.id)}> - </MealUpdateButton>
                </div>
              </MealData>
            </MealRow>
          ))}
        </MealList>
      )}
      <MealCartTotal><strong>${totalCartPrice}</strong></MealCartTotal>
      {cartMealsQuantity === 0 ? 
        <ModalActions>
          <CloseModalButton type="button" onClick={(event) => sendModalAction(event, 'close')}>Close</CloseModalButton>
        </ModalActions> :
        <ModalActions>
          <CloseModalButton type="button" onClick={(event) => sendModalAction(event, 'close')}>Close</CloseModalButton>
          <CheckoutButton onClick={(event) => sendModalAction(event, 'openCheckout')} type="button">Go to Checkout</CheckoutButton>
        </ModalActions>
      }
    </div>
  );
}

export default Cart
