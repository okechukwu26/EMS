import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./commonStyles";
import { Marginer } from "../Margins/index";
import { AccountContext, AccountContextType } from "./accountContext";

interface LoginFormProps {
  
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { switchToReset } = useContext<AccountContextType>(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forgot your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Forgot Password?{" "}
        <BoldLink href="#" onClick={switchToReset}>
          Reset Password
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
