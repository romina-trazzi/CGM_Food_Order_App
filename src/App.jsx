import { useState, useEffect } from 'react'
import { fetchMeals } from './http.js'
import styled from 'styled-components';
import Header from './components/Header.jsx'
import Meal from './components/Meal.jsx'
import CartContextProvider from './components/store/shoppingCartContext.jsx';

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

  // Getting initial meals data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await fetchMeals();
        // Adding a quantity property settled to 0 
        const updatedMeals = mealsData.map(meal => ({...meal, quantity: 0}));
        setMeals(updatedMeals)
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

  fetchData();
  }, []);

  const [meals, setMeals] = useState([]);

  return (
    <CartContextProvider meals={meals}>
      <Header/> 
      <main>
        <Meal meals={meals}/>
      </main>
      <Footer>Final Project CGM React Course. Made by ~ Romina Trazzi - 2024 ~</Footer>
    </CartContextProvider>
    
  );
}

export default App;
