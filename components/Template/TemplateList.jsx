import React from "react";

import TableRow from "./TableRow";


import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


function TemplateList(){

    const navigate = useNavigate()
    const [templates, settemplates] = useState([])

    // const fetchAssignment = async () =>{
    //     const res = await fetch('http://localhost:5000/assignment')
    //     const data = await res.json()
    //     console .log(data)
    //     return data;
    // }
    const fetchTemplates = async () =>{
        const res = await fetch('http://localhost:5000/students/getTemplates')
        const data = await res.json()
        //console.log(data)
        return data;
    }

    useEffect(() =>{

        // const getTemplates = async () =>{
        //     const templatesFetched = await  fetchTemplates()
        //
        //
        //     // const Template_Name = data.Template_Name
        //     // const Template_File_Path = data.Template_File_Path
        //     settemplates(templatesFetched)
        // }
        // getTemplates()
        fetchTemplates().then(res =>{
            settemplates(res)
        })
    }, [])



    return (
        <div>
            <h1 align='center'> Research Templates List </h1>
            <h2>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Template</th>
                        <th>Template Name</th>


                    </tr>
                    </thead>
                    <tbody>
                    {templates.length > 0 ? (
                        (templates.map((template) => (

                            <TableRow key={template._id} temps={template}/>


                        )))

                    ) : (<h3>No Templates to download {templates.length}</h3>)}
                    {/*<td>{templates.Template_Name}</td>*/}
                    {/*<a href={templates.Template_File_Path}>{templates.Template_File_Path}</a>*/}
                    </tbody>
                </table>
            </h2>
        </div>


    )
}


export default TemplateList