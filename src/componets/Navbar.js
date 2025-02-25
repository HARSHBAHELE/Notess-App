// import React, { useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


function Navbar() {
  let history = useNavigate();
  let handelLogout=()=> {
    localStorage.removeItem('token');
    history('/login')
  }
  const com = useContext(NoteContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={com.mode}>
        <div className="container-fluid">
          <Link className="nav-link" to="/">iNoteBook</Link>
          <button className="navbar-toggler"  data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current='page' to='/About'>About us</Link>
              </li>
              {!localStorage.getItem('token')?<form id='imp' className='d-flex'>
                <Link style={{ border:com.mode === "dark" ? "1px solid white" : ' 1px solid grey' }} className={`btn btn-${com.mode} mx-2`} to={'/login'}>Login</Link>
                <Link style={{ border:com.mode === "dark" ? "1px solid white" : ' 1px solid grey' }} className={`btn btn-${com.mode} mx-2`} to={'/singUp'}>SingUp</Link>
              </form>:<button  id='btn3' onClick={handelLogout} className={`btn btn${com.mode}`} style={{border:com.mode === "dark" ? "1px solid white" : ' 1px solid grey'}}>Logout</button>}
              <button id='btnnn' onClick={com.toggle} style={{ border: com.mode === "dark" ? "1px solid white" : ' 1px solid grey' }}  className={`btn btn-${com.mode}`}>{com.mode==='light'?'Dark Mode':'Light Mode'}</button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
