import React, {useState} from 'react'
import {useEffect} from "react";
import ReqSupData from "./ReqSupData";

function Supervisors(){
    const groupName = localStorage.getItem('GroupName')
    const userId = localStorage.getItem('user-ID')

     const[reqID, setReqID] =useState('')

    // const[request, setRequest] = useState(false)

    const reqsuper = async (groupName) =>{
        const res = await fetch('http://localhost:5000/students/requestsupervisor', {
            method : 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({groupName})
        })
        const data = await res.json()
        //console .log(data)
        return data;
    }
    function toggle(){

       // const userId = localStorage.getItem('user-ID')
        reqsuper(groupName).then(
            res =>{
                if(res){
                    // setRequest(true)
                    // setReqID(res._id)
                    localStorage.setItem('requested', res.id)

                }
                else{
                    window.alert("Error !!")
                }
            }
        )
    }

    const fetchData = async (userId) =>{
        const res = await fetch('http://localhost:5000/students/getSupervisors', {
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
                // setgName(res.groupName)
                // setTopic(res.research_Topic)
                // setField(res.field)
                // setSupervisor(res.supervisor)
                // setCoSupervisor(res.co_supervisor)
                // setReqID(res._id)
                setReqID(localStorage.getItem('requested'))
            }

        })


    }, [])
    return(
        <div>
            {!reqID && <button onClick={toggle}> Request Supervisors</button>}
             <ReqSupData/>
        </div>
    )
}

export default Supervisors;