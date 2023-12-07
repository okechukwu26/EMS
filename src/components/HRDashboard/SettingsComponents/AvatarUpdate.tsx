//import styled from 'styled-components'

import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UplaodInput } from "../newEmployee";
import { TopWrap1 } from "../../EmployeeDashboard/Payrise";
import { ClipLoader } from "react-spinners";
import avatar from "../../../assets/images/avatar.png";
import { useEffect, useState } from "react";
import { createImage } from "../../../api/employee";
import { Avatar } from '../Employees';

const AvatarUpdate = () => {

      const [formData, setFormData] = useState({
        image: "",
      
      });
    const dispatch = useDispatch();

    const image = useSelector((state: any) => state.employee);
    console.log(image);
    useEffect(() => {
      const img = localStorage.getItem("user")
      if(img != null){
        const {image} = JSON.parse(img)
        setFormData((prev) => ({ ...prev, image }));
        }else{
          setFormData((prev) => ({ ...prev, image: "" }));
        }
      
     }, [image.image]);
    

    const handleImage = async (e: any) => {
       const file = e.target.files[0];

       const images = {
         image: file,
       };
       const data = await createImage(dispatch)(images);
       setFormData((prev) => ({ ...prev, image: data }));
     };
  return (
    <>
      <div style={{ display: "flex", gap: "10%", paddingTop:"50px" }}>
        <Avatar>

        <img
          src={image.image ? image.image : avatar}
          alt=""
          style={{
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            border: "4px solid #D1FADF",
            objectFit:"cover"
          }}
          />
          </Avatar>
        <TopWrap1>
          <UplaodInput type="file" onChange={handleImage} />
          <ClipLoader
            color="green"
            loading={image.loadingImage}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

      <label htmlFor="file-upload">Choose a file:</label>
                    {/* <StyledInput id="file-upload" /> */}
          
        </TopWrap1>
      </div>
    </>
  );
}

export default AvatarUpdate

// const Div = styled.div`
//     display: flex;
//     justify-items: space-between;
//     align-items: center;
//     margin-bottom: 1rem;
//     width: 100%;
//     label{
//         margin-bottom: 0.5rem;
//         font-size: 1rem;
//         font-weight: 600;
//     }
//     input{
//         padding: 0.5rem;
//         border-radius: 0.5rem;
//         border: 1px solid #ccc;
//         outline: none;
//         font-size: 1rem;
//         &:focus{
//             border: 1px solid #000;
//         }
//     }
// `

// const Button = styled.input`
//     padding: 0.5rem 1rem;
//     border-radius: 0.5rem;
//     border: none;
//     outline: none;
//     background: #000;
//     color: #fff;
//     font-size: 1rem;
//     cursor: pointer;
//     &:hover{
//         background: #fff;
//         color: #000;
//         border: 1px solid #000;
//     }
// `

// const ProfileAvatar = styled.img`
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     padding-right: 3rem;
//     `
