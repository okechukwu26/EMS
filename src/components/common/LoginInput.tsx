/* eslint-disable react-refresh/only-export-components */
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { Form1 } from "../../pages/loginPage";

interface Props {
  type: string;
  placeholder: string;
  name: "email" | "password";
  id: string;
  style: object;
  required?: boolean;
  register: UseFormRegister<Form1>;
}

const LoginInput = ({
  type,
  placeholder,
  name,
  id,
  style,
  required,
  register,
}: //useLogin, // Boolean flag to choose which function to use
// handleSubmit,
Props) => {
  //const inputProps = useLogin ? useFormLogin<Form>() : useFormRegister<Form>();
  return (
    <FormGroup>
      <Label htmlFor=""></Label>
      <InputForm
        type={type}
        // {...login(name)}
        {...register(name)}
        id={id}
        placeholder={placeholder}
        style={style}
        required={required}
      />
    </FormGroup>
  );
};

const FormGroup = styled.div`
  margin-bottom: 15px;
`;
const Label = styled.label`
  font-weight: bold;
  font-family: "poppins", sans-serif;
  margin-bottom: 5px;
`;
export const InputForm = styled.input`
  width: 100%;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;
export default LoginInput;
