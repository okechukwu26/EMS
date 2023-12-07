import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { SLayout, SMain } from "./styles";
// onChange={handleSearch}
// changeSearch={(data) => setSearch(data)}

interface LayoutProps {
    children: React.ReactNode;
    step:number;
    setStep:(step:number) => void
    onChange:(search:string) => void;
    changeSearch:(data:string) => void; 
}

const Layout = ({ children,step, setStep, onChange, changeSearch }: LayoutProps) => {
 
    return (
        <SLayout >
            <Sidebar step={step} selectStep={setStep} onChange={onChange} changeSearch={changeSearch}/>
            <SMain>{children}</SMain>
        </SLayout>
    );
};

export default Layout;
