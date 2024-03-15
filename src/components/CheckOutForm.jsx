import styled from 'styled-components'
import {useRef} from 'react'


export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`
export const FormContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  max-width: 20rem;
`
export const Label = styled.label`
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`
export const Input = styled.input`
  width: 100%;
  font: inherit;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`
export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  gap: 1rem;
`

function CheckOutForm({title, totalCartPrice}) {

  const inputValueRef = useRef();

  return (
    <FormContainer>
      <Title>{title}</Title>
      <span style={{marginLeft: "0.5rem", marginBottom: "1rem"}}>Total amount: {totalCartPrice}</span>
      <Label>Full Name</Label>
      <Input type="text" required name="fullName" ref={inputValueRef}/>
      <Label>E-Mail Address</Label>
      <Input type="email"required name="email" ref={inputValueRef}/>
      <Label>Street</Label>
      <Input type="text" required name='street' ref={inputValueRef}/>
      <Row>
        <div>
          <Label type="number">Postal Code</Label>
          <Input required style={{marginTop:"0.5rem"}} name="postalCode" ref={inputValueRef}/>
        </div>
        <div>
          <Label>City</Label>
          <Input required type="text" style={{marginTop:"0.5rem"}} name="city" ref={inputValueRef}/>
        </div>
      </Row>
    </FormContainer>
  )
}

export default CheckOutForm