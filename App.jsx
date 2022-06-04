import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Profile from "./components/Profile";
// import TemplateList from "./components/TemplateList";
// import FileUpload from "./components/FileUpload";
import Navigation from "./components/Basic/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import TemplateList from "./components/Template/TemplateList";
import FileUpload from "./components/Upload/FileUpload";
import StudentGroup from "./components/Group/StudentGroup";
import ResearchTopic from "./components/ResearchData/ResearchTopic";
import Supervisors from "./components/Supervisor/Supervisors";

export default function App(){
    return(
        <>
            <div className='container'>
                <Navigation/>
                <Routes>
                    <Route path='/' element={<Dashboard/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/upload' element={<FileUpload/>} />
                    <Route path='/assignments' element={<TemplateList/>} />
                    <Route path='/group' element={<StudentGroup/> } />
                    <Route path='/topic' element={<ResearchTopic/> } />
                    <Route path='/supervisors' element={<Supervisors/> } />




                </Routes>

            </div>
        </>
    )
}