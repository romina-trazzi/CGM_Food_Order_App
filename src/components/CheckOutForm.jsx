import styled from 'styled-components';
import { useState } from 'react';


export const Title = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 0.5rem;
`
export const FormContainer = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  max-width: 30rem; 
`
export const Label = styled.label`
  font-weight: bold;
  margin: 0.5rem;
`
export const Input = styled.input`
  width: 100%;
  font: inherit;
  padding: 0.5rem;
  margin-left: 0.5rem; 
  border-radius: 4px;
  border: 1px solid #ccc;

  &.red {
    background-color: lightcoral;
    border-color: red;
  }
`
export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`
export const RowEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`
export const CloseModalButton = styled.button`
  font: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #1d1a16;

  &:hover, &:active {
    color: #312c1d;
  }

`
export const SubmitOrderButton = styled.button`
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

function CheckOutForm({title, totalCartPrice, onSubmit, onHandleSetBuyStep}) {
  const [userData, setUserData] = useState({fullName: "", email: "", street: "", postalCode: "", city: ""});
  const [errors, setErrors] = useState({});
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Fullname validation
    const fullNamePattern = /^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$/;
    if (userData.fullName.trim() === "") {
      newErrors.fullName = "Inserisci nome e cognome";
    } else if(!userData.fullName.includes(" ")) {
      newErrors.fullName = "Inserisci sia il nome che il cognome";
    } else if(!fullNamePattern.test(userData.fullName)) {
      newErrors.fullName = "Inserisci un nome e un cognome validi";
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      newErrors.email = "Inserisci il tuo indirizzo email";
    } else if (!emailPattern.test(userData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }

    // Address validation
    const addressPattern = /^(Via|Viale|Piazza|Corso|Largo)\s[A-Za-zÀ-ÖØ-öø-ÿ]+\s\d+$/;
    if (userData.street.trim() === "") {
      newErrors.street = "Inserisci il tuo indirizzo";
    } else if(!addressPattern.test(userData.street)) {
      newErrors.street = "Inserisci un indirizzo valido";
    }

    // Postal code validation
    const postalCodePattern = /^\d{5,}$/;
    if (userData.postalCode.trim() === "" || !postalCodePattern.test(userData.postalCode)) {
      newErrors.postalCode = "Inserisci un codice postale valido";
    }

    // City validation
    const cityPattern = /^[A-Z][a-zA-ZÀ-ÿ\s']{2,}$/;
    if (userData.city.trim() === "" || !cityPattern.test(userData.city)) {
      newErrors.city = "Inserisci una città valida";
    }
      
    const errorLength = Object.keys(newErrors).length;

    // Aggiorna lo stato degli errori solo se ci sono errori
    if (errorLength > 0) {
      setErrors(newErrors);
    };
    
    return errorLength;
  };

  // Check form validation and sending data to parent compoent
  const sendModalAction = (event, buyStepAction) => {
    
    if (buyStepAction === "success") {
      const errorNumber = validateForm();

      if (errorNumber === 0) {
        onSubmit(userData);
        setTimeout(() => {
          onHandleSetBuyStep(buyStepAction, event);
        }, 2000);
      } else {

        for (const error in errors) {
          if (errors.hasOwnProperty(error)) {
            // alert("Il campo errato è: " + error + " " + errors[error]);

          }
        }
      }
      
    } else {
      onHandleSetBuyStep(buyStepAction, event);
    }
  }

  return (
    <>
    <FormContainer>
      <Title>{title}</Title>
      <span style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}> Total amount: ${totalCartPrice}</span>

      <Label>Full Name</Label>
      <Input type="text" name="fullName" value={userData.fullName} onChange={handleChange} id="fullname" className={errors.fullName ? "red" : ""} required />

      <Label>E-Mail Address</Label>
      <Input type="email" name="email" value={userData.email} onChange={handleChange} id="email" className={errors.email ? "red" : ""} required/>
 
      <Label>Street</Label>
      <Input type="text" name="street" value={userData.street} onChange={handleChange} id="street" className={errors.street ? "red" : ""} required/>

      <Row>
        <div>
          <Label>Postal Code</Label>
          <Input type="text" style={{ marginTop: "0.5rem" }} name="postalCode" value={userData.postalCode} onChange={handleChange} id="postal-code" className={errors.postalCode ? "red" : ""} required/>
        </div>
        <div>
          <Label>City</Label>
          <Input type="text" style={{ marginTop: "0.5rem" }} name="city"  value={userData.city} onChange={handleChange} className={errors.city ? "red" : ""} id="city" required/>
        </div>
      </Row>
    </FormContainer>
    <RowEnd>
      <CloseModalButton type="button" onClick={(event) => sendModalAction(event, 'close')}>Close</CloseModalButton>
      <SubmitOrderButton type="submit" onClick={(event) => sendModalAction(event, 'success')}>Submit Order</SubmitOrderButton>
    </RowEnd>
    </>
  );
}

export default CheckOutForm;


