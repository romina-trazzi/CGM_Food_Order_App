import styled from 'styled-components'

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`
export const SuccessParagraph = styled.p`
  margin-left: 0.5rem;
  font-size: 1rem;
  line-height: 2;
`
export const OkayButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: #ffc404;
  border: 1px solid #ffc404;
  color: #1f1a09;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;

  &:hover, &:active {
    background-color: #ffab04;
    border-color: #ffab04;
    color: #1f1a09;
  }
`
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`


function Success({title, onHandleSetBuyStep}) {

  const sendModalAction = (event, buyStepAction) => {
    onHandleSetBuyStep(buyStepAction, event);
  }

  return (
    <div>
      <Title style={{marginLeft: "0.5rem"}}>{title}</Title>
      <SuccessParagraph>Your order was submittet succesfully.<br/>
      We will get back to you with more details via email within the next few minutes.</SuccessParagraph>
      <div style={{display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
        <OkayButton type="button" onClick={(event) => sendModalAction(event, 'close')}>Okay</OkayButton>
      </div>
    </div>
  )
}

export default Success