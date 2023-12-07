import { NavigateFunction } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const HandleSearch = <T extends { name: string }>(
  search: string,
  data: T[]
): T[] => {
  return data.filter((item: T) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
};

export const Filter = (status: string, project: any) =>
  project.filter((item: any) => item.projectStatus === status);

export const FilterUpcoming = (project: any) =>
  project &&
  project.filter(
    (item: any) =>
      new Date(item.startDate) > new Date() && item.projectStatus === "Upcoming"
  );
export const FilterOngoing = (project: any) =>
  project &&
  project.filter(
    (item: any) =>
      item.projectStatus === "Ongoing" || new Date(item.startDate) < new Date() && item.projectStatus !== "Completed"
  );

  export const handleLogout = (navigate:NavigateFunction) =>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  function Name(){
    const name = "oke"
   function age(){
    console.log(name)

   }
   return age
  }
  const data = Name()
  data()