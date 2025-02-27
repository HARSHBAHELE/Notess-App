import React, { useContext,useState,} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
function Login(props) {
    let history = useNavigate();
    let data = useContext(NoteContext)
       const [credentials, setCredentials] = useState({email:"",password:""});
    let handelSubmit = async(e)=> {
        e.preventDefault();
        const response = await fetch(`https://i-note-book-app-xi.vercel.app/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password }),
        });
        const json = await response.json();
        if(json.sucess) {
            localStorage.setItem('token',json.authData)
            history('/')
           props.showAlert(" Login SuccessFully","success")
        } else {
            props.showAlert("Enter Correct Password","danger")
        }
    }
    const onChange = (e)=> {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    return (
        <>
        <div className="conatiner">
            <form id='form1'  onSubmit={handelSubmit} >
                <h2 id='loginnn'>Login Form</h2>
                <div className="mb-3">
                    <label htmlFor="email" id='label1' className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" value={credentials.email}  name='email' id="email" aria-describedby="emailHelp" style={{ backgroundColor:data.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color:data.mode === "dark" ? 'white' : 'black' }}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" id='label2' className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" style={{ backgroundColor:data.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color:data.mode === "dark" ? 'white' : 'black' }}/>
                </div>
                <button disabled={credentials.password.length<5} type="submit" className={`btn btn-${data.mode}`} style={{ border: data.mode === "dark" ? "1px solid white" : ' 1px solid grey', width:'350px',marginLeft:"20px" ,marginTop:"20px"}}>Login</button>
            </form>
            </div>
        </>
    )
}

export default Login
