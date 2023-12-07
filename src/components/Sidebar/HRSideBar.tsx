import React from 'react'
import styled from "styled-components";
import Logo from "../../assets/images/decagon.png";
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { IoFolderOpen } from "react-icons/io5";
import { HiCash } from "react-icons/hi";
import {handleLogout} from "../../utils"
import { AiOutlineLogout, AiTwotoneSetting } from "react-icons/ai";
import {useNavigate} from "react-router-dom"

interface Props {
  step: number;
  selectStep: (step: number) => void;
}

export const HRSideBar = ({ step, selectStep }: Props) => {
const list = [
    {
      name: "Dashboard",
      icon: <MdDashboard  size={20} color={step === 0 ? "#27ae60" : "grey"} />,
    },
    {
      name: "Employee",
      icon: <IoIosPeople size={20} color={step === 1 ? "#27ae60" : "grey"} />,
    },
 
    
    {
      name: "Settings",
      icon: (
        <AiTwotoneSetting size={20} color={step === 2 ? "#27ae60" : "grey"} />
      ),
    },
    {
      name: "Logout",
      icon: (
        <AiOutlineLogout size={20} color={step === 3 ? "#27ae60" : "grey"} />
      ),
    },
  ];
  const navigate = useNavigate()

  return (
    <Container>
      <Image src={Logo} alt="decagon" />

      {list.map((item, index) => (
        <Link
          key={item.name}
          $class={index}
          $step={step}
          onClick={() => {
            if(item.name === "Logout"){
              handleLogout(navigate)
              return
            }
            selectStep(index)}}
        >
          {item.icon}
          <Text $class={index} $step={step}>
            {item.name}
          </Text>
        </Link>
      ))}
    </Container>
  );
}


const Container = styled.div`
  background: #fff;
  padding: 0;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  height: 100vh;
  flex-grow: 1;
`;

const Image = styled.img`
  padding: 1.5rem 0 0 0.5rem;
  margin-left: 1.5rem;
  
`;
const Link = styled.div<{ $class?: number; $step: number }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
const Text = styled.p<{ $class?: number; $step: number }>`
  flex: 1;
  color: ${(props) => (props.$class === props.$step ? "#27ae60" : "#101828")};
  text-decoration: ${(props) =>
    props.$class === props.$step ? "underline" : ""};
  font-weight: 600;
  font-size: 15px;
  padding-left: 1.2rem;
  text-decoration: none;
  font-family: Work Sans;

`;
