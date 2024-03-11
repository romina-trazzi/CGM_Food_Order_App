import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

const CartModal = forwardRef(function Modal({ title, actions}, ref) {
  const dialog = useRef();

  // Utilizziamo useImperativeHandle per esporre una funzione personalizzata attraverso il riferimento
  useImperativeHandle(ref, () => {
    return {
      // La funzione open legata a Header (handleOpenCart) apre il dialogo mostrando il modal
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  // Restituiamo il componente utilizzando createPortal per montarlo in un nodo separato del DOM
  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <form method="dialog">
        <Cart/>
        {actions}
      </form>
    </dialog>,
    // Montiamo il dialog nel nodo del DOM con ID 'modal'
    document.getElementById('modal')

  );
});

export default CartModal;
