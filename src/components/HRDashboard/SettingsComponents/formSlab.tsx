import React from "react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from 'styled-components'
import {
  // Button,
  // Content,
  Div,
  // Filelist,
  H1,
  Input,
  // Input1,
  InputContainer,
  Label,
  // Labelx,
  Select,
  // TopWrap,
  // TopWrap1,
  // Wrap,
} from "../../EmployeeDashboard/Payrise";
import { ClipLoader } from "react-spinners";
import { updateUser } from "../../../api/user";
import { styled } from "styled-components";
import { ToastContainer } from "react-toastify";
// import axiosInstance from "../../../Request/axiosInstance";

export interface formData {
  preferredName: string;
  email: string;
  address: string;
  City_State: string;
  Zip_code: string;
  id: string;
}
interface User {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  DateOfBirth: Date;
  id: string;
}



const FormSlab = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User>({
    employeeId: "",
    firstName: "",
    lastName: "",
    DateOfBirth: new Date(),
    email: "",
    id: "",
  });



  const [formData, setFormData] = useState({
    preferredName: "",
    email: "",
    City_State: "",
    Zip_code: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(JSON.parse(user));
    // console.log(typeof user);
    if (user !== null) {
      const { employeeId, firstName, lastName, email, DateOfBirth, id } =
        JSON.parse(user);
      setUser({
        employeeId,
        firstName,
        lastName,
        email,
        DateOfBirth,
        id
      });
      setFormData({
        ...formData,
        id,
        email,

      });
    }
  }, []);

  const update
   = useSelector((state: any) => state.user);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    await updateUser(dispatch)(formData);
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        
        <InputContainer>
          <Div>
            <Label htmlFor="employeeId">Employee Id</Label>
            <Input
              type="text"
              id="employeeId"
              name="employeeId"
              value={user.employeeId ?? ""}
              disabled={true}
            />
          </Div>
          <Div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName ?? ""}
              disabled={true}
            />
          </Div>
          <Div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName ?? ""}
              disabled={true}
            />
          </Div>
          <Div>
            <Label htmlFor="DateOfBirth">Date of Birth</Label>
            <Input
              type="date"
              id="DateOfBirth"
              name="DateOfBirth"
              value={user.DateOfBirth ?? ""}
              disabled={true}
            />
          </Div>
          <Div>
            <Label htmlFor="preferredName">Preferred Name</Label>
            <Input
              type="text"
              id="preferredName"
              name="preferredName"
              placeholder="Bimpe"
              onChange={handleChange}
            />
          </Div>
          <Div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={user.email ?? ""}
              disabled={true}
            />
          </Div>
          <Div>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="32 Rasaq-Eletu, Osapa London"
              onChange={handleChange}
            />
          </Div>
          <Div>
            <Label htmlFor="city_State">City/State</Label>
            <Input
              type="text"
              id="city_State"
              name="City_State"
              placeholder="Eti-Osa, Lagos"
              onChange={handleChange}
            />
          </Div>
          <Div>
            <Label htmlFor="Zip_code">Zip Code</Label>
            <Input
              type="text"
              id="Zip_code"
              name="Zip_code"
              placeholder="018233"
              onChange={handleChange}
            />
          </Div>
        </InputContainer>


        <InputContainer>
         
          <SaveBtn onClick={handleSubmit}>
            {" "}
            <ClipLoader
              color="white"
              loading={update.loading}
              size={15}
              aria-label="Loading Spinner"
              data-testId="loader"
            />
            Save Changes
          </SaveBtn>

          <br />
        </InputContainer>
      </form>
    </>
  );
};

export default FormSlab;

const SaveBtn = styled.button`
  background-color: #27ae60;
  font-family: Work Sans;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 0 16px;
  text-align: center;
  font-size: 14px;
  line-height: 19.6px;
  font-weight: 600;
  width: 150px;
  height: 36px;

  cursor: pointer;

  &:hover {
    background-color: #219653;
  }
`;
