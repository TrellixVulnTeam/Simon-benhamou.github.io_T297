import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './component/Home'
import Search from './component/Search'
import Navigation from './component/Nav';
import {Routes,Route, useNavigate,Link} from 'react-router-dom'
import Login from './component/Login';
import React,{useState,useEffect} from 'react'
import PetPage from './component/PetPage'
import ProfileSetting from './component/ProfileSetting';
import PrivateRoute from './component/PrivateRoute';
import MyPets from './component/MyPets';
import Admin from './component/Admin';
import NavAdmin from './component/NavAdmin';
import Users from './component/Users';
import AddPet from './component/AddPet';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { Dropdown,Container,Row ,Nav} from 'react-bootstrap';

function App() {
    const [user, setUser] = useState({})
    const [auth, setAuth]= useState(false)
    const [show, setShow] = useState(false);
    const [admin,setAdmin]= useState(false);
    let navigate = useNavigate()

    useEffect(() => {
    const token = localStorage.getItem('token')
    if(token !== null){
    const currentUser =  JSON.parse(atob(token.split('.')[1]))
    setUser(currentUser)
    setAuth(true)
    }
    },[])

    function loginHandler(e){
          setShow(true);
    }

    function logOut(e){
      e.preventDefault();
      setUser("")
      setAuth(false);
      localStorage.clear();
      navigate("/")
    }

  return (
    <>
      {admin === false ? <><Navigation auth={auth} admin={user.admin} /> 
        <Routes>
          <Route path="/"  element ={<Home setAdmin={setAdmin} />} /> 
          <Route path="/search"  element ={<Search/>} />
          <Route path="/pet/:petID" element={<PetPage properties={{user}} />} />
          <Route path="/admin" element={<Admin properties={{user,setAdmin}} /> } />
          <Route path="/admin/users" element={<Users  properties={{user,setAdmin}} /> } />
          <Route path="/pet/:petID" element={<PetPage properties={{user}} />} />
          <Route path="/admin/add" element={<AddPet  properties={{user,setAdmin}} /> } />
      </Routes>
      </>
      : 
      <Container className="d-inline-flex" fluid> 
      <Row><NavAdmin /></Row>
              <Routes>
                    <Route path="/"  element ={<Home setAdmin={setAdmin} />} /> 
                    <Route path="/search"  element ={<Search/>} />
                    <Route path="/pet/:petID" element={<PetPage properties={{user}} />} />
                    <Route path="/admin" element={<Admin properties={{user,setAdmin}} /> } />
                    <Route path="/admin/users" element={<Users  properties={{user,setAdmin}} /> } />
                    <Route path="/pet/:petID" element={<PetPage properties={{user}} />} />
                    <Route path="/admin/add" element={<AddPet  properties={{user,setAdmin}} /> } />
               </Routes>
       </Container>
      }
      <PrivateRoute auth={auth}>
        <Routes>
          <Route  path="/profile/setting" element={<ProfileSetting properties={{user}}/> }/>
          <Route  path="/mypets" element={<MyPets properties={{user}}/> } />
       </Routes>
      </PrivateRoute>

      {auth === false ? <> 
      <span  onClick={loginHandler} className="login">Login</span>
      {show === true ? <Login shows={{show,setShow,setAuth,setUser,navigate}} /> : null }
      </> :<div className='logout'>
      <Dropdown>
          <Dropdown.Toggle variant="btn btn-outline-secondary m-2 border-0" id="dropdown-basic">{user.firstName}</Dropdown.Toggle>
                <DropdownMenu>
                     <Dropdown.Item onClick={logOut}> Log out</Dropdown.Item>
                       <PrivateRoute auth={auth}>
                          <Dropdown.Item href="/profile/setting" >Profile</Dropdown.Item>
                            {user.admin === true ? <Dropdown.Item href="/admin">Admin</Dropdown.Item> : null}
                      </PrivateRoute>
                </DropdownMenu>
         </Dropdown>
         </div>
      }
    </>
  );
}

export default App;
