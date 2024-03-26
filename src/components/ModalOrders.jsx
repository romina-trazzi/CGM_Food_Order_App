import {useRef, useImperativeHandle, forwardRef, useState} from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';
import { fetchUserOrder } from '../http.js';

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`
export const OrderList = styled.ul `
  list-style: none;
  margin: 0;
  padding: 0;
`
export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`
export const CloseModalButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1d1a16;
  padding: 0;

  &:hover, &:active {
    color: #312c1d;
  }
`
export const LoadingModalButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1d1a16;
  padding: 0;

  &:hover, &:active {
    color: #312c1d;
  }
`

const ModalOrders = forwardRef(function ModalOrders({isOpen, setIsOpen}, ref) {

  const [successOrders, setSuccessOrders] = useState([]);
  
  const orderDialog = useRef();


  useImperativeHandle(ref, () => ({
    open: () => {
      orderDialog.current.showModal();
    },
  }));

  const handleClosing = () => {
    orderDialog.current.close();
    setIsOpen(false);
  }

  // Fetching success orders calling orders.json
  const fetchSuccessOrders = async () => { 
    setIsOpen(true);
    try {
      const successOrdersData = await fetchUserOrder();
      setSuccessOrders(successOrdersData);
      console.log(successOrdersData);

    } catch (error) {
      console.error('Errore durante il recupero degli ordini.', error);
    }
  }

  return createPortal(
    <dialog id="modalOrders" className="modal" ref={orderDialog}>
      <ModalContent>
        <Title>Elenco degli ordini avvenuti con successo</Title>
        <OrderList>{ !isOpen ? "Carica ordini" : successOrders.map((order) => (
          <li key={order.id}> 
            <span><strong> Order number: </strong>{order.id} </span><br/>
            <span><strong> Customer fullname:</strong> {order.customer.fullName} </span><br/>
            <span><strong> Email address: </strong> {order.customer.email} </span><br/>
            <span><strong> Address:</strong>{order.customer.street} {order.customer.city} {order.customer.postalCode} </span> <br/>
            <span><strong> Order: </strong><br/></span>
            {order.items.map((item, index) => (
              <div key={index}>
                <span> <u> Meal name:</u> {item.name}</span><br />
                <span> <u> Meal description:</u> {item.description}</span><br />
                <span> <u> Meal quantity:</u> {item.quantity} </span><br />
                <span> <u> Meal price:</u> {item.price} </span><br />
              </div>))
            }
            <br/>
          </li>))}
        </OrderList>
        <div style={{marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
          <LoadingModalButton onClick={fetchSuccessOrders}>Load success orders</LoadingModalButton>
          <CloseModalButton onClick={handleClosing}>Close</CloseModalButton>
        </div>
      </ModalContent>
    </dialog>,
    document.getElementById('modalOrders')
  )

});


export default ModalOrders;






//   order.items.name,
//        , , 


 

