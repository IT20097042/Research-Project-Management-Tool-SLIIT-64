 import React from 'react';


function Message({msg}){
    return(
        <div className="alert alert-info alert-dismissible fade show" role="alert">
            {msg}
            <button type="button" className="close" data-dismiss ="alert" aria-label="close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}


export default Message;