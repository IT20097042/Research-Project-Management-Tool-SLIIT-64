
import React from "react";


function MemberDetails({member}){
    return (
        <tr>
            <td>
                {member._id}
            </td>
            <td>
                {member.name}
            </td>
            <td>
                {member.email}
            </td>

        </tr>
    )
}


export default MemberDetails