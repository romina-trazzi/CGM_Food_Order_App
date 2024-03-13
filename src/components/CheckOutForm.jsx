import styled from 'styled-components'

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
`

function CheckOutForm({title}) {
  return (
    <div>
       <Title style={{marginLeft: "0.5rem"}}>{title}</Title>
    </div>
  )
}

export default CheckOutForm