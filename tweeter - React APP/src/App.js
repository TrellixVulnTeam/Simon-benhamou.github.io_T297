import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React,{useState,useEffect}  from 'react';
import Home from './component/Home';
import Profile from './component/Profile';
import { Nav,Button } from 'react-bootstrap';
import { BoxArrowInRight} from "react-bootstrap-icons";
import Login from './component/Login'
import {auth,storage} from './firebase-config'
import { onAuthStateChanged, signOut} from 'firebase/auth'
import {ref,getDownloadURL} from 'firebase/storage'

export default  function App() {

    const [currentPage,setPage] = useState();
    const [user, setUser] = useState({})
    const [access, setAccess] = useState(true)
    const [userName, setUserName] = useState("")
    const [profile,setProfile]=useState()

   onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        
    })
    useEffect(() => {
   
      async function getImage () {
        const profileImage = ref(storage,'users/'+ user?.uid+ '/profile.jpg')
        await getDownloadURL(profileImage).then(imgUrl => setProfile(imgUrl)).catch(error => console.log(error.message))
      }
       getImage()
    }, [user])

    useEffect(() => {
          setProfile("")
          if(user === null){
            logout()
           }
   }, [user])

  const logout = async ()=>{
        await signOut(auth)
        setAccess(false)
    };

  function allowed(){
        setAccess(true)
  }

  function saveUser(userUpdate){
      setUserName(userUpdate)
  }

  function Navigation(e){
        setPage(e.target.text)
  }
    return(
     <div className="App">
      {access === false ? <Login submit={allowed}/> : null } 
      {access === true ? <div><Nav>
        
        <Nav.Item onClick={Navigation}><Nav.Link eventKey="link-1">Home</Nav.Link></Nav.Item>
        <Nav.Item onClick={Navigation}><Nav.Link eventKey="link-2">Profile</Nav.Link></Nav.Item>
      </Nav>
      <div style={{position:"absolute",top:"2%",right:"2%"}}>
      <span><img className="home-profile-image" src={profile|| user?.photoURL} alt=""></img> {userName || user?.displayName ||user?.email }</span>
      <Button style={{padding:"0rem",marginLeft:"1rem",width:"10%",paddingRight:"1rem"}}onClick={logout}><BoxArrowInRight style={{marginBottom:"0.2rem"}}/></Button>
      </div>

      {currentPage === "Profile" ? <Profile saveUser={saveUser} user={user} /> : <Home userName={userName ||user?.displayName||user?.email } />} </div>: null }
      
      </div>
  )

  
}
