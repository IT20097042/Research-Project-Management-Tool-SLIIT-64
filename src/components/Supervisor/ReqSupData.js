import React, {useState} from 'react'
import {useEffect} from "react";
import MemberDetails from "../Group/MemberDetails";

function ReqSupData(){
    const userId = localStorage.getItem('user-ID')
    const[gName, setgName] = useState('');

    const[topic, setTopic] = useState('');
    const[field, setField] = useState('');
    const[supervisor, setSupervisor] = useState('');
    const[CoSupervisor, setCoSupervisor] = useState('');


    const fetchData = async (userId) =>{
        const res = await fetch('http://localhost:3000/students/getSupervisors', {
            method : 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({userId})
        })
        const data = await res.json()
        //console .log(data)
        return data;
    }

    useEffect(() =>{

        fetchData(userId).then(res =>{
            if(res){
                setgName(res.groupName)
                setTopic(res.research_Topic)
                setField(res.field)
                setSupervisor(res.supervisor)
                setCoSupervisor(res.co_supervisor)

            }

        })


    }, [{field}])

    return(
        <h2>

            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Research Topic</th>
                    <th>Field</th>
                    <th>Supervisor</th>
                    <th>Co-Supervisor</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{gName}</td>
                    <td>{topic}</td>
                    <td>{field}</td>
                    <td>{supervisor}</td>
                    <td>{CoSupervisor}</td>
                </tr>

                </tbody>
            </table>
        </h2>
    )
}

export default ReqSupData