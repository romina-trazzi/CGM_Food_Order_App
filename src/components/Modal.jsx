import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CheckOutForm from './CheckOutForm'
import Success from './Success'

const Modal = forwardRef(function Modal({actions, buyStep}, ref) {
  const dialog = useRef();

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  // Utilizziamo useImperativeHandle per esporre una funzione personalizzata attraverso il riferimento
  useImperativeHandle(ref, () => {
    return {
      // La funzione open\close legata a Header (handleModalAction) apre\chiude il dialogo mostrando il modal
      open: () => {
        dialog.current.showModal();
      },

      close: () => {
        dialog.current.close();
      },
    };
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dialog.current.close();
  };

  const handleSetTotalCartPrice = (newPrice) => {
    setTotalCartPrice((prevPrice) => {
      // Aggiorna il prezzo se è diverso dal valore precedente
      return newPrice !== prevPrice ? newPrice : prevPrice;
    });
  };

  // Restituiamo il componente utilizzando createPortal per montarlo in un nodo separato del DOM
  return createPortal(
    <dialog id="modal" ref={dialog} className="modal">
      <form method="dialog" className="modal-form" onSubmit={handleSubmit}>
        {buyStep === "openCart" && <Cart title = "Your Cart" onSetTotalCartPrice={handleSetTotalCartPrice}/> }
        {buyStep === "goToCheckout" && <CheckOutForm title = "Checkout" totalCartPrice={totalCartPrice}/>} 
        {buyStep === "submitOrder" && <Success title = "Success"/>}
        {actions}
      </form>
    </dialog>,
    // Montiamo il dialog nel nodo del DOM con ID 'modal'
    document.getElementById('modal')
  );
});

export default Modal;
