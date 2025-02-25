
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './componets/Home';
import About from './componets/About';
import Users from './componets/Users';
import Navbar from './componets/Navbar';
// import { useState } from 'react';
import NoteState from './context/notes/NoteState';
import Alert from './componets/Alert';
import Sing from './componets/Sing';
import Login from './componets/Login';
import { useState } from 'react';


function App() {
  let[alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      mag:message,
      type:type
    })
    setTimeout(()=> {
      setAlert(null)
    },1500)
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path='/About' element={<About />}></Route>
            </Routes>
            <Routes>
              <Route exact path='/Users' element={<Users />}></Route>
            </Routes>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />}></Route>
            </Routes>
            <Routes>
              <Route exact path='/login' element={<Login showAlert={showAlert} />}></Route>
            </Routes>
            <Routes>
              <Route exact path='/singUp' element={<Sing showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}
export default App;
