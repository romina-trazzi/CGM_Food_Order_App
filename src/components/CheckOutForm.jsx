import styled from 'styled-components';
import { useState, useEffect } from 'react';

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

function CheckOutForm({title, totalCartPrice}) {

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
    let isValid = true;
    const newErrors = {};

    // Validazione Nome completo
    const fullNamePattern = /^\w{3,} \w{3,}$/;
    if (userData.fullName.trim() === "") {
      newErrors.fullName = "Inserisci nome e cognome";
      isValid = false;
    } else if(!userData.fullName.includes(" ")) {
      newErrors.fullName = "Inserisci sia il nome che il cognome";
      isValid = false;
    } else if(!fullNamePattern.test(userData.fullName)) {
      newErrors.fullName = "Inserisci un nome e un cognome validi";
      isValid = false;
    }
    
    // Validazione Indirizzo email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      newErrors.email = "Inserisci il tuo indirizzo email";
      isValid = false;
    } else if (!emailPattern.test(userData.email)) {
      newErrors.email = "Inserisci un'email valida";
      isValid = false;
    }

    // Validazione Indirizzo
    const addressPattern = /^(Via|Viale|Piazza|Corso|Largo)\s[A-Za-zÀ-ÖØ-öø-ÿ]+\s\d+$/;
    if (userData.street.trim() === "") {
      newErrors.street = "Inserisci il tuo indirizzo";
      isValid = false;
    } else if(!addressPattern.test(userData.street)) {
      newErrors.street = "Inserisci un indirizzo valido";
      isValid = false;
    }

    // Validazione Codice postale
    const postalCodePattern = /^\d{5,}$/;
    if (userData.postalCode.trim() === "" || !postalCodePattern.test(userData.postalCode)) {
      newErrors.postalCode = "Inserisci un codice postale valido";
      isValid = false;
    }

    // Validazione Città
    const cityPattern = /^[a-zA-ZÀ-ÿ\s']+$/;
    if (userData.city.trim() === "" || !cityPattern.test(userData.city)) {
      newErrors.city = "Inserisci una città valida";
      isValid = false;
    }
    

    setErrors(newErrors);

    return isValid;
  };

  // Check the validation and send right data to parent component
  useEffect(() => {
    const isValid = validateForm();
    if (!isValid) {
      // Se il form non è valido, fai qualcosa, ad esempio aggiorna lo stato degli errori
      console.log(errors);
    } else {
      // Se il form è valido, azzera gli errori
      setErrors({});
      // Invia i dati al padre
      console.log(userData);
      // Svuota i campi del form
      setUserData({fullName: "", email: "", street: "", postalCode: "", city: ""});
    }
  }, [userData]);


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