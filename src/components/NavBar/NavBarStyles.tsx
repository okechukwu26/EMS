import styled from 'styled-components'
import { IoMenuSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

export const ImgSpan = styled.span<{ $step?: number; $class?: number }>`
  @media screen and (max-width: 840px) {
    margin-left: -32px;
    padding-left: 0px;
     color: ${(props) =>  props.$step === props.$class ? "green" : ""}
  }
`

export const Span = styled.span<{ $step?: number; $class?: number }>`
  @media screen and (max-width: 840px) {
    padding-left: 16px;
    font-family: Work Sans;
     color: ${(props) =>  props.$step === props.$class ? "green" : ""}
  }
`;
export const NavbarContainer = styled.div`
  display: flex;
  height: 68px;
  width: 100%;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;
export const Hamburger = styled(IoMenuSharp)`
  display: none;
  @media screen and (max-width: 840px) {
    display: block;
    padding-left: 16px;
    font-size: 1.5rem;
  }
`;
export const CloseHamburger = styled(IoMdClose)`
  display: none;
  @media screen and (max-width: 840px) {
    display: block;
    margin: -2.5rem 0 0 8rem;
    font-size: 1.2rem;
    color: #000;
  }
`;
export const NavBarMenu = styled.nav<{ $sidebar: boolean }>`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 0px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
 

  flex-grow: 1;
  // background-color: white;
 
  width: 250px;
  height: 100vh;
  
  position: fixed;
  z-index: 100;
  top: 0;
  left: ${(props) =>
    props.$sidebar
      ? "0"
      : "-100%"}; /* Initially hides the sidebar off-screen */
  transition: ${(props) =>
    props.$sidebar ? "350ms" : "850ms"}; /* Adds transition effects */
`;
export const NavText = styled.li<{ $class?: number; $step: number }>`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 0px;
  list-style: none;
  height: 30px;
  font-family: Work Sans;
background: ${(props) =>
    props.$step === props.$class ? "" : " #fff"};
    // border-radius: ${(props) => (props.$step === props.$class ? "10px" : "")};
  &:hover {
    background: ${(props) =>
      props.$step === props.$class ? "fff" : " #fff"};
    cursor: pointer;
    }
 
   border-right: ${(props) =>
    props.$class === props.$step && "4px solid #27ae60"};
      padding: 0.5rem 1rem;
  height: 2.2rem;
  margin: 0.5rem 1rem;
  &:hover {
    background: #f5f5f5;
    cursor: pointer;
  }
`;

export const List = styled.ul`
  width: 100%;
`;
export const NavIcon = styled.li`
  background-color: white;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
export const Anchor = styled.a`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
  font-family: Work Sans;
`;
export const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  padding: 5px;
  border-radius: 50px;
  width: 50%;
  margin-left: 1rem;
  @media screen and (max-width: 840px) {
    margin-left: 0;
  }
`;

export const Search = styled(CiSearch)`
  font-size: 1rem;
  padding: 0 0 0 1.5rem;
`;

export const Input = styled.input`
  border: none;

  padding: 5px 0px;
  font-family: Inter;
  font-weight: 400;
  font-size: 12px;
  width: 80%;
  font-family: Work Sans;
  background: #f9fafb;
  &:focus {
    outline: none;
    border-color: transparent;
  }
  &:placeholder {
    font-size: 12px;
  }
  @media screen and (max-width: 430px) {
    padding: 5px 5px 5px 10px;
  }
  @media screen and (max-width: 840px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
`;
export const Close = styled(IoClose)`
  font-size: 1rem;
  color: green;
  padding-right: 1.5rem;
`;
export const Notification = styled(IoMdNotificationsOutline)`
  font-size: 1rem;
  margin-right: 20px;
`;
export const AvatarContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  padding-right: 3rem;
  @media screen and (max-width: 430px) {
    padding-right: 1rem;
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 2rem;
  @media screen and (max-width: 430px) {
    margin-right: 0rem;
  }
`;
export const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;
export const Text = styled.p`
  font-size: 13px;
  padding: 0;
  margin: 3px;
  font-weight: 100;
  margin-left: 10px;
  font-family: Work Sans;
  @media screen and (max-width: 840px) {
    display: none;
    margin-left: 0px;
  }
`;