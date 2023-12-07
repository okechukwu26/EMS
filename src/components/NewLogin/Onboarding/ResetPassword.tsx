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



interface PasswordResetFormProps {
  
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = (props) => {
  const { switchToLogin
 } = useContext<AccountContextType>(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>

        <Input type="email" placeholder="Email" />

      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Reset Password</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have your credentials?
        <BoldLink href="#" onClick={switchToLogin
        }>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
