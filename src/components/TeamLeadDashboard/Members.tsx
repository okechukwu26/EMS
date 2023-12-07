import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "../../api/employee";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import Avatar from "../../assets/images/avatar.png";
interface RootState {
    // Define properties for different slices of your Redux store
    employee: EmployeeState;
    // Other slices if available...
  }
  
  // Define a type for the employee slice state
  interface EmployeeState {
    loadingMember: boolean;
    members: Member[];
    // Other properties specific to the employee slice...
  }
  
  // Define a type for a single member
  interface Member {
    image:string
    id:string
    // Other properties of a member...
  }

const Members = ({text}:{text?:boolean}) => {
  const dispatch = useDispatch();

  const employee = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    getMembers(dispatch);
  }, []);

  return (
    <>
      {!text && <Text>Members</Text>}
      <ImageHeader>
        {employee.loadingMember ? (
          <ClipLoader
            color="#34a853"
            loading={employee.loadingMember}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            {employee.members.map((member, index: number) => {
              return (
                <ImageContainer $text={text} key={member.id} $zIndex={index + 5}>
                  <Image
                    src={member.image ? member.image : Avatar}
                    alt="member"
                  />
                </ImageContainer>
              );
            })}{" "}
          </>
        )}
      </ImageHeader>
          
    </>
  );
};
export const ErrorText=styled.p`
color: red;
  font-weight: 100;
  font-size:1rem;
  font-family: Work Sans;
`

export const Text = styled.p`
   font-family: Work Sans;
  font-weight: 400;
  size: 14px;
  line-height: 16.8px;
  @media screen and (max-width:840px){
    text-align:center
  }
  /* margin-top:2rem; */
`;
const ImageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: -10px;
`;
const ImageContainer = styled.div<{ $zIndex: number, $text?:boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  z-index: ${(props) => props.$zIndex};
  margin-left: ${(props) => props.$zIndex > 5 && "-10px"};
  /* margin-right:${props => props.$text && "1rem"} */
`;
export const Image = styled.img`
  width: 30px;
  height: 30px;
object-fit:cover;
  border-radius: 15px;
 
`;



export default Members;
