import {useState, useEffect} from 'react'
import {fetchMeals} from './http.js'
import styled from 'styled-components';
import Header from './components/Header.jsx'

export const Main = styled.main `
  display: flex;
  justify-content: center;
`

export const MealContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 1rem;
`

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
export const Footer = styled.footer `
 background-color: black;
 color: white;
 text-align: center;
 vertical-align: middle;
 height: 3rem;
 margin-top: 5rem;
 line-height: 3rem;

`

function App() {

  const [meals, setMeals] = useState([]);

  // Getting initial meals data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await fetchMeals();
        setMeals(prev => {
          // Adding a quantity property settled to 0
          const updatedMeals = mealsData.map(meal => ({...meal, quantity: 0}));
          return updatedMeals;  
        });
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchData();
  }, []);

  // Adding new meal to the shopping cart
  const handleAddMealToCart = (selectedMeal) => {
    console.log(selectedMeal);
  };

  return (
    <>
      <Header/>
      <Main>
        <MealContainer>
          
          {meals.map(meal => (
            <MealCard key={meal.id}>
              <MealImg src={`/backend/public/${meal.image}`}></MealImg>
              <MealData>
                <p><b>{meal.name}</b></p>
                <div>
                  <p>$ {meal.price}</p>
                </div>
                <p style={{minHeight: '3rem'}}>{meal.description}</p>
                <MealButton onClick={() => handleAddMealToCart(meal)}>Add to cart</MealButton>
              </MealData>
            </MealCard>
          ))} 
  
        </MealContainer>
       

      </Main>
      <Footer>Final Project CGM React Course. Made by ~ Romina Trazzi - 2024 ~</Footer>
    </>
  );
}

export default App;
