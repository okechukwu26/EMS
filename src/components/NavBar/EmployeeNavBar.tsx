
import logo from "../../assets/images/avatar.jpeg";
import { NavbarContainer, InputContainer, ImgSpan, Span , Input, Search, List, Anchor, 
  NavIcon, Hamburger, CloseHamburger, NavBarMenu, NavText, Close, Notification, AvatarContainer,
Profile, Avatar, Text } from './NavBarStyles'
import { useEffect, useState } from "react";
import decagon from "../../assets/images/decagon.png"
import { MdDashboard } from "react-icons/md";
import { IoFolderOpen } from "react-icons/io5";
import { AiOutlineLogout, AiTwotoneSetting } from "react-icons/ai";

interface Props {
 selectSidebar:(text:boolean) => void
  sidebar: boolean;
  selectStep: (bar: number) => void;
  step:number
}
interface User {
  firstName: string;
  lastName: string;
  role: string;
}

export const EmployeeNavBar = ({ sidebar, selectStep,step,selectSidebar }: Props) => {

  const data = [
    { title: "Dashboard", icon: <MdDashboard   />, cName: "nav-text" },
    { title: "Projects", icon: <IoFolderOpen />, cName: "nav-text" },
    { title: "Settings", icon:  <AiTwotoneSetting  />, cName: "nav-text" },
    { title: "Logout", icon:  <AiOutlineLogout  />, cName: "nav-text" },
  ];
  

  const [user, setUser] = useState({} as User);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <NavbarContainer>
     {!sidebar && <Hamburger onClick={selectSidebar} />}
    

       <NavBarMenu $sidebar={sidebar}>
        <List onClick={() => selectSidebar(!sidebar)}>
          <NavIcon>
          <img src={decagon} alt="decagon" />
            <Anchor>
            { sidebar && <CloseHamburger onClick={selectSidebar} />}
            </Anchor>
          </NavIcon>
          {data.map((item, index) => {
            return (
              <NavText key={index}  $class={index}
              $step={step}  onClick={() => selectStep(index)}>
                       <ImgSpan $step={step} $class={index}>{item.icon }</ImgSpan>
                <Span $step={step} $class={index}>{item.title}</Span>
              </NavText>
            );
          })}
        </List>
      </NavBarMenu>
   

       <InputContainer >
        <Search />
        <Input
          placeholder="Search..."
        
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