import styled from 'styled-components';
import { useState, useRef } from 'react'
import ShoppingCart from './ShoppingCart.jsx'
import CartModal from './CartModal.jsx';


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
    const modal = useRef();

    function handleOpenCart() {
        modal.current.open();
    }

    let modalActions = <button>Close</button>;

    if (itemQuantity > 0) {
        modalActions = (
        <>
        <button>Close</button>
        <button>Go to Checkout</button>
        </>
        )
    };

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions}/>
      <HeaderStyle>
        <div style={{display: "flex", alignItems: "center"}}>
            <Logo src="logo.jpg" alt="Logo"/>
            <Title>REACTFOOD</Title>
        </div>
        <ShoppingCart onOpenCart={handleOpenCart}> Cart ({itemQuantity}) </ShoppingCart>
        </HeaderStyle>
    </>
    
  )
}

export default Header