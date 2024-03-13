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

function CheckOutForm({title}) {

  return (
    <FormContainer>
      <Title>{title}</Title>
      <span style={{marginLeft: "0.5rem", marginBottom: "1rem"}}>Total amount:</span>
      <Label>Full Name</Label>
      <Input required/>
      <Label>E-Mail Address</Label>
      <Input required/>
      <Label>Street</Label>
      <Input required/>
      <Row>
        <div>
          <Label>Postal Code</Label>
          <Input required style={{marginTop:"0.5rem"}}/>
        </div>
        <div>
          <Label>City</Label>
          <Input required style={{marginTop:"0.5rem"}}/>
        </div>
      </Row>
    </FormContainer>
  )
}

export default CheckOutForm