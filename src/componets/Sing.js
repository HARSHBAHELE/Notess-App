
import React, { useContext,useState,} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
function Sing(props) {
    let history = useNavigate();
    let data = useContext(NoteContext)
       const [credentials, setCredentials] = useState({email:"",password:"",name:'',cpassword:''});
    let handelSubmit = async(e)=> {
        e.preventDefault();
        const response = await fetch(`http://localhost:9000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name ,email:credentials.email, password:credentials.password,}),
        });
        const json = await response.json();
        console.log(json)
        if(json.sucess) {
            localStorage.setItem('token',json.authData)
            history('/')
            props.showAlert("Creat Account SuccessFully","success")
        }else {
            props.showAlert("Invalid Details","danger")
        }
    }
    const onChange = (e)=> {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
    <div className="conatiner">
    <form id='form2'  onSubmit={handelSubmit} >
        <h2 id='loginnn'>Sing-Up Form</h2>
        <div className="mb-3">
            <label htmlFor="name" id='label3' className="form-label">Name</label>
            <input type="text" onChange={onChange} className="form-control" value={credentials.name}  name='name' id="name"  style={{ backgroundColor:data.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color:data.mode === "dark" ? 'white' : 'black' }}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" id='label3' className="form-label">Email address</label>
            <input type="email" onChange={onChange} className="form-control" value={credentials.email}  name='email' id="email" aria-describedby="emailHelp" style={{ backgroundColor:data.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color:data.mode === "dark" ? 'white' : 'black' }}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" id='label3' className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" style={{ backgroundColor:data.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color:data.mode === "dark" ? 'white' : 'black' }}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" id='label3' className="form-label">Current Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.cpassword} name='cpassword' id="cpassword" style={{ backgroundColor:data.mode === "dark" ? ' rgb(44, 44, 44)' : 'white', color:data.mode === "dark" ? 'white' : 'black' }}/>
        </div>
        <button onSubmit={handelSubmit} disabled={credentials.password.length<5} type="submit" className={`btn btn-${data.mode}`} style={{ border: data.mode === "dark" ? "1px solid white" : ' 1px solid grey', width:'350px',marginLeft:"20px" ,marginTop:"10px"}}>Sing-Up</button>
    </form>
    </div>
  )
}

export default Sing
