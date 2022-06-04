import React, {useState} from "react";
import {FaUser} from 'react-icons/fa'


import {Link, useNavigate} from "react-router-dom";
import Message from "./Basic/Message";

function Register(){
    const [message, setmessage] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:'',
        password2:''
    })
    const {firstName, lastName, email, password, password2} = formData

    const navigate = useNavigate()




    const onChange = (e)=>{
        setFormData((prevState) => ({
            ...prevState, [e.target.name] : e.target.value,

        }))
    }
    // Register User
    const registerUser = async (task) => {
        const res = await fetch('http://localhost:5000/student/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        return await res.json();


        // const id = Math.floor(Math.random() * 10000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
    }
    const onSubmit = (e)=>{
        e.preventDefault()

        if(password !== password2){
            alert('Password do not match')
        }
        else{
            const userData = {
                firstName,
                lastName,
                email,
                password,
            }
            registerUser(userData).then(res=>{
                if(res.success){
                    console.log(res.message)
                    setmessage(res.message)
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000)

                }

                setmessage(res.message)
            })

            setFormData({
                firstName: '',
                lastName: '',
                email:'',
                password:'',
                password2:''
            })
        }
    }


    return(
        <>
            <section className='heading'>
                <h3>
                    <FaUser/> Student Register Form
                    <p>Create an account</p>
                </h3>
            </section>
            <center>
                {message ? <Message msg={message} /> : null}
            </center>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor="exampleInputEmail1" className="form-label">First Name </label>
                        <input type='text' className='form-control' id='firstName'
                               name='firstName' value={firstName} placeholder='Enter your first name'
                               onChange={onChange} required/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name </label>
                        <input type='text' className='form-control' id='lastName'
                               name='lastName' value={lastName} placeholder='Enter your last name'
                               onChange={onChange} required/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                        <input type='email' className='form-control' id='email'
                               name='email' value={email} placeholder='Enter your email'
                               onChange={onChange} required/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Password </label>
                        <input type='password' className='form-control' id='password'
                               name='password' value={password} placeholder='Enter your password'
                               onChange={onChange} required/>
                    </div>


                    <div className='form-group'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password </label>
                        <input type='password' className='form-control' id='password2'
                               name='password2' value={password2} placeholder='Confirm your password'
                               onChange={onChange} required/>
                    </div>
                    <span>Already have an account? </span>
                    <Link to={'/login'}>Login</Link>
                    <br/>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>




                </form>
            </section>

        </>
    )
}

export default Register