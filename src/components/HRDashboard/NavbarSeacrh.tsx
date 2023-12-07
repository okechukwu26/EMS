import styled from "styled-components";
import { PAYRISE } from "../DashboardContainer";
import ClipLoader from "react-spinners/ClipLoader";
import {
  ImageContainer,
  Image,
  Name,
  SubText,
  TaskContainer,
  Task,
  // PercentageContainer,
  // IconContainer,
  Amount,
  // Percentage,
  Button,
  ButtonText,
  // background,
} from "../common/Carousel";
import Success from "../common/Success";
// import {
//   CircularProgressbarWithChildren,
//   buildStyles,
// } from "react-circular-progressbar";
// import { BsCheck } from "react-icons/bs";
import "react-circular-progressbar/dist/styles.css";
import {useDispatch, useSelector} from "react-redux"
import {ApprovePayRise, DeclinePayRise} from "../../api/payRise"
import {useState, useEffect} from "react"

const NavbarSearch = () => {
  const dispatch = useDispatch()
  const payRise = useSelector((state:any) => state.payRise)
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  useEffect(() => {

  }, [dispatch, payRise.update, payRise.updateDecline, failure,success]);
  const handleSuccess = async (id: string) => {
    const info = {
      id,
      status: "Approved",
    };
    await ApprovePayRise(dispatch)(info);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  const handleFailure = async (id: string) => {
    const info = {
      id,
      status: "Rejected",
    };
    await DeclinePayRise(dispatch)(info);
    setFailure(true);
    setTimeout(() => {
      setFailure(false);
    }, 3000);
  };

  return (
    <Container>
         {success && <Success text="payRise Approved" success={true} />}
      {failure && <Success text="payRise Declined" success={false} />}
      {payRise.searchPayRise.map((item:PAYRISE, index) => (
        <Card key={index}>
          <ImageContainer>
              <Image src={item.user.image && item.user.image} alt="logo" />
            </ImageContainer>
            <Name>
              {item.firstName} {item.lastName}
            </Name>
            <SubText>{item.department}</SubText>
  

<TaskContainer>
              <div>
                <Task>Prev.Pay</Task>
                <Amount $color="101828">
                  &#x20A6;{item.currentPay.toLocaleString()}
                </Amount>
              </div>
              <div>
                <Task>New.Pay</Task>
                <Amount $color="#27AE60">
                  &#x20A6;{item.proposedPay.toLocaleString()}
                </Amount>
              </div>
            </TaskContainer>
          <TaskContainer>
          {item.status === "Pending" && (
                <>
                  <Button $background="#ECFDF3" $color="#32D583">
                    <ButtonText onClick={() => handleSuccess(item.id)}>
                      <ClipLoader
                        color="green"
                        loading={
                          payRise.loadingApproval &&
                          payRise.payRiseId === item.id
                        }
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      Approve
                    </ButtonText>
                  </Button>
                  <Button $background="#FEF3F2" $color="#F97066">
                    <ButtonText onClick={() => handleFailure(item.id)}>
                      <ClipLoader
                        color="#F97066"
                        loading={
                          payRise.loadingDecline &&
                          payRise.payRiseId === item.id
                        }
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      Decline
                    </ButtonText>
                  </Button>
                </>
              )}

              {item.status === "Rejected" || item.status === "Approved" ? (
                <Button
                  $status={true}
                  $background={
                    item.status === "Rejected" ? "#FEF3F2" : "#ECFDF3"
                  }
                  $color={item.status === "Rejected" ? "#F97066" : "#32D583"}
                >
                  <ButtonText> {item.status}</ButtonText>
                </Button>
              ) : null}
          </TaskContainer>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  padding: 10px;
  position:relative;
`;
const Card = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default NavbarSearch;
