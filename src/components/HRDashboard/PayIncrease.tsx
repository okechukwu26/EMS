/* eslint-disable @typescript-eslint/no-explicit-any */
import CarouselComponent from "../common/Carousel";
import styled from "styled-components";
import NavSearch from "./NavbarSeacrh";

import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

const PayIncrease = () => {
  const payRise = useSelector((state: any) => state.payRise);

  return (
    <>
      <Header>
        <PayRiseContainer>
          <Border />

          <Text>Pay Increase Request</Text>
        </PayRiseContainer>
      </Header>

      {payRise.searchPayRise.length === 0 || payRise.search.length === 0 ? (
        <CarouselComponent />
      ) : (
        <NavSearch/>
      )}
      <LoadingContainer>
        <ClipLoader
          color="green"
          loading={payRise.loadingPayRise && payRise.payRise.length === 0}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </LoadingContainer>
    </>
  );
};

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  margin-top: 10px;
  position: relative;
  @media screen and (max-width: 762px) {
    display: block; /* Set the desired width for smaller screens */
  }
`;
export const PayRiseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width:840px){
    justify-content:flex-start
  }
`;
export const Border = styled.div`
  width: 5px;
  height: 25px;
  border-radius: 5px;
  background: #34a853;
`;
export const Text = styled.h4`
  padding-left: 0.5rem;
  font-size: 28px;
  line-height: 33.3px;
  font-weight: 500;
  font-family: Work Sans;
  @media screen and (max-width: 762px) {
    font-size: 18px;
  }
`;
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  /* margin-left: 10rem; */
`;

export default PayIncrease;

//&#x20A6
