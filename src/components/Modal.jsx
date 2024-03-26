import { forwardRef, useImperativeHandle, useRef, useState, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';
import CheckOutForm from './CheckOutForm'
import Result from './Result.jsx'
import { CartContext } from './store/shoppingCartContext.jsx';
import { sendUserOrder } from '../http.js'


const Modal = forwardRef(function Modal({}, ref) {
  const dialog = useRef();
  const { meals, clearCart } = useContext(CartContext);
  const cartMealsQuantity = meals.length;
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [buyStep, setBuyStep] = useState("openCart");
  const [isSending, setIsSending] = useState(false);

  
  useImperativeHandle(ref, () => {
    return {
      // Defining methods used by parent component Header (with modalRef.current.actionName)
      open: () => {
        dialog.current.showModal();
      },

      setBuyStep: (buyStep) => {
        setBuyStep(buyStep);
      }
    };
  });

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

  // Submit form data to backend and reset shopping cart 
  const handleFormSubmit = async (userDataFromChild) => {
    try {
      await sendUserOrder(meals, userDataFromChild);
      setIsSending(true);
      clearCart();
      setTotalCartPrice(0);
    } catch (error) {
      clearCart();
      setTotalCartPrice(0);
      setIsSending(false);
    }
  };

  const returnModalContent = () => {
    switch (buyStep) {
      case "openCart":
        return <Cart title="Your Cart" totalCartPrice={totalCartPrice} cartMealsQuantity={cartMealsQuantity} onHandleSetBuyStep={handleSetBuyStep}/>;
      case "openCheckout":
        return <CheckOutForm title="Checkout" totalCartPrice={totalCartPrice} onHandleSetBuyStep={handleSetBuyStep} onSubmit={handleFormSubmit}/>;
      case "result":
        return <Result title={isSending ? "Success" : "Error"} onHandleSetBuyStep={handleSetBuyStep} isSending={isSending}/>;
      default:
        return <Cart title="Your Cart" totalCartPrice={totalCartPrice} cartMealsQuantity={cartMealsQuantity} onHandleSetBuyStep={handleSetBuyStep}/>;
    }
  }

  const calculateTotalPrice = () => {
    return +(meals.reduce((acc, meal) => acc + meal.price * meal.quantity, 0).toFixed(2));
  };

  useEffect(() => {
    setTotalCartPrice(calculateTotalPrice());
  }, [meals]);



  // createPortal mounts the component in a separate DOM node with id "modal"
  return createPortal(
    <dialog id="modal"  className="modal" ref={dialog}>
      <form method="dialog" className="modal-form">
        {returnModalContent()}
      </form>
    </dialog>,
    // Montiamo il dialog nel nodo del DOM con ID 'modal' (vedi index.html)
    document.getElementById('modal')
  );
      
});

export default Modal;




