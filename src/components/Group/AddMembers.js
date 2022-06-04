import React, {useState} from 'react';
import GroupMembers from "./GroupMembers";
import Message from "../Basic/Message";


const AddMembers = props => {

    const[groupName, setgroupName] = useState('')
    const [message, setmessage] = useState('')
    const[email, setmemberName] = useState('')
    const userId = localStorage.getItem('user-ID')

    function OnSubmit(e){
        e.preventDefault()
        if(!groupName){
            alert("Please Add the Group Name")
            return
        }
        if(!email){
            alert("Please Add the Member Name")
            return
        }
        alert(email )
        props.add({
            email
            ,groupName

        }).then(res =>{
            if(res.success){
                setmessage(res.message)
            }
                setmessage(res.message)
        }

        )
        setgroupName('')
        setmemberName('')

    }

    return (
        <>
            <section className='heading'>
                <h3>
                    Add Members
                </h3>
            </section>
            <center>
                {message ? <Message msg={message} /> : null}
            </center>
            <section className='form'>
                <form onSubmit={OnSubmit}>

                    <div className='form-group'>
                        <label  className="form-label">Group Name </label>
                        <input type='text' className='form-control' id='groupName'
                               name='groupName' required value={groupName} placeholder='Enter the Group Name'
                               onChange={(e)=>setgroupName(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label  className="form-label">Member Email </label>
                        <input type='text' className='form-control' id='email'
                               name='email' required value={email} placeholder='Enter the Member Email'
                               onChange={(e)=>setmemberName(e.target.value)} />
                    </div>


                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>ADD MEMBER</button>
                    </div>


                </form>
            </section>


        </>
    );
};



export default AddMembers;