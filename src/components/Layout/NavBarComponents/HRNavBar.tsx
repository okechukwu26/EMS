import React from 'react';
import styled from 'styled-components';

import { AiOutlineSearch } from "react-icons/ai";
import TrailingIconAsset from '../../../assets/navbarAssets/📍Trailing Icon.png'

const Navbar = () => {
  return (
    <ParentDiv>
      <SearchBarDiv>
        <AiOutlineSearchIcon />
        <SearchInput placeholder="search..." />
        <TrailingIcon src={TrailingIconAsset} alt='cancel button' />
      </SearchBarDiv>
      <ProfileNav>


      </ProfileNav>

    </ParentDiv>
  );
};

export default Navbar;

const ParentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: #ffffff;
  background: black;
  width: 100%;
  height: 34px;
  position: fixed;
  top: 0;
  padding: 7px 65px 7px 12px;
  border: 0px 0px 1px 0px;
`;

const SearchBarDiv = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 20px;
  border-radius: 16px;
  // border: 1px solid #000;
  padding: 0 5px;
  background: linear-gradient(0deg, #f9fafb, #f9fafb);
`;

const AiOutlineSearchIcon = styled(AiOutlineSearch)`
  font-size: 0.75rem;
  color: black;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  // flex: 1;
  height: 100%;
  width: 70%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.65rem;
  font-family: Lato;
  font-weight: 400;
  line-height: 9.5px;
  letter-spacing: 0em;
  text-align: left;

  &::placeholder {
    color: #000;

  }
`;

const TrailingIcon = styled.img`
width: 12px;
height: 12px;
// top: 8px;
// left: 464px;
padding: 2.5px;

`

const ProfileNav = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: red;
  width: 30%;
  height: 20px;

`