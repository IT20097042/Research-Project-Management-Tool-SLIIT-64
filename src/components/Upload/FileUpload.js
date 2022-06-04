import React, {Fragment, useEffect, useState} from 'react';
import Message from '../Basic/Message'
import Progress from '../Basic/Progress'
import axios from 'axios'


function FileUpload(){
    //setting the states and handling it.
    //initially there is no file
    const[groupName, setGroupName] = useState('')
    const[file, setFile] = useState('');

    const[filename, setFilename] = useState('Choose File');
    const[filepath, setPathFile] = useState('')
    const [uploadedFile, setUploadedfile] = useState({});
    //alerting user when the file is uploaded.
    const [message, setMessage] = useState('');
    const userId = localStorage.getItem('user-ID')
    const[uploadPercentage, setUploadPercentage] = useState(0);

    const getGroupName = async (userId) =>{
        const res = await fetch( 'http://localhost:3000/students/getGroupID', {
                method : 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({userId})
            }

        )
        const data = await res.json()



        return data;
    }
    useEffect(() =>{
        getGroupName(userId).then(res =>{
            if(res){
                setGroupName(res.groupName)
                localStorage.setItem('GroupName', res.groupName)
            }
        })
    })

    const onChange = (e)=>{
        //single file upload
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setGroupName(localStorage.getItem('GroupName'))
    }


    const onSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file)
        formData.append('groupName',groupName )
        formData.append('filename',filename)


        try{
            const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
                onUploadProgress:progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded*100 / progressEvent.total))))

                    //after uploading clear the percentage
                    setTimeout(()=>{
                        setUploadPercentage(0)
                    }, 1000)
                },

            });
            const {fileName, filePath} = res.data
            setUploadedfile({fileName, filePath});
            alert(` ${__dirname}/public/${filePath}`)
            setPathFile(filePath)

            setMessage('File Uploaded Successfully')
        }catch (err){
            if(err.res.status === 500){
                setMessage('Internal server problem')
            }
            else {
                setMessage(err.response.data.msg)
            }

        }

    }

    return(
        <Fragment>
            <div>
                <h1 align="center">Upload your Submissions</h1>
                <br/>
                <br/>
            </div>
            <h2>
                {message ? <Message msg={message} /> : null}
                {/*creating the form*/}
                <form onSubmit={onSubmit}>

                    <div className='form-group'>

                        <input type='file' className='form-control' id='customFile'
                               onChange={onChange} required/>

                        <label htmlFor="exampleInputEmail1" className="form-label">{filename} </label>
                    </div>
                    <Progress percentage={uploadPercentage}/>
                    <input type="submit" className="btn btn-primary " value="submit"/>
                </form>
                {
                    uploadedFile ? (
                        <div className="row mt-5">
                            <div className="col-md-6 m-auto">
                                <h3 className="text-center">
                                    {uploadedFile.fileName}
                                </h3>

                                {/*<img style={{width: '100%'}} src={`../public${filepath}`} alt=""/>*/}
                            </div>
                        </div>
                    ): null
                }


            </h2>

        </Fragment>
    )
}


export default FileUpload;