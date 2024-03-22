import { forwardRef, useImperativeHandle, useRef, useState, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CheckOutForm from './CheckOutForm'
import Success from './Success'
import { CartContext } from './store/shoppingCartContext.jsx';
import { sendUserOrder } from '../http.js'


const Modal = forwardRef(function Modal({}, ref) {
  const dialog = useRef();
  const { meals, clearCart } = useContext(CartContext);
  const cartMealsQuantity = meals.length;
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [buyStep, setBuyStep] = useState("openCart");


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

  const calculateTotalPrice = () => {
    return +(meals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0).toFixed(2));
  };

  // Calculate total price cart every time meals quantity changes
  useEffect(() => {
    setTotalCartPrice(calculateTotalPrice());
  }, [meals]);

  // Handle setBuystep from children to parent (bottom-up props)
  const handleSetBuyStep = (buyStep, event) => {
    event.preventDefault();
    dialog.current.showModal();
    setBuyStep(buyStep);

    if (buyStep === "close") {
      dialog.current.close();
    }

    return buyStep;
  };

  // Handle modal actions
  const handleModalActions = (buyStepAction, event) => {
    event.preventDefault() 
    dialog.current.showModal();
    setBuyStep(buyStepAction);
    
    if (buyStepAction === "close") {
      dialog.current.close();
    }
  }

  // Submit form data to backend and reset shopping cart 
  const handleFormSubmit = async (userDataFromChild) => {
    try {
      await sendUserOrder(meals, userDataFromChild);
      clearCart();
      setTotalCartPrice(0);
      
    } catch (error) {
      
      clearCart();
      setTotalCartPrice(0);
    }
  };


  let modalContent;
  switch (buyStep) {
    case "openCart":
      modalContent = <Cart title="Your Cart" totalCartPrice={totalCartPrice} cartMealsQuantity={cartMealsQuantity} onHandleSetBuyStep={handleSetBuyStep}/>;
      break;
    case "openCheckout":
      modalContent = <CheckOutForm title="Checkout" totalCartPrice={totalCartPrice} onHandleSetBuyStep={handleSetBuyStep} onSubmit={handleFormSubmit} 
     />;
      break;
    case "success":
      modalContent = <Success title="Success" onHandleSetBuyStep={handleSetBuyStep}/>;
      break;
    default:
      modalContent = <Cart title="Your Cart" totalCartPrice={totalCartPrice} cartMealsQuantity={cartMealsQuantity} onHandleSetBuyStep={handleSetBuyStep}/>;
  }


  // createPortal mounts the component in a separate DOM node with id "modal"
  return createPortal(
  <dialog id="modal" ref={dialog} className="modal">
    <form method="dialog" className="modal-form">
      {modalContent}
    </form>
  </dialog>,
  // Montiamo il dialog nel nodo del DOM con ID 'modal'
  document.getElementById('modal')
);
      
    


});

export default Modal;




