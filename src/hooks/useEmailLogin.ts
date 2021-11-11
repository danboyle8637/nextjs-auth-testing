import { useState, useEffect } from "react";

import { formValidator, emailValidationRules } from "../utils/forms/validation";

interface InputValue {
  value: string;
  valid: boolean;
}

interface InputOptions {
  initial: boolean;
  touched: boolean;
}

export const useEmailLoginForm = () => {
  const [emailValue, setEmailValue] = useState<InputValue>({
    value: "",
    valid: false,
  });

  const [emailInputOptions, setEmailInputOptions] = useState<InputOptions>({
    initial: true,
    touched: false,
  });

  const [clearInput, setClearInput] = useState<boolean>(false);

  useEffect(() => {
    if (clearInput) {
      setEmailValue({ value: "", valid: false });
      setEmailInputOptions({ initial: true, touched: false });
    }

    setClearInput(false);
  }, [clearInput]);

  const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case "emailAddress": {
        const data = value.toLowerCase();
        const isValid = formValidator(data, emailValidationRules);
        setEmailValue({
          value: value,
          valid: isValid,
        });
        break;
      }
      default: {
        throw new Error(
          "You are using an input that you are not handling setting the value."
        );
      }
    }
  };

  const updateInputOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    switch (name) {
      case "emailAddress": {
        setEmailInputOptions(({ touched }) => {
          return {
            initial: false,
            touched: !touched,
          };
        });
        break;
      }
      default: {
        throw new Error(
          "You are using an input that you have not declared options to change it's appearance. Fix it."
        );
      }
    }
  };

  return {
    emailValue,
    emailInputOptions,
    updateInputValue,
    updateInputOptions,
    setClearInput,
  };
};
