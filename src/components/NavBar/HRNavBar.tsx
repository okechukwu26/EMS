import logo from "../../assets/images/avatar.jpeg";
import { FormEvent, useState } from "react";
import decagon from "../../assets/images/decagon.png";
import { handleLogout } from "../../utils";
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { IoFolderOpen } from "react-icons/io5";
import { HiCash } from "react-icons/hi";
import { User } from "../DashboardContainer/Navbar";
import { AiOutlineLogout, AiTwotoneSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { NavbarContainer, InputContainer, ImgSpan, Span , Input, Search, List, Anchor, 
  NavIcon, Hamburger, CloseHamburger, NavBarMenu, NavText, Close, Notification, AvatarContainer,
Profile, Avatar, Text } from './NavBarStyles'

interface Props {
  onChange: (data: string) => void;
  changeSearch: (data: string) => void;
  sidebar: boolean;
  selectStep: (bar: number) => void;
  step: number;
  selectSidebar: (item: boolean) => void;
  user: User;
}

export const HRNavBar = ({
  sidebar,
  selectStep,
  onChange,
  changeSearch,
  step,
  selectSidebar,
  user,
}: Props) => {
  const [search, setSearch] = useState("");

  // size={20} color={step === 0 ? "#27ae60" : "grey"}
  const data = [
    { title: "Dashboard", icon: <MdDashboard />, cName: "nav-text" },
    { title: "Employee", icon: <IoIosPeople />, cName: "nav-text" },
    { title: "Projects", icon: <IoFolderOpen />, cName: "nav-text" },
    { title: "Payroll", icon: <HiCash />, cName: "nav-text" },
    { title: "Settings", icon: <AiTwotoneSetting />, cName: "nav-text" },
    { title: "Logout", icon: <AiOutlineLogout />, cName: "nav-text" },
  ];
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
    changeSearch(search);
    onChange(search);
  };

  return (
    <NavbarContainer>
      {!sidebar && <Hamburger onClick={selectSidebar} />}

      <NavBarMenu $sidebar={sidebar}>
        <List onClick={() => selectSidebar(!sidebar)}>
          <NavIcon>
            <img src={decagon} alt="decagon" />
            <Anchor>
              {sidebar && <CloseHamburger onClick={selectStep} />}
            </Anchor>
          </NavIcon>
          {data.map((item, index) => {
            return (
              <NavText
                key={item.title}
                $class={index}
                $step={step}
                onClick={() => {
                  if (item.title === "Logout") {
                    handleLogout(navigate);
                  }
                  selectStep(index);
                }}
                
              >
                <ImgSpan $step={step} $class={index}>{item.icon }</ImgSpan>
                <Span $step={step} $class={index}>{item.title}</Span>
              </NavText>
            );
          })}
        </List>
      </NavBarMenu>

      <InputContainer onSubmit={handleSubmit}>
        <Search />
        <Input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Close />
      </InputContainer>

      <Profile>
        <Notification />
        <AvatarContainer>
          <Avatar src={logo} alt="avatar" />
        </AvatarContainer>
        <div>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
          <Text>{user.role}</Text>
        </div>
      </Profile>
    </NavbarContainer>
  );
};