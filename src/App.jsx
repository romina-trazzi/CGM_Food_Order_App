import {useState, useEffect} from 'react'
import {fetchMeals} from './http.js'
import styled from 'styled-components';

export const Main = styled.main `
  display: flex;
  justify-content: center;
`

export const MealContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
`

export const SingleMeal = styled.div`
 display: flex;
 flex-direction: column;
 height: min-content;
 border: 1px solid black;
`

export const MealImg = styled.img`
  width: 100%;
  height: 33%;
`

export const MealData = styled.div`
  width: 100%;
`

export const MealButton = styled.button`
  background-color: yellow;
  width: 20%;
  border-radius: 10px;
  padding: 0.5rem 1rem;
`


function App() {

  const [meals, setMeals] = useState([]);

  // Getting initial meals data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await fetchMeals();
        setMeals(mealsData);
        console.log(meals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <header>Pizza</header>
      <Main>
        
        <MealContainer>
          
          {meals.map(meal => (
            <SingleMeal key={meal.id}>
              <MealImg src={`/backend/public/${meal.image}`}></MealImg>
              <MealData>
                <p>{meal.name}</p>
                <p>{meal.price}</p>
                <p>{meal.description}</p>
              </MealData>
              <MealButton>Add to cart</MealButton>
            </SingleMeal>
          ))} 
  
        </MealContainer>
       

      </Main>
      <footer>Final Project CGM React Course. Made by ~ Romina Trazzi - 2024 ~</footer>
    </>
  );
}

export default App;
