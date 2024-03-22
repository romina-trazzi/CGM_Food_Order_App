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


function Success({title}) {

  return (
    <div>
      <Title style={{marginLeft: "0.5rem"}}>{title}</Title>
      <SuccessParagraph>Your order was submittet succesfully.<br/>
      We will get back to you with more details via email within the next few minutes.</SuccessParagraph>
    </div>
  )
}

export default Success