import styled from 'styled-components';
import { useRef, useContext } from 'react'
import Modal from './Modal.jsx';
import { CartContext } from './store/shoppingCartContext.jsx';


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
export const Title = styled.h2`
  padding-left: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
`
export const ShoppingCartButton = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: 0px;
  font-size: 1.2rem;
  font-weight: bolder;
  color: gold;
  cursor: pointer;
`

function Header() {
    const { meals } = useContext(CartContext);
    const cartMealsQuantity = meals.length;
    const modalRef = useRef();

    const openModal = (buyStepAction) => {
        modalRef.current.open();
        modalRef.current.setBuyStep(buyStepAction);
    };
     

    return (
        <>
            <Modal ref={modalRef}/>
            <HeaderStyle>
            <div style={{display: "flex", alignItems: "center"}}>
                <Logo src="logo.jpg" alt="Logo"/>
                <Title>REACTFOOD</Title>
            </div>
            <ShoppingCartButton onClick={() => openModal("openCart")}> Cart ({cartMealsQuantity}) </ShoppingCartButton>
            </HeaderStyle>
        </>
    
    )
}

export default Header

