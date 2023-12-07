/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { useEffect } from "react";
import arrows from "../../assets/images/arrow-left.svg";
import clip from "../../assets/images/clip.svg";
import Eko from "../../assets/images/Eko.svg";
import link from "../../assets/images/link.svg";
import Comment from "../../assets/images/Comment.svg";
import Plus from "../../assets/images/plus.svg";
import { OneEmployee } from "../../api/employee";
import { useDispatch, useSelector } from "react-redux";


const Employee = ({
  selectStep,
  employeeId,
}: {
  selectStep: (step: number) => void;
  employeeId: string;
}) => {

 
  const dispatch = useDispatch()

  const employee = useSelector((state: any) => state.employee.employees);

  useEffect(() => {
    OneEmployee(dispatch, employeeId);
  }, []);

  return (
    <div>
      <Container>
        <Main>
          <Holder>
            <TopWrap>
              <TopWrap1>
                <img src={arrows} alt="arrow" onClick={() => selectStep(0)} />

                <H1>{employee[0].firstName} {employee[0].lastName}</H1>
              </TopWrap1>
            </TopWrap>
            <Wrapper>
              <Avatar>
                <img
                  src={employee[0].image}
                  alt="avatar"
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    border: "4px solid #D1FADF",
                    objectFit:"cover"
                  }}
                />
                {/* {employee.image && <img src={employee.image} alt="Employee" />} */}
              </Avatar>
              <Text>Talent Manager</Text>
            </Wrapper>
            <Break>
              <Break1>Personal Information </Break1>

              <Break2>Employment Information</Break2>

              <Break3>Bank Information</Break3>
            </Break>

            <Dark>
              <Table>
                <thead>
                  <tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email Address</Th>
                    <Th>Phone Number</Th>
                    <Th>Date of Birth</Th>
                  </tr>
                </thead>
                <tbody>
                  {employee.map((data: any, index: number) => (
                    <tr key={index}>
                      <Td>{data.firstName}</Td>
                      <Td>{data.lastName}</Td>
                      <Td>{data.email}</Td>
                      <Td>{data.phone}</Td>
                      <Td>{data.DateOfBirth}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Dark>

            <Bank>
              <Upcoming>
                <div
                  style={{ marginBottom: "50px", display: "flex", gap: "12px" }}
                >
                  <h3>Upcoming</h3>
                  <p>(5)</p>
                </div>

                <Dark5>
                  <Darkone>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div>
                        <img
                          src={Eko}
                          alt="tags"
                          style={{
                            borderRadius: "24px",
                            width: "24px",
                            height: "24px",
                            paddingTop: "0px",
                          }}
                        />
                      </div>
                      <div>
                        <p style={{ padding: "0px", margin: "0" }}>
                          Eko Hotels & Suites
                        </p>
                      </div>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_46_20999)">
                          <path
                            d="M8.30001 5.33341C9.03334 5.33341 9.63334 4.73341 9.63334 4.00008C9.63334 3.26675 9.03334 2.66675 8.30001 2.66675C7.56667 2.66675 6.96667 3.26675 6.96667 4.00008C6.96667 4.73341 7.56667 5.33341 8.30001 5.33341ZM8.30001 6.66675C7.56667 6.66675 6.96667 7.26675 6.96667 8.00008C6.96667 8.73341 7.56667 9.33341 8.30001 9.33341C9.03334 9.33341 9.63334 8.73341 9.63334 8.00008C9.63334 7.26675 9.03334 6.66675 8.30001 6.66675ZM8.30001 10.6667C7.56667 10.6667 6.96667 11.2667 6.96667 12.0001C6.96667 12.7334 7.56667 13.3334 8.30001 13.3334C9.03334 13.3334 9.63334 12.7334 9.63334 12.0001C9.63334 11.2667 9.03334 10.6667 8.30001 10.6667Z"
                            fill="#323232"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_46_20999">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.300049)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </Darkone>

                  <div>
                    <Grant>
                      <Grant1>
                        <div style={{ color: "red" }}>
                          <High>HIGH</High>
                        </div>
                        <div style={{ color: "gray" }}>Starts in 24 days</div>
                      </Grant1>
                      <Grant2>
                        <div>
                          <img src={clip} alt="tags" />
                        </div>
                        <div>10</div>
                      </Grant2>
                    </Grant>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 16px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "2px",
                      }}
                    >
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <div>
                        <img
                          src={Plus}
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            color: "#34A853",
                            background: "#D1FADF",
                            border: "0.3px solid #D1FADF",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div>
                        <img src={Comment} alt="tags" />
                      </div>
                      <div>4</div>
                      <div>
                        <img src={link} alt="tags" />
                      </div>
                      <div>2</div>
                    </div>
                  </div>
                </Dark5>
              </Upcoming>
              <Ongoing>
                <div
                  style={{ marginBottom: "50px", display: "flex", gap: "12px" }}
                >
                  <h3>Ongoing</h3>
                </div>
                <Dark5>
                  <Darkone>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div>
                        <img
                          src={Eko}
                          alt="tags"
                          style={{
                            borderRadius: "24px",
                            width: "24px",
                            height: "24px",
                            paddingTop: "0px",
                          }}
                        />
                      </div>
                      <div>
                        <p style={{ padding: "0px", margin: "0" }}>
                          Eko Hotels & Suites
                        </p>
                      </div>
                    </div>
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM2.04 12C2.04 17.5008 6.49924 21.96 12 21.96C17.5008 21.96 21.96 17.5008 21.96 12C21.96 6.49924 17.5008 2.04 12 2.04C6.49924 2.04 2.04 6.49924 2.04 12Z"
                          fill="#D1FADF"
                        />
                        <path
                          d="M3.51472 3.51472C1.5516 5.47783 0.329905 8.0609 0.0577833 10.8238C-0.214338 13.5867 0.479955 16.3585 2.02236 18.6668C3.56477 20.9752 5.85986 22.6774 8.51658 23.4833C11.1733 24.2892 14.0273 24.149 16.5922 23.0866C19.1571 22.0241 21.2743 20.1052 22.5831 17.6568C23.8918 15.2083 24.311 12.3818 23.7694 9.65892C23.2278 6.936 21.7588 4.48512 19.6127 2.72388C17.4666 0.962635 14.7763 1.53343e-06 12 0L12 2.04C14.3043 2.04 16.5373 2.83899 18.3186 4.30082C20.0998 5.76265 21.3191 7.79688 21.7686 10.0569C22.2182 12.3169 21.8702 14.6629 20.7839 16.6951C19.6977 18.7273 17.9404 20.32 15.8115 21.2018C13.6826 22.0837 11.3138 22.2 9.10876 21.5311C6.90369 20.8622 4.99876 19.4494 3.71856 17.5335C2.43836 15.6175 1.8621 13.317 2.08796 11.0237C2.31382 8.73055 3.32783 6.5866 4.95722 4.95722L3.51472 3.51472Z"
                          fill="#219653"
                        />
                        <g clip-path="url(#clip0_46_20846)">
                          <path
                            d="M10.5 14.085L8.41499 12L7.70499 12.705L10.5 15.5L16.5 9.49998L15.795 8.79498L10.5 14.085Z"
                            fill="#219653"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_46_20846">
                            <rect
                              width="12"
                              height="12"
                              fill="white"
                              transform="translate(6 6)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </Darkone>

                  <div>
                    <Grant>
                      <Grant1>
                        <div style={{ color: "orange" }}>
                          <High>HIGH</High>
                        </div>
                        <div style={{ color: "gray" }}>Due in 6 days</div>
                      </Grant1>
                      <Grant2>
                        <div>
                          <img src={clip} alt="tags" />
                        </div>
                        <div>10/10</div>
                      </Grant2>
                    </Grant>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "0 16px",
                    }}
                  >
                    <div>Progress</div>
                    <div>100%</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 16px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "2px",
                      }}
                    >
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <div>
                        <img
                          src={Plus}
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            color: "#34A853",
                            background: "#D1FADF",
                            border: "0.3px solid #D1FADF",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div>
                        <img src={Comment} alt="tags" />
                      </div>
                      <div>4</div>
                      <div>
                        <img src={link} alt="tags" />
                      </div>
                      <div>2</div>
                    </div>
                  </div>
                </Dark5>
              </Ongoing>
              <Completed>
                <div
                  style={{ marginBottom: "50px", display: "flex", gap: "12px" }}
                >
                  <h3>Completed</h3>
                </div>
                <Dark5>
                  <Darkone>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div>
                        <img
                          src={Eko}
                          alt="tags"
                          style={{
                            borderRadius: "24px",
                            width: "24px",
                            height: "24px",
                            paddingTop: "0px",
                          }}
                        />
                      </div>
                      <div>
                        <p style={{ padding: "0px", margin: "0" }}>
                          Eko Hotels & Suites
                        </p>
                      </div>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_46_20999)">
                          <path
                            d="M8.30001 5.33341C9.03334 5.33341 9.63334 4.73341 9.63334 4.00008C9.63334 3.26675 9.03334 2.66675 8.30001 2.66675C7.56667 2.66675 6.96667 3.26675 6.96667 4.00008C6.96667 4.73341 7.56667 5.33341 8.30001 5.33341ZM8.30001 6.66675C7.56667 6.66675 6.96667 7.26675 6.96667 8.00008C6.96667 8.73341 7.56667 9.33341 8.30001 9.33341C9.03334 9.33341 9.63334 8.73341 9.63334 8.00008C9.63334 7.26675 9.03334 6.66675 8.30001 6.66675ZM8.30001 10.6667C7.56667 10.6667 6.96667 11.2667 6.96667 12.0001C6.96667 12.7334 7.56667 13.3334 8.30001 13.3334C9.03334 13.3334 9.63334 12.7334 9.63334 12.0001C9.63334 11.2667 9.03334 10.6667 8.30001 10.6667Z"
                            fill="#323232"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_46_20999">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.300049)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </Darkone>

                  <div>
                    <Grant>
                      <Grant1>
                        <div style={{ color: "red" }}>
                          <High>HIGH</High>
                        </div>
                        <div style={{ color: "gray" }}>Starts in 24 days</div>
                      </Grant1>
                      <Grant2>
                        <div>
                          <img src={clip} alt="tags" />
                        </div>
                        <div>10</div>
                      </Grant2>
                    </Grant>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 16px",
                      paddingTop: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "2px",
                      }}
                    >
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <Imgs>
                        <img
                          src="https://i.pravatar.cc/150?img=3"
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            border: "0.3px solid blue",
                          }}
                        />
                      </Imgs>
                      <div>
                        <img
                          src={Plus}
                          alt="avatar"
                          style={{
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            color: "#34A853",
                            background: "#D1FADF",
                            border: "0.3px solid #D1FADF",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div>
                        <img src={Comment} alt="tags" />
                      </div>
                      <div>4</div>
                      <div>
                        <img src={link} alt="tags" />
                      </div>
                      <div>2</div>
                    </div>
                  </div>
                </Dark5>
              </Completed>
            </Bank>
          </Holder>
        </Main>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 18rem auto auto auto;
  grid-gap: 10px;
  background-color: #f9fafb;
  z-index: -10;

  @media (max-width: 430px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 830px) {
    grid-template-columns: 1fr;
  }
`;
const Main = styled.div`
  grid-column-end: span 3;
`;

const Holder = styled.div`
  margin: 24px 131px 24px 38px;
`;
const Break = styled.div`
fontFamily: "Work Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  color: #34a853;
  align-items: center;
  padding: 0px 24px;
  margin-top: 15px;
  gap: 20px;
  width: 710px;
  border-bottom: 1px solid var(--outline, rgba(0, 0, 0, 0.12));
`;

const Break1 = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 48px;
  width: 155px;
  padding: 12px;
  background: white;
  border-radius: 20px 20px 0 0;
`;
const Break2 = styled.div`
  height: 48px;
  width: 204px;
  color: gray;
  padding: 12px 24px;
`;
const Break3 = styled.div`
  height: 48px;
  width: 204px;
  color: gray;
`;

const TopWrap = styled.div`
  width: 1000px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 12px, 24px, 12px, 16px;
  gap: 24px;
  margin-bottom: 30px;

  @media screen and (max-width: 430px) {
    flex-direction: column;
  }

  @media screen and (max-width: 830px) {
    flex-direction: column;
  }
`;
const H1 = styled.h1`
  padding-top: 0;
  margin-top: 0;
  font-size: 24px;
  line-height: 33.6px;
  font-family: Work Sans;

  @media screen and (max-width: 430px) {
    font-size: 10px;
  }
`;

const TopWrap1 = styled.div`
  display: flex;
  height: 34px;
  margin-top: 20px;
  gap: 16px;
`;


const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.p`
  color: #000000;
  font-family: Work Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const Wrapper = styled.div`
  display: flex;
  height: 125px;
  width: 171px;
  padding: 0px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 8px;
`;

const Dark = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 30px;
  align-items: flex-start;

  overflow-x: auto;
`;

const Dark5 = styled.div`
  width: 100%;
  padding: 24px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  border: 0.5px solid #eaecf0;
  background: #fff;
  margin-bottom: 24px;

  @media (max-width: 420px) {
    width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: 24px;
  }
`;
const Darkone = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 24px;
`;

const Th = styled.th`
  color: #98a2b3;
   font-family: Work Sans;;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  font-size: 14px;
  padding-right: 24px;
`;

const Td = styled.td`
 font-family: Work Sans;;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #101828;
`;

const Bank = styled.div`
  display: flex;
  width: 100%;
  // align-items: flex-start;
  gap: 24px;

  @media (max-width: 430px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Upcoming = styled.div`
  width: 317px;
  margin-top: 6px;
  align-items: center;
  gap: 20px;
  // align-self: stretch;
`;

const Ongoing = styled.div`
  width: 317.29999px;
  align-items: center;
  gap: 24px;
  // align-self: stretch;
`;

const Completed = styled.div`
  width: 317.29999px;
  align-items: center;
  gap: 24px;
  // align-self: stretch;
`;



const Grant = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 2px;
  background: #fff;
  //box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  padding: 0 16px;
  font-weight: 500;
`;
const Grant1 = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 5px;
`;
const Grant2 = styled.div`
  display: flex;
  margin-bottom: 24px;
  margin-top: 5px;
  gap: 4px;
`;
const High = styled.div`
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
  font-family: Lato;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 8px;
`;
const Imgs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -5px;
`;
const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  text-align: left;
`;

export default Employee;
