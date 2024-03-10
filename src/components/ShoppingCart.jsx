import styled from 'styled-components';

export const ShoppingCartButton = styled.button`
    padding: 1rem;
    background-color: transparent;
    border: 0px;
    font-size: 1.2rem;
    font-weight: bolder;
    color: gold;
    cursor: pointer;

`

function ShoppingCart({onOpenCart, children}) {

 
  return (
    <ShoppingCartButton onClick={onOpenCart}>{children}</ShoppingCartButton>
  )
}

export default ShoppingCart