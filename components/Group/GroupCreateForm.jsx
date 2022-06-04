import React from 'react';

import {useState} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import GroupMembers from "./GroupMembers";

const GroupCreateForm = props => {

    const[groupName, setgroupName] = useState('')

    const member_id = localStorage.getItem('user-ID')
    const navigate = useNavigate()
    function OnSubmit(e){
        e.preventDefault()
        if(!groupName){
            alert("Please Add the Group Name")
            return
        }

        props.add({
            groupName, member_id
        }).then(res =>{
            if(res){
                alert(`${res.groupName}`)
                // navigate('/group');
            }else{
                window.alert("Error when Creating the Group!!")
            }
        })
        setgroupName('');

    }

    return (
        <>
            <section className='heading'>
                <h3>
                     Create Student Group
                </h3>
            </section>

            <section className='form'>
                <form onSubmit={OnSubmit}>

                    <div className='form-group'>
                        <label  className="form-label">Group Name </label>
                        <input type='text' className='form-control' id='groupName'
                               name='groupName' required value={groupName} placeholder='Enter the Group Name'
                               onChange={(e)=>setgroupName(e.target.value)} />
                    </div>


                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Create Student Group</button>
                    </div>


                </form>
            </section>


        </>
    );
};



export default GroupCreateForm;