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
    let modalActions = <button>Close</button>;

    if (cartMealsQuantity > 0) {
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
        <ShoppingCartBtn onOpenCart={handleOpenCart}> Cart ({cartMealsQuantity}) </ShoppingCartBtn>
        </HeaderStyle>
    </>
    
  )
}

export default Header

