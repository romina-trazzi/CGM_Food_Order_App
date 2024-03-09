import styled from 'styled-components';
import { useState } from 'react'
import ShoppingCart from './ShoppingCart.jsx'


export const HeaderStyle = styled.header `
    height: min-content;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 10%;
    margin-bottom: 5rem;
   
    color: gold;
`
export const Logo = styled.img `
    width: 5rem;
    border-radius: 50%;
    border: 3px solid gold;
`
export const Title = styled.span`
    padding-left: 1rem;
    font-weight: bold;
    font-size: 1.5rem;

`


function Header() {
    
    const [itemQuantity, setItemQuantity] = useState(0);


  return (
    <HeaderStyle>
        <div style={{display: "flex", alignItems: "center"}}>
            <Logo src="logo.jpg" alt="Logo"/>
            <Title>REACTFOOD</Title>
        </div>
        <ShoppingCart quantity={itemQuantity}> Cart: {itemQuantity} </ShoppingCart>
    </HeaderStyle>
  )
}

export default Header