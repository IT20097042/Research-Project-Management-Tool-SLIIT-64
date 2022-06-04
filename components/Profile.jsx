import React, {useState} from 'react'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";




function Profile(){

    const navigate = useNavigate()
    const [profileData, setprofileData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:''
    })
    // Get User
    const getUser = async () => {
        const token = localStorage.usertoken
        const decoded =jwtDecode(token)
        setprofileData({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
        })

        //const res = await fetch('http://localhost:5000/student/profile')

        //return await res.json();


        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
    }


    useEffect(() =>{
        const token = localStorage.usertoken
        const decoded =jwtDecode(token)
        console.log(`users first name is ${decoded.id}`)
        setprofileData({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
        })

    }, [])


    return(
        < >
            <section className='heading'>
                <h1 className="text-center"> Welcome {profileData.firstName}</h1>
                <h3 className="text-center">Student Profile</h3>

            </section>
            {/*<div className='container'>*/}
            {/*    <div className='goals'>*/}
            {/*        <div className='col-sm8 mx-auto'>*/}
            {/*            <p>First Name : {profileData.firstName}</p>*/}
            {/*            <p>Last Name : {profileData.lastName}</p>*/}
            {/*            <p>Email : {profileData.email}</p>*/}
            {/*        </div>*/}


            {/*    </div>*/}
            {/*</div>*/}
            <table className="table table-striped" style={{marginTop: 20,} }>
                <h2>
                <tbody>
                <tr>
                    <td>First Name</td>
                    <td>{profileData.firstName}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{profileData.lastName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{profileData.email}</td>
                </tr>
                </tbody>
                </h2>
            </table>
        </>
    )
}

export default Profile