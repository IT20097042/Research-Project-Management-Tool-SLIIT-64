 import {FaSignInAlt, FaSignOutAlt, FaUser,FaUpload, FaListAlt} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import {useNavigate} from "react-router-dom";





function Navigation(){
    const navigate = useNavigate()
    const logOut = (e) =>{
        e.preventDefault()
        //remove all tokens when logging out
        localStorage.removeItem("usertoken")
        localStorage.removeItem("GroupName")
        localStorage.removeItem("requested")
        localStorage.removeItem("user-ID")
        navigate('/')
    }

    return(
        <nav className='navbar navbar-expand-lg bg-light rounded'  >

            <div className= 'container-fluid'>
                <Link  to='/'> <h1 className="navbar-brand ">Research APP </h1></Link>
            </div>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {localStorage.usertoken ? (<>
                    <li className="nav-item">
                        <Link to='/profile' className="nav-link">
                            <h3><FaUser color="blue"/> Profile </h3>
                        </Link>
                    </li>
                    <li>
                        <Link to='/upload' className="nav-link">
                            <h3><FaUpload color="blue"/> Document Submissions </h3>
                        </Link>
                    </li>
                    <li>
                        <Link to='/assignments' className="nav-link">
                            <h3><FaListAlt color="blue"/> Template List </h3>
                        </Link>
                    </li>
                    <li>
                        <Link to='/group' className="nav-link">
                            <h3><FaListAlt color="blue"/> Student Group </h3>
                        </Link>
                    </li>
                    <li>
                        <Link to='/topic' className="nav-link">
                            <h3><FaListAlt color="blue"/> Research Topic </h3>
                        </Link>
                    </li>
                    <li>
                        <Link to='/supervisors' className="nav-link">
                            <h3><FaListAlt color="blue"/> Supervisors </h3>
                        </Link>
                    </li>
                    <li>
                    <button className='btn btn-danger btn-lg ' onClick={logOut}>
                        <FaSignOutAlt color="white"/> Logout
                    </button>
                </li> </>) : (<><li className="nav-item">
                        <Link to='/login' className="nav-link">
                            <h3><FaSignInAlt color="black"/> Login </h3>
                        </Link>
                    </li>
                        <li className="nav-item">
                            <Link to='/register' className="nav-link">
                                <h3>< FaUser  color="black"/> Register</h3>
                            </Link>
                        </li>
                        </>

                ) }
            </ul>

        </nav>
    )
}

export default Navigation