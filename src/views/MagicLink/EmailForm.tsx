import styled from "styled-components";

import { UnderlineInput } from "../../components/forms/inputs/textInputs/UnderlineInput";
import { useEmailLoginForm } from "../../hooks/useEmailLogin";
import { RippleFormButton } from "../../components/butons/RippleFormButton";

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  width: 100%;
`;

const ValueCheck = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: #e1e1e1;
  text-transform: uppercase;
  letter-spacing: 0.16rem;
`;

export const EmailForm = () => {
  const {
    emailValue,
    emailInputOptions,
    updateInputValue,
    updateInputOptions,
  } = useEmailLoginForm();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const body = {
      email: emailValue.value,
    };

    console.log(body);
    // hit worker
  };

  return (
    <FormContainer onSubmit={handleLogin}>
      <ValueCheck>{emailValue.value}</ValueCheck>
      <UnderlineInput
        inputType="text"
        inputName="emailAddress"
        labelName="Email Address"
        labelFor="emailAddress"
        placeholder="Enter your email address..."
        value={emailValue.value}
        valid={emailValue.valid}
        initial={emailInputOptions.initial}
        touched={emailInputOptions.touched}
        updateInputValue={updateInputValue}
        updateInputOptions={updateInputOptions}
      />
      <RippleFormButton
        width={400}
        height={52}
        backgroundColor="#1FECFF"
        rippleColor="#C4F9FE"
        labelColor="#1B1B2D"
        buttonType="submit"
      >
        Login Using Magic
      </RippleFormButton>
    </FormContainer>
  );
};
