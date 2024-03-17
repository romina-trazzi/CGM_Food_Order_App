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

function Cart({title, totalCartPrice}) {
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
    </div>
  );
}

export default Cart;


