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
  const [shouldValidate, setShouldValidate] = useState(false);
  const { meals } = useContext(CartContext);
  const cartMealsQuantity = meals.length;


  useImperativeHandle(ref, () => {
    return {
      // Defining the functions used by Header component (with modalRef.current.actionName)
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
  
  // Handling modal actions 
  function handleModalAction(buyStepAction, event) {
    event.preventDefault();
    dialog.current.showModal();
    setBuyStep(buyStepAction);
    
    if (buyStepAction === "close") {
      dialog.current.close();
    }
  }

  function handleValidate(event) {
    setShouldValidate(true)
  }

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
      <SubmitOrderButton type="submit" onClick={(event) => handleValidate(event)}>Submit Order</SubmitOrderButton>
    </ModalActions>
    )
  }

  if (buyStep === "submitOrder") {
    modalActions = (
    <ModalActions>
      <OkayButton type="button" onClick={(event) => handleModalAction('close', event)}>Okay</OkayButton>
    </ModalActions>
    )
  }

  const calculateTotalPrice = () => {
    return +(meals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0).toFixed(2));
  };

  // Calculate total price cart every time meals quantity changes
  useEffect(() => {
    setTotalCartPrice(calculateTotalPrice());
  }, [meals]);

  // Submit CheckOutForm
  const handleFormSubmit = (userDataFromChild, event) => {
    console.log("Hello from child data", userDataFromChild);
    handleModalAction('submitOrder', event);
  }

  // Restituiamo il componente utilizzando createPortal per montarlo in un nodo separato del DOM
  return createPortal(
    <dialog id="modal" ref={dialog} className="modal">
      <form method="dialog" className="modal-form" onSubmit={(event) => handleFormSubmit()}>
        {buyStep === "openCart" && <Cart title="Your Cart" totalCartPrice={totalCartPrice}/>}
        {buyStep === "goToCheckout" && <CheckOutForm title = "Checkout" totalCartPrice={totalCartPrice} shouldValidate={shouldValidate} onSubmit={handleFormSubmit}/>} 
        {buyStep === "submitOrder" && <Success title = "Success"/>}
        {modalActions}
      </form>
    </dialog>,
  // Montiamo il dialog nel nodo del DOM con ID 'modal'
  document.getElementById('modal')
  );
});

export default Modal;
