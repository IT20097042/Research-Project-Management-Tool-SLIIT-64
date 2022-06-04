import React, {useEffect} from 'react';
import {useState} from "react";
import Button from "../Basic/Button";
import GroupCreateForm from "./GroupCreateForm";
import AddMembers from "./AddMembers";
import GroupMembers from "./GroupMembers";


const StudentGroup = props => {
    const[showstudentGroup, setShowstudentGroup]= useState(false);
    const[showaddMemeber, setShowaddMemeber]= useState(false);
    const[groupID, setGroupID] = useState()
    const member_id = localStorage.getItem('user-ID')


    const CreateGroup = async (groupName, member_id) =>{
        const res = await  fetch('http://localhost:5000/students/registerGroup',{
            method : 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(groupName, member_id),
            }

        )
        return await res.json();
    }
    const AddMember = async (groupId ,member_id) =>{
        const res = await  fetch('http://localhost:5000/students/registerGroupMember',{
                method : 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(groupId, member_id),
            }

        )
        return await res.json();
    }
    function onCreate(){
        setShowstudentGroup(!showstudentGroup)
    }
    function onAdd(){
        setShowaddMemeber(!showaddMemeber)
    }
    const getGroupID = async (member_id) =>{
        const res = await fetch( 'http://localhost:5000/students/getGroupID', {
            method : 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({member_id})
            }

        )
        const data = await res.json()


        console .log(`Group ID = ${data}`)
        return data;
    }
    useEffect(() =>{
        getGroupID(member_id).then(res =>{
            if(res.status){
                setGroupID(res.groupID)
                localStorage.setItem('GroupName', res.groupName)
            }
        })
    },[groupID])
    return (
        <div>
            <section className='heading'>
                <center>
                <h3>
                    Student Group
                </h3>
                </center>
            </section>
            {!groupID && <Button onclick={onCreate} color='green' text={showstudentGroup ?'Close':'Create Group'}/>}
            {/*<Button onclick={onCreate} color='green' text={showstudentGroup ?'Close':'Create Group'}/>*/}
            {/*updated on 4th june groupID*/}
            {/*{groupID && <Button onclick={onAdd} color='blue' text={showaddMemeber ? 'Close' :'Add Member'}/>}*/}
            <Button onclick={onAdd} color='blue' text={showaddMemeber ? 'Close' :'Add Member'}/>

            <section>
                {groupID && <GroupMembers userId={member_id}/>}
                {/*<GroupMembers userId={member_id}/>*/}
            </section>
            {showstudentGroup &&<GroupCreateForm add={CreateGroup}/>}
            {showaddMemeber &&<AddMembers add={AddMember}/>}

        </div>
    );
};



export default StudentGroup;