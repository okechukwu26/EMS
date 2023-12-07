import styled from "styled-components";
import PayIncrease from "./PayIncrease";
import LeaveApproval from "./LeaveApproval";


const PayRise = () => {
  return (
    <Container>
      <PayIncrease  />
      <LeaveApproval />
    </Container>
  );
};

const Container = styled.div`
  margin-left: 1rem;
  margin-right: 3rem;
  margin-top: 0;
  @media screen and (max-width: 762px) {
    margin: 5px;
  }
`;

// const HeaderText = styled.div`
//   border-left: 5px solid #34a853;
//   border-left-radius: 5px;
// `;
// const Text = styled.h4`
//   padding-left: 0.5rem;
//   font-size: 1.3rem;
// `;

export default PayRise;
