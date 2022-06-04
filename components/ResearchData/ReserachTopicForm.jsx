import React from 'react';

import {useState} from "react";

const ReserachTopicForm = props =>{
    const gID = localStorage.getItem('user-ID')
   // const[gID, setgID] = useState('')
    const[research_Topic, setResearchTopic] = useState('')
    const[field, setField] = useState('')


    function OnSubmit(e){


        e.preventDefault()
        if(!gID){
            alert("Please Enter your Group ID")
            return
        }
        if(!research_Topic){
            alert("Please Enter your Reserach Topic")
            return
        }
        if(!field){
            alert("Please Enter your Field")
            return
        }

        const RTopic = {
            gID,research_Topic, field
        }
        props.add(RTopic).then(res =>{
            if(res){
                alert(`${res.status}`)


            }else{
                window.alert("Error when Creating the Group!!")
            }
        })
        setResearchTopic('');
        setField('');

    }

    return (
        <>
            <section className='heading'>
                <h3>
                    Enter the  Research Topic Details
                </h3>
            </section>

            <section className='form'>
                <form onSubmit={OnSubmit}>

                    {/*<div className='form-group'>*/}
                    {/*    <label  className="form-label">Group ID </label>*/}
                    {/*    <input type='text' className='form-control' id='gID'*/}
                    {/*           name='gID' required value={gID} placeholder='Enter the Group ID'*/}
                    {/*           onChange={(e)=>setgID(e.target.value)} />*/}
                    {/*</div>*/}

                    <div className='form-group'>
                        <label  className="form-label">Research Topic </label>
                        <input type='text' className='form-control' id='research_Topic'
                               name='research_Topic' required value={research_Topic} placeholder='Enter your Research Topic'
                               onChange={(e)=>setResearchTopic(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label  className="form-label">Field </label>
                        <input type='text' className='form-control' id='field'
                               name='field' required value={field} placeholder='Enter the Field'
                               onChange={(e)=>setField(e.target.value)} />
                    </div>


                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Enter</button>
                    </div>


                </form>
            </section>


        </>
    );
}

export default ReserachTopicForm
