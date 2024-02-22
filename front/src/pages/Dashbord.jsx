import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const DashbordPage = (props)=>{
    return (
        <React.Fragment>
            <Header/>
            <div className='App-body'>
                <Sidebar/>
                <Main/>
            </div>
        </React.Fragment>
    )
}
export default DashbordPage;