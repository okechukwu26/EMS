// import axiosInstance from "../../Request/axiosInstance";

// export interface payriseFormData {
//   employeeId: string;
//   firstName: string;
//   lastName: string;
//   department: string;
//   DateOfHire: number;
//   jobTitle: string;
//   currentPay: number;
//   proposedPay: number;
//   reasons: string;
//   attachments: string;
//   EmployeeStatus: string;
//   id: string;
// }

// export const payriseRequest = async (formData: payriseFormData) => {
//   try {
//     const res = await axiosInstance.post("/api/create-pay", formData);
//     alert(res.data.message);
//     console.log("form", res);
//   } catch (error: any) {
//     console.log(error.response.data.message);
//   }
// };
