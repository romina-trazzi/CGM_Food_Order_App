import {useRef, useImperativeHandle} from 'react'
import styled from 'styled-components';

const ModalContainer = styled.dialog`
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
const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
`
const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

function ModalOrders({}, ref) {

  const modalRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      // Defining the functions used by Header component (with modalRef.current.actionName)
      open: () => {
        dialog.current.showModal();
      },

      close: () => {
        dialog.current.close();
      },
    }
  });



  return (
    <dialog id="modalOrders" ref={modalRef} className="modal">
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Elenco Ordini</h2>
        <p>Contenuto dell'elenco degli ordini...</p>
      </ModalContent>
    </dialog>,
    document.getElementById('modalOrders')
  )
}










 

