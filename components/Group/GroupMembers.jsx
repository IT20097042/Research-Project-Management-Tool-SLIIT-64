import React, {useEffect} from 'react';
import {useState} from "react";
import MemberDetails from "./MemberDetails";


const GroupMembers = props => {
    const [members, setMembers] = useState([])
    const [GName, setGName] = useState([])
    const userId = localStorage.getItem('user-ID')

    const fetchMembers = async (userId) =>{
        const res = await fetch('http://localhost:5000/students/getGroupMember', {
            method : 'POST',
            headers: {
                        'Content-type': 'application/json',
                    },
            body: JSON.stringify({userId})
        })

        const data = await res.json()


        console .log(data)
        return data;

    }
    useEffect(() =>{

        fetchMembers(userId).then(res =>{
            if(res){
                setMembers(res.groupMembers)
                setGName(res.groupName)

            }

        })

    }, [])

    return(
        <h2>
            <center ><h1> {GName}</h1> </center>
            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                <tr>
                    <th>Member ID</th>
                    <th>Member Name</th>
                    <th>Member Email</th>

                </tr>
                </thead>
                <tbody>
                {members.length > 0 ? (
                    (members.map((member) => (

                        <MemberDetails key={member._id} member={member}/>
                    )))

                ) : (<h3>No Members in this group {members.length}</h3>)}

                </tbody>
            </table>
        </h2>
    )
}

export default GroupMembers;