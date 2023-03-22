import { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const SubscribeWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const Form = styled.form`
  width: 100%;
`;

const Title = styled.p`
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  font-family: "Kiddos";
  font-size: 1.3rem;
  padding: 0px 5px;
`;

const Button = styled.button`
  padding: 5px 15px;
  border: none;
  border-radius: 30px;
  background-color: var(--light-pink);
  font-family: "Kiddos";
  font-size: 1.2em;
  cursor: pointer;
  /* box-shadow: 0 3px var(--pink); */
`;

const FormGroup = styled.div`
  display: block;
  width: 280px;
  margin: 7px auto;
`;

const Input = styled.input`
  padding: 0.5em;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Message = styled.p`
  margin-bottom: 0.5em;
  color: yellow;
  display: block;
`;

function Subscribe() {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setStatus("ERROR");
      setErrorMessage("Email is required.");
      return;
    }

    setIsSubmitting(true);

    emailjs
      .send(
        `service_dwyc0q8`,
        `template_ie6y159`,
        { email },
        `F_7VU0KYfYFRlV472`
      )
      .then(
        (result) => {
          setStatus("SUCCESS");
          setIsSubmitting(false);
          console.log(result.text);
        },
        (error) => {
          setStatus("ERROR");
          setIsSubmitting(false);
          console.log(error.text);
        }
      );
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    if (!/^[A-Za-z0-9@._%+-]+$/i.test(value) && value.length > 0) {
      setErrorMessage("Invalid email address.");
      return;
    }

    setEmail(value);
  };

  return (
    <SubscribeWrapper>
      {status === "SUCCESS" && (
        <>
          <p>
            Welcome aboard{email ? `, ${email}` : ""}{" "}
            <span role="img" aria-label="Ship">
              🚢
            </span>
          </p>
          <p>Please check your inbox to confirm the subscription!</p>
        </>
      )}
      {status === "ERROR" && (
        <>
          <p>Oops, something went wrong...</p>
          <ButtonWrapper>
            Please,&nbsp;
            <Button onClick={() => setStatus(null)}>try again</Button>
          </ButtonWrapper>
        </>
      )}
      {status === null && (
        <Form onSubmit={handleSubmit}>
          <Title>Join the Presale/Whitelist here:</Title>
          <FormGroup>
            <Input
              aria-label="Your email address"
              name="email_address"
              placeholder="Your email address"
              required
              type="email"
              onChange={handleEmailChange}
              value={email}
            />
          </FormGroup>
          <ButtonWrapper>
            <Button disabled={isSubmitting}>Subscribe</Button>
          </ButtonWrapper>
          {errorMessage ? <Message>{errorMessage}</Message> : null}
        </Form>
      )}
    </SubscribeWrapper>
  );
}

export default Subscribe;
