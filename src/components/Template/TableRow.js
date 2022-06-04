
import React from "react";
import axios from 'axios';
import download from 'downloadjs';
import {Link} from 'react-router-dom'

function TableRow({temps}){

    const downloadFile = async (id, path) => {
        try{


            const result = await axios.get(`http://localhost:3000/students/download/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            return download(result.data, filename,);
        } catch (error) {
            // if (error.response && error.response.status === 400) {
            //     setErrorMsg('Error while downloading file. Try again later');
            // }
        }
    };
    return (
        // <div className='goal'>
        //     <div>
        //         {assignments.course}
        //     </div>
        //
        //     <h5>{assignments.assignment_name}</h5>
        //      <h5>{assignments.deadline}</h5>
        //     <h5>{assignments.date}</h5>
        //
        //         <button className='btn btn-danger'>Do This!</button>
        //
        // </div>
        <tr>
            <td>
                <a href={temps.Template_File_Path}>{temps.Template_File_Path} </a>

            </td>
            <td>
                {temps.Template_Name}
            </td>

            <td>
                {/*<Link className='btn btn-danger' to="" target="_blank" download>Download </Link>*/}
                <button className='btn btn-danger'
                        onClick={() => downloadFile(temps._id, temps.Template_File_Path)}>
                    Download File
                </button>

            </td>
        </tr>
    )
}


export default TableRow