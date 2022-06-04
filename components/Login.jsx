import React from "react";
import Navigation from "./Basic/Navigation"

//importing login from UserFunctions
import {loginUser} from "./UserFunctions";


import {useState, useEffect} from "react";
import {FaSignInAlt} from 'react-icons/fa'

import {Link, useNavigate} from "react-router-dom";
import Message from "./Basic/Message";


function Login(){

    const userId = localStorage.getItem('user-ID')
    const [message, setmessage] = useState('')
    const [formData, setFormData] = useState({

        emailL:'',
        password:'',

    })
    const {email, password} = formData

    const navigate = useNavigate()


    // useEffect(() => {
    //     if(isError){
    //         toast.error(message)
    //     }
    //     if(isSuccess || user){
    //         navigate('/')
    //     }
    //     dispatch(reset())
    // }, [user, isError,isSuccess, message, navigate, dispatch,isLoading])

    const onChange = (e)=>{
        setFormData((prevState) => ({
            ...prevState, [e.target.name] : e.target.value,

        }))
    }
    // Login User
    const loginUser = async (user) => {
        const res = await fetch('http://localhost:5000/student/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        })
        return await res.json();


        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
    }
    const onSubmit = (e)=>{
        e.preventDefault()

        const userData = {
            email,
            password
        }
        //if there is a response push it to the profile
        loginUser(userData).then(res=>{
            if(res.success){
                //create a session when user logins in to the system
                localStorage.setItem('usertoken', res.token)
                localStorage.setItem('user-ID', res._id)
                console.log(res.token)
                //alert(`Login Successful ${res.firstName}`)
                setmessage(res.message)
                setTimeout(() => {
                    navigate('/profile');
                }, 1000)

            }
            setmessage(res.message)
        })
        }



    return(<>
            <section className='heading'>
                <h3>
                    <FaSignInAlt/> Login User
                    {/*<p>Login and start setting goals</p>*/}
                </h3>
            </section>
            <center>
                {message ? <Message msg={message} /> : null}
            </center>
            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div className='form-group'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                        <input type='email' className='form-control' id='email'
                               name='email' required value={email} placeholder='Enter your email'
                               onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type='password' className='form-control' id='password'
                               name='password' value={password} placeholder='Enter your password'
                               onChange={onChange} required/>
                    </div>
                    <span>Don't have an account? </span>
                    <Link to={'/register'}>Register</Link>
                    <br/>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>


                </form>
            </section>

        </>
    )

}

export default Login