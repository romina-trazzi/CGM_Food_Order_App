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
  const [userData, setUserData] = useState({fullName: "", email: "", street: "", postalCode: "", city: ""});

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

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Validazione Nome completo
    const fullNamePattern = /^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$/;
    if (userData.fullName.trim() === "") {
      newErrors.fullName = "Inserisci nome e cognome";
      setIsValid(false);
    } else if(!userData.fullName.includes(" ")) {
      newErrors.fullName = "Inserisci sia il nome che il cognome";
      setIsValid(false);
    } else if(!fullNamePattern.test(userData.fullName)) {
      newErrors.fullName = "Inserisci un nome e un cognome validi";
      setIsValid(false);
    }
    
    // Validazione Indirizzo email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      newErrors.email = "Inserisci il tuo indirizzo email";
      setIsValid(false);
    } else if (!emailPattern.test(userData.email)) {
      newErrors.email = "Inserisci un'email valida";
      setIsValid(false);
    }

    // Validazione Indirizzo
    const addressPattern = /^(Via|Viale|Piazza|Corso|Largo)\s[A-Za-zÀ-ÖØ-öø-ÿ]+\s\d+$/;
    if (userData.street.trim() === "") {
      newErrors.street = "Inserisci il tuo indirizzo";
      setIsValid(false);
    } else if(!addressPattern.test(userData.street)) {
      newErrors.street = "Inserisci un indirizzo valido";
      setIsValid(false);
    }

    // Validazione Codice postale
    const postalCodePattern = /^\d{5,}$/;
    if (userData.postalCode.trim() === "" || !postalCodePattern.test(userData.postalCode)) {
      newErrors.postalCode = "Inserisci un codice postale valido";
      setIsValid(false);
    }

    // Validazione Città
    const cityPattern = /^[A-Z][a-zA-ZÀ-ÿ\s']{2,}$/;
    if (userData.city.trim() === "" || !cityPattern.test(userData.city)) {
      newErrors.city = "Inserisci una città valida";
      setIsValid(false);
    }
  
    setErrors(newErrors);

    const errorLength = Object.keys(newErrors).length
    
    return errorLength;
  };

  // Submit CheckOutForm
  const handleFormSubmit = (userDataFromChild, event) => {
    console.log("Hello from child data", userDataFromChild);
    handleModalAction('submitOrder', event);
  }

  // Restituiamo il componente utilizzando createPortal per montarlo in un nodo separato del DOM
  return createPortal(
    <dialog id="modal" ref={dialog} className="modal">
      <form method="dialog" className="modal-form">
        {buyStep === "openCart" && <Cart title="Your Cart" totalCartPrice={totalCartPrice}/>}
        {buyStep === "goToCheckout" && <CheckOutForm title = "Checkout" totalCartPrice={totalCartPrice} shouldValidate={shouldValidate} onSubmit={handleFormSubmit} userdata={userData} setUserData/>} 
        {buyStep === "submitOrder" && <Success title = "Success"/>}
        {modalActions}
      </form>
    </dialog>,
  // Montiamo il dialog nel nodo del DOM con ID 'modal'
  document.getElementById('modal')
  );
});

export default Modal;
