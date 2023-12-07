import styled from "styled-components";
import { LiaTimesCircle } from "react-icons/lia";

const Failure = () => {
  return (
    <Div>
      <Section>
        <LiaTimesCircle size={40} color="red" />
        <Text>Declined!</Text>
        <Button>Continue</Button>
      </Section>
    </Div>
  );
};

const Div = styled.div`
  background: grey;
  width: 100%;
  height: 100vh;
  flex: 1;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
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
`;
const Text = styled.p`
  font-size: 1.3rem;
  color: #101828;
  font-family: Lato;
`;
const Button = styled.button`
  background: #eb5757;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: #fff;
`;

export default Failure;
