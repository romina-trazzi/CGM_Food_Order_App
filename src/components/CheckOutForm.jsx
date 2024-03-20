import styled from 'styled-components';
import { useEffect, useState } from 'react';

export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;
export const FormContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  max-width: 20rem;
`;
export const Label = styled.label`
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;
export const Input = styled.input`
  width: 100%;
  font: inherit;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  gap: 1rem;
`;

function CheckOutForm({title, totalCartPrice, onSubmit, shouldValidate}) {

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  


  useEffect(() => {

    if (shouldValidate) {
      const errorNumber = validateForm();

      if (errorNumber === 0) {
        setIsValid(true);
        console.log("Il form è valido!");
        
        // Invia i dati al padre
        console.log(userData);
        onSubmit(userData);

        // Resetta il form
        // setUserData({fullName: "", email: "", street: "", postalCode: "", city: ""});
        // shouldValidate === false;

      } else {
        console.log("Errori");
        shouldValidate === false;
      }
    }
  }, [shouldValidate]);


  return (
    <FormContainer>
      <Title>{title}</Title>
      <span style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}> Total amount: ${totalCartPrice}</span>

      <Label>Full Name</Label>
      <Input type="text" required name="fullName" value={userData.fullName} onChange={handleChange}/>

      <Label>E-Mail Address</Label>
      <Input type="email" required name="email" value={userData.email} onChange={handleChange}/>
 
      <Label>Street</Label>
      <Input type="text" required name="street" value={userData.street} onChange={handleChange}/>

      <Row>
        <div>
          <Label>Postal Code</Label>
          <Input type="text" required style={{ marginTop: "0.5rem" }} name="postalCode" value={userData.postalCode} onChange={handleChange}/>
        </div>
        <div>
          <Label>City</Label>
          <Input type="text" required style={{ marginTop: "0.5rem" }} name="city"  value={userData.city} onChange={handleChange}/>
        </div>
      </Row>
    </FormContainer>
  );
}

export default CheckOutForm;


