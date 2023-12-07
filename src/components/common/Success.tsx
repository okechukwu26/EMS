import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { LiaTimesCircle } from "react-icons/lia";

interface Props {
  text: string;
  success?: boolean;
}
const Success = ({ text, success }: Props) => {
  console.log(text, success);
  return (
    <Div>
      <Section>
        {success ?<AiOutlineCheckCircle size={40} color="#27ae60" /> :    <LiaTimesCircle size={40} color="red" />}
        <Text>{text}</Text>
        <Button $success={success}>Continue</Button>
      </Section>
    </Div>
  );
};

const Div = styled.div`

  flex: 1;
  position: absolute;
  top: 1rem;
  left:20rem;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0 transparent;
  transition: box-shadow 3s ease;
  z-index:100;
  @media screen and (max-width:840px){
left:0;
width: -webkit-fill-available;

  }

`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 10rem;
  width: 15rem;
  margin: 0 auto;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;
const Text = styled.p`
  font-size: 1.3rem;
  color: #101828;
  font-family: Lato;
  margin-top:5px
`;
const Button = styled.button<{$success?:boolean}>`
  background: ${props => props.$success === true ?"#27ae60":"#eb5757"};
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: #fff;
  margin-top:10px
`;


export default Success;
