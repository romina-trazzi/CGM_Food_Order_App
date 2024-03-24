import {useRef, useImperativeHandle, forwardRef} from 'react'
import styled from 'styled-components';

export const ModalContainer = styled.dialog`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`
export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`
export const OrderList = styled.ul `
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
`
export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`
export const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`


const ModalOrders = forwardRef(function ModalOrders({children}, ref) {
  
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  const handleClosing = () => {
    dialog.current.close();
  }

  return (
    <dialog id="modalOrders" className="modal" ref={dialog}>
      <ModalContent>
        <Title>Elenco degli ordini avvenuti con successo</Title>
        <OrderList>{children}</OrderList>
        <CloseButton onClick={handleClosing}>Close</CloseButton>
      </ModalContent>
    </dialog>
  )

})


export default ModalOrders;









 

