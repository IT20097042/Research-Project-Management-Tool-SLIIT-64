import axios from 'axios'

const  API_URL_R = 'http://localhost:5000/student/register'
const  API_URL_L = '/student/login'

export const registerUser = (newUser) =>{
    return axios
        .post(API_URL_R, {
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email,
            password : newUser.password,

        })
        .then(
            res=>{
                console.log("Registered Successfully")
                window.alert("Registered Successfully")
            }
        )
}
//Register user
// export const registerUser = async (userData) =>{
//     const response = await axios.post(API_URL_R, userData)
//
//     if(response.data){
//         localStorage.setItem('user', JSON.stringify(response.data))
//     }
//
//     return response.data
// }

// export const loginUser = User =>{
//     return axios
//         .post(API_URL_L, {
//             email : User.email,
//             password : User.password,
//         })
//         .then(
//             res=>{
//                 localStorage.setItem('usertoken', res.data)
//                 return res.data
//                 // console.log("Login Successfully")
//                 // window.alert("Login Successfully")
//             }
//         )
//         .catch(err =>{
//             console.log(err)
//         })
// }
//Login user
export  const loginUser = async (userData) =>{
    const response = await axios.post(API_URL_L, userData)

    if(response.data){
        localStorage.setItem('usertoken', response.data)
    }

    return response.data
}