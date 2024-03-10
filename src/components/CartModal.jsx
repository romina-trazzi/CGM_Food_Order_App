import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import ShoppingCart from './ShoppingCart';

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  const dialog = useRef();

   let modalActions = <button>Close</button>;

    if (itemQuantity > 0) {
    modalActions = (
        <>
        <button>Close</button>
        <button>Checkout</button>
        </>
    )};


  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <form method="dialog">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
