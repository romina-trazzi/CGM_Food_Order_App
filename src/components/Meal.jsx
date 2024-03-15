import styled from 'styled-components'
import { useContext } from 'react'
import { CartContext } from '../components/store/shoppingCartContext.jsx'

export const MealCard = styled.div`
 display: flex;
 flex-direction: column;
 height: max-content;
 border: 1px solid black;
 border-radius: 30px;
 background-color: rgba(30, 30, 30, 0.8);
`
export const MealImg = styled.img`
  width: 100%;
  border-radius: 30px;
`
export const MealData = styled.div`
  width: 100%;
  height: 20rem;
  text-align: center;
  padding: 1rem;

  & div {
    display: flex;
    justify-content: center;

    & p {
      padding: 0.6rem 2rem;
      color: gold; 
      background-color: rgba(51, 51, 51, 0.8);
      border-radius: 0.5rem;
    }
  }

`
export const MealButton = styled.button`
  background-color: gold;
  width: 30%;
  border-radius: 5px;
  padding: 0.5rem;
  margin-top: 2rem;
`

function Meal({meals}) {
  // Consuming useContext inside this component
  const { addItemToCart } = useContext(CartContext);

    return (
      <>
        {meals.map(meal => (
        <MealCard key={meal.id}>
          <MealImg src={`/backend/public/${meal.image}`}></MealImg>
          <MealData>
            <p><b>{meal.name}</b></p>
            <div>
              <p>$ {meal.price}</p>
            </div>
            <p style={{minHeight: '3rem'}}>{meal.description}</p>
            <MealButton onClick={() => addItemToCart(meal)}>Add to cart</MealButton>
          </MealData>
        </MealCard>
        ))
      } 
    </>
  )
}

export default Meal