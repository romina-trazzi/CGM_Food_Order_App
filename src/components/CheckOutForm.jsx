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

  const [userData, setUserData] = useState({fullName: "", email: "", street: "", postalCode: "", city: ""});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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

    // Validazione Nome completo
    const fullNamePattern = /^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$/;
    if (userData.fullName.trim() === "") {
      newErrors.fullName = "Inserisci nome e cognome";
      setIsValid(false);
    } else if(!userData.fullName.includes(" ")) {
      newErrors.fullName = "Inserisci sia il nome che il cognome";
      setIsValid(false);
    } else if(!fullNamePattern.test(userData.fullName)) {
      newErrors.fullName = "Inserisci un nome e un cognome validi";
      setIsValid(false);
    }
    
    // Validazione Indirizzo email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email.trim() === "") {
      newErrors.email = "Inserisci il tuo indirizzo email";
      setIsValid(false);
    } else if (!emailPattern.test(userData.email)) {
      newErrors.email = "Inserisci un'email valida";
      setIsValid(false);
    }

    // Validazione Indirizzo
    const addressPattern = /^(Via|Viale|Piazza|Corso|Largo)\s[A-Za-zÀ-ÖØ-öø-ÿ]+\s\d+$/;
    if (userData.street.trim() === "") {
      newErrors.street = "Inserisci il tuo indirizzo";
      setIsValid(false);
    } else if(!addressPattern.test(userData.street)) {
      newErrors.street = "Inserisci un indirizzo valido";
      setIsValid(false);
    }

    // Validazione Codice postale
    const postalCodePattern = /^\d{5,}$/;
    if (userData.postalCode.trim() === "" || !postalCodePattern.test(userData.postalCode)) {
      newErrors.postalCode = "Inserisci un codice postale valido";
      setIsValid(false);
    }

    // Validazione Città
    const cityPattern = /^[A-Z][a-zA-ZÀ-ÿ\s']{2,}$/;
    if (userData.city.trim() === "" || !cityPattern.test(userData.city)) {
      newErrors.city = "Inserisci una città valida";
      setIsValid(false);
    }
  
    setErrors(newErrors);

    const errorLength = Object.keys(newErrors).length
    
    return errorLength;
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


