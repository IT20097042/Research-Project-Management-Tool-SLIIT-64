import React, {useEffect} from 'react';

import {useState} from "react";


const ReserchDetails = props =>{


    const[RDetails, setRDetails] = useState([])
    const userId = localStorage.getItem('user-ID')

    const fetchDetails = async (userId) =>{
        const res = await fetch('http://localhost:3000/students/getResearchDetails', {
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

        fetchDetails(userId).then(res =>{
            if(res){
                setRDetails(res.researchTopic_Data)
            }

        })

    })

    return(
        <h3>
            <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                <tr>
                    <th>Research Topic</th>
                    <th>Field</th>
                    <th>Research Topic Status</th>

                </tr>
                </thead>
                <tbody>
                {RDetails.length > 0 ? (
                    (RDetails.map((RDetail) => (

                        // <ResearchDetails key={RDetail._id} detail={RDetail}/>
                        <tr>
                            <td>
                                {RDetail.research_Topic}
                            </td>
                            <td>
                                {RDetail.field}
                            </td>
                            <td>
                                {RDetail.research_Topic_Status}
                            </td>

                        </tr>
                    )))

                ) : (<h3>No Research Topic </h3>)}

                </tbody>
            </table>
        </h3>
    )
}

export default ReserchDetails