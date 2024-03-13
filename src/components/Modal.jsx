import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CheckOutForm from './CheckOutForm'
import Success from './Success'

const Modal = forwardRef(function Modal({actions, buyStep}, ref) {
  const dialog = useRef();

  // Utilizziamo useImperativeHandle per esporre una funzione personalizzata attraverso il riferimento
  useImperativeHandle(ref, () => {
    return {
      // La funzione open legata a Header (handleModalAction) apre il dialogo mostrando il modal
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  // Restituiamo il componente utilizzando createPortal per montarlo in un nodo separato del DOM
  return createPortal(
    <dialog id="modal" ref={dialog} className="modal">
      <form method="dialog">
        {buyStep === "openCart" && <Cart title = "Your Cart"/> }
        {buyStep === "goToCheckout" && <CheckOutForm title = "Checkout"/>} 
        {buyStep === "submitOrder" && <Success title = "Success"/>}
        {actions}
      </form>
    </dialog>,
    // Montiamo il dialog nel nodo del DOM con ID 'modal'
    document.getElementById('modal')
  );
});

export default Modal;
