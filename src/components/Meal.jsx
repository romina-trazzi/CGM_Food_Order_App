import styled from 'styled-components'
import { useContext } from 'react'
import { CartContext } from '../components/store/shoppingCartContext.jsx'


export const Meals = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
  width: 90%;
  max-width: 70rem;
  list-style: none;
  margin: 2rem auto;
  padding: 1rem;
`
export const MealCard = styled.article`
  background-color: #1d1a16;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  height: 100%;  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.75rem 0;
  } 

  & span {
    display: inline-block;
    background-color: #312c1d;
    color: #ffc404;
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0.5rem 2rem;
    margin: 0;
    border-radius: 4px;
    }

  & p {
    margin: 1rem;
  } 




`
export const MealImg = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
`
export const MealButton = styled.button`
  background-color: #ffc404;
  border: 1px solid #ffc404;
  color: #1f1a09;
  width: 30%;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`

function Meal({initialMeals}) {
  // Consuming useContext inside this component
  const { addItemToCart } = useContext(CartContext);

  return (
    <Meals>
      {initialMeals.map(meal => (
      <MealCard key={meal.id}>
        <MealImg src={`/backend/public/${meal.image}`}></MealImg>
        <h3>{meal.name}</h3>
        <span>$ {meal.price}</span>
        <p>{meal.description}</p>
        <MealButton onClick={() => addItemToCart(meal)}>Add to cart</MealButton>
      </MealCard>
      ))
    } 
    </Meals>
  )
}

export default Meal