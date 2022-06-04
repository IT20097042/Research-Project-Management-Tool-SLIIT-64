import React, {useEffect} from 'react';

import {useState} from "react";
import ReserchDetails from "./ReserchDetails";
import ReserachTopicForm from "./ReserachTopicForm";


const ResearchTopic = props =>{

    const userId = localStorage.getItem('user-ID')
    const [value,setValue] = useState();
    const[groupID, setGroupID] = useState()
    const[status, setStatus] = useState(false)

    const getGroupID = async (userId) =>{
        const res = await fetch( 'http://localhost:5000/students/getGroupID', {
                method : 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({userId})
            }

        )
        const data = await res.json()


        console .log(`Group ID = ${data}`)
        return data;
    }


    useEffect(() =>{
        getGroupID(userId).then(res =>{
            if(res){
                setGroupID(res.groupID)
                let state
                let researchTopic_Data = res.researchTopic_Data
                researchTopic_Data.map((rsData) =>{
                    state = rsData.research_Topic_Status
                })
                if(state === "Pending" || state === "Accepted"){
                    setStatus(true)
                }
                setValue({});
            }
        })
    })


    const EnterResearchTopic = async (Topic) =>{
        const res = await  fetch('http://localhost:5000/students/registerResearchTopic',{
                method : 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(Topic),

            }

        )
        return await res.json();
    }
            return(
                <div>
                    <center>
                        <h2> Our Research Topic</h2>
                    </center>
                    {/*{groupID && <ReserchDetails/>}*/}
                   <ReserchDetails/>
                    <ReserachTopicForm add={EnterResearchTopic}/>



                </div>


            )
}

export default ResearchTopic;