/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
//import logo from "../../assets/images/avatar.j
// import {
//   CircularProgressbarWithChildren,
//   buildStyles,
// } from "react-circular-progressbar";


import "react-circular-progressbar/dist/styles.css";

import { ApprovePayRise, DeclinePayRise, getPayRise } from "../../api/payRise";
import { useSelector, useDispatch } from "react-redux";
import Success from "./Success";

export const background = (tasks: number) =>
  tasks <= 35 ? "#F04438" : tasks < 75 ? "#FAC515" : "#219653";

const CarouselComponent = () => {
  const payRise = useSelector((state: any) => state.payRise);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  useEffect(() => {
    getPayRise(dispatch);
  }, [dispatch, payRise.update, payRise.updateDecline, failure]);
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 5,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };
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
  console.log(payRise);
  interface PAYRISE {
    firstName: string;
    lastName: string;
    image: string;
    id: string;
    department: string;
    currentPay: number;
    proposedPay: number;
    status: string;
    user:{
      image:string
    }
  }


  return (
    <Container>
{ success && <Success text="pay rise Approved" success={true} />}
      {failure && <Success text="pay rise Declined" success={false} />}
      <Carousel
        additionalTransfrom={0}
        autoPlaySpeed={2000}
        centerMode={false}
        className=""
        containerClass="container"
        autoPlay
        dotListClass=""
        draggable
        focusOnSelect={false}
        arrows={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        customLeftArrow={null}
        customRightArrow={null}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {payRise.payRise.map((item: PAYRISE) => (
          <Card key={item.id}>
            <ImageContainer>
              <Image src={item.user.image && item.user.image } alt="logo" />
            </ImageContainer>
            <Name>
              {item.firstName} {item.lastName}
            </Name>
            <SubText>{item.department}</SubText>
            {/* <TaskContainer>
              <Task>{item.tasks} Tasks</Task>
              <PercentageContainer>
                <IconContainer>
                  <CircularProgressbarWithChildren
                    value={item.tasks}
                    styles={buildStyles({
                      strokeLinecap: "round",

                      pathColor: `${background(item.tasks)}`,
                    })}
                  >
                    <BsCheck
                      color={
                        item.tasks < 45
                          ? "#F04438"
                          : item.tasks < 75
                          ? "#FAC515"
                          : "#219653"
                      }
                    />
                  </CircularProgressbarWithChildren>
                </IconContainer>
                <Percentage>{item.tasks}% </Percentage>
              </PercentageContainer>
            </TaskContainer> */}

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
                        size={10}
                        aria-label="Loading Spinner"
                        data-testId="loader"
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
      </Carousel>
    </Container>
  );
};
const Container = styled.div`
  width: 65rem;
position:relative;

  @media screen and (max-width: 762px) {
    width: 13rem;
    margin: 0 auto; /* Set the desired width for smaller screens */
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 30rem; /* Adjust the width for tablets as needed */
  }
`;

export const Card = styled.div`
  background: #fff;
  height: 220px;
  border-radius: 2px;
  border: 1px solid #d0d5dd;
  margin: 0 0.5rem;

  /* box-shadow:0 0 10px rgba(0,0,0,0.2); */
  /* transition: all 0.2s ease-in-out; */
  /* &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  } */
`;
export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 30px;
  height: 100%;
`;
export const ImageContainer = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 30px !important;
  margin: 0 auto;
  border: 4px solid #d1fadf;
  margin-top: 0.6rem;
`;
export const Name = styled.h4`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  margin: 0;
  padding: 0;
  font-family: Work Sans;
  height: 17px;
`;
export const SubText = styled.h4`
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: Lato;
  height: 14px;
  font-family: Work Sans;
  color: grey;
`;
export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  margin-top: 1rem;
`;
export const Task = styled.p`
  font-weight: 300;
  font-size: 12px;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: Lato;
  height: 14px;
  color: grey;
`;
export const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconContainer = styled.div`
  width: 20px;
  height: px;
`;
export const Percentage = styled.p`
  color: #101828;
  font-weight: 300;
  font-size: 12px;
  margin-left: 8px;
  font-family: Work Sans;
`;
export const Amount = styled.p<{ $color: string }>`
  margin: 3px 0 0 0;
  padding: 0;
  font-weight: 400;
  font-family: Work Sans;
  line-height: 16.8px;
  font-size: 14px;
  color: ${(props) => props.$color};
`;
export const Button = styled.button<{
  $background: string;
  $color: string;
  $status?: boolean;
}>`
  background: ${(props) => props.$background};
  color: ${(props) => props.$color};
  border-radius: 10px;
  padding: 2px 10px;
  border: none;
  margin: ${(props) => props.$status && "0 auto"};
`;
export const ButtonText = styled.p`
  font-size: 15px;
  font-weight: 400;
  line-height: 16px;
  font-family: Work Sans;
  padding: 0;
  margin: 10px 3px;
`;

export default CarouselComponent;
