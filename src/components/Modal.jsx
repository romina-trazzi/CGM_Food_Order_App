import { forwardRef, useImperativeHandle, useRef, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CheckOutForm from './CheckOutForm'
import Success from './Success'
import { CartContext } from './store/shoppingCartContext.jsx';

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

const Modal = forwardRef(function Modal({}, ref) {
  const dialog = useRef();

  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [buyStep, setBuyStep] = useState("openCart");
  const [userData, setUserData] = useState({name: "", adress:"", street:"", postalcode:"", city:""});
  const { meals } = useContext(CartContext);
  const cartMealsQuantity = meals.length;

  // Utilizziamo useImperativeHandle per passare la dichiarazione delle funzioni open\close della modale legate a Header
  useImperativeHandle(ref, () => {
    return {
      // Definiamo le funzioni che può utilizzare il componente Header tramite modalRef.current.nomeAzione
      open: () => {
        dialog.current.showModal();
      },

      close: () => {
        dialog.current.close();
      },

      setBuyStep: (buyStep) => {
        setBuyStep(buyStep);
      }
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dialog.current.close();
  };

  // Opening modal and handling modal actions 
  function handleModalAction(buyStepAction, event) {
    event.preventDefault();
    dialog.current.showModal();
    setBuyStep(buyStepAction);
    
    if (buyStepAction === "close") {
      dialog.current.close();
    }
  }

  const calculateTotalPrice = () => {
    return +(meals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0).toFixed(2));
  };

  // Calculate total price cart
  useEffect(() => {
    setTotalCartPrice(calculateTotalPrice());
  }, [meals]);


  // Setting modal action buttons
  let modalActions = (
    <ModalActions>
      <CloseModalButton type="button" onClick={(event) => handleModalAction('close', event)}>Close</CloseModalButton>
    </ModalActions>
  )

  if (buyStep === "openCart" && cartMealsQuantity > 0) {
    modalActions = (
    <ModalActions>
      <CloseModalButton type="button" onClick={(event) => handleModalAction('close', event)}>Close</CloseModalButton>
      <CheckoutButton onClick={(event) => handleModalAction('goToCheckout', event)} type="button">Go to Checkout</CheckoutButton>
    </ModalActions>
    )
  };

  if (buyStep === "goToCheckout") {
    modalActions = (
    <ModalActions>
      <CloseModalButton type="button" onClick={(event) => handleModalAction('close', event)}>Close</CloseModalButton>
      <SubmitOrderButton onClick={(event) => handleModalAction('submitOrder', event)} type="submit">Submit Order</SubmitOrderButton>
    </ModalActions>
    )
  }

  if (buyStep === "submitOrder") {
    modalActions = (
    <ModalActions>
      <OkayButton type="submit">Okay</OkayButton>
    </ModalActions>
    )
  }

  
  // Restituiamo il componente utilizzando createPortal per montarlo in un nodo separato del DOM
  return createPortal(
    <dialog id="modal" ref={dialog} className="modal">
      <form method="dialog" className="modal-form" onSubmit={handleSubmit}>
        {buyStep === "openCart" && <Cart title="Your Cart" totalCartPrice={totalCartPrice}/>}
        {buyStep === "goToCheckout" && <CheckOutForm title = "Checkout" totalCartPrice={totalCartPrice} userData={userData} />} 
        {buyStep === "submitOrder" && <Success title = "Success"/>}
        {modalActions}
      </form>
    </dialog>,
  // Montiamo il dialog nel nodo del DOM con ID 'modal'
  document.getElementById('modal')
  );
});

export default Modal;
