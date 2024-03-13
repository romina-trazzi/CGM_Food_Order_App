import styled from 'styled-components';
import { useRef, useContext, useState } from 'react'
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
export const ShoppingCartButton = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: 0px;
  font-size: 1.2rem;
  font-weight: bolder;
  color: gold;
  cursor: pointer;
`
export const SubmitOrderButton = styled.button`
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
export const OkayButton = styled.button`
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
export const Title = styled.h2`
  padding-left: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
`


function Header() {
    const { meals } = useContext(CartContext);
    const cartMealsQuantity = meals.length;
    const modal = useRef();
    const [buyStep, setBuyStep] = useState("openCart"); 

    // Opening modal and handling his interface
    function handleModalAction(buyStepAction, event) {
        event.preventDefault();
        modal.current.open();
        setBuyStep(buyStepAction);
    }

    // Setting modal action buttons
    let modalActions = (
        <ModalActions>
            <CloseModalButton>Close</CloseModalButton>
        </ModalActions>
    )

    if (buyStep === "openCart" && cartMealsQuantity > 0) {
        modalActions = (
        <ModalActions>
            <CloseModalButton>Close</CloseModalButton>
            <CheckoutButton onClick={(e) => handleModalAction('goToCheckout', e)}>Go to Checkout</CheckoutButton>
        </ModalActions>
        )
    };

    if (buyStep === "goToCheckout") {
        modalActions = (
        <ModalActions>
            <CloseModalButton>Close</CloseModalButton>
            <SubmitOrderButton onClick={(e) => handleModalAction('submitOrder', e)}>SubmitOrder</SubmitOrderButton>
        </ModalActions>
        )
    }

    if (buyStep === "submitOrder") {
        modalActions = (
        <ModalActions>
            <OkayButton>Okay</OkayButton>
        </ModalActions>
        )
    }

    return (
        <>
            <Modal ref={modal} actions={modalActions} buyStep={buyStep}/>
            <HeaderStyle>
            <div style={{display: "flex", alignItems: "center"}}>
                <Logo src="logo.jpg" alt="Logo"/>
                <Title>REACTFOOD</Title>
            </div>
            <ShoppingCartButton onClick={(event) => handleModalAction('openCart', event)}> Cart ({cartMealsQuantity}) </ShoppingCartButton>
            </HeaderStyle>
        </>
    
    )
}

export default Header

