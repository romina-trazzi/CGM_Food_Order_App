import styled from 'styled-components';
import { useRef, useContext } from 'react'
import ShoppingCartBtn from './ShoppingCartBtn.jsx'
import CartModal from './CartModal.jsx';
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
export const Title = styled.span`
    padding-left: 1rem;
    font-weight: bold;
    font-size: 1.5rem;

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

function Header() {

    const { meals } = useContext(CartContext);
    const cartMealsQuantity = meals.length;
    
    const modal = useRef();

    // Opening the shopping cart modal
    function handleOpenCart() {
        // Richiamiamo la funzione open() del componente CartModal tramite il riferimento
        modal.current.open();
    }

    // Setting modal action buttons
    let modalActions = <CloseModalButton>Close</CloseModalButton>;

    if (cartMealsQuantity > 0) {
        modalActions = (
        <ModalActions>
            <CloseModalButton>Close</CloseModalButton>
            <CheckoutButton>Go to Checkout</CheckoutButton>
        </ModalActions>
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
        <ShoppingCartBtn onOpenCart={handleOpenCart}> Cart ({cartMealsQuantity}) </ShoppingCartBtn>
        </HeaderStyle>
    </>
    
  )
}

export default Header

