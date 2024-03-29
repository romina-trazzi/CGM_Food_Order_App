import {useRef, useImperativeHandle, forwardRef, useState} from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';
import { fetchUserOrder } from '../http.js';

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`
export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`
export const OrderList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
export const CustomerData = styled.span`
  margin: 0.5rem;
  display: block;
`
export const MealData = styled.span`
  margin: 0.5rem;  
  display: block;
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
          <li key={order.id} style={{border: "1px solid black", padding: "1rem", marginBottom: "1rem"}}> 
            <div><strong> Order number: {order.id} </strong></div><br/>
            <CustomerData> Customer fullname: {order.customer.fullName} </CustomerData>
            <CustomerData> Email address: {order.customer.email} </CustomerData>
            <CustomerData> Address: {order.customer.street} {order.customer.city} {order.customer.postalCode} </CustomerData>
            <br/><div><strong> Order: </strong></div><br/>
            {order.items.map((item, index) => (
              <div key={index}>
                <MealData>Meal name: {item.name} </MealData>
                <MealData>Meal description: {item.description} </MealData>
                <MealData>Meal quantity: {item.quantity} </MealData>
                <MealData>Meal price: {item.price} </MealData>
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
