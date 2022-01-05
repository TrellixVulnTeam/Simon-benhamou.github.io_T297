import React,{useState}from 'react'
import { Modal,Button ,Form} from 'react-bootstrap';
import{v4 as uuidv4 } from 'uuid'
import axios from "axios";

export default function Login(props) {

  const {show,setShow,setAuth,setUser,navigate} = props.shows
  const [loginAccess,SetAccess] = useState(false)
  const [error, setError]= useState("")

  const handleClose = () => props.shows.setShow(false);

  const handleLogin = async (userInput) => {
    try {
        const response = await axios.post("http://localhost:5500/users/login",userInput)
          if(response){
          localStorage.setItem('token',response.data)
          setUser(JSON.parse(atob(response.data.split('.')[1])))
          setAuth(true)
          setShow(false)
          navigate("/")
          }   
      }catch(err) {
        setError(JSON.stringify(err.response.data))
      }
  }

  const handleSignup = async (userInput) => {
      try {
        const response = await axios.post("http://localhost:5500/users/signup",userInput)
          if(response){
          localStorage.setItem('token',response.data)
          setUser(JSON.parse(atob(response.data.split('.')[1])))
          setAuth(true)
          setShow(false)
          }   
      }catch(err) {
        setError(JSON.stringify(err.response.data))
      }
  }
  return (
    <> 
    { loginAccess === true ? <SignUp properties={{show,handleClose,SetAccess,handleSignup,error}}/> 
       : <LoginForm properties={{show,handleClose,SetAccess,loginAccess,handleLogin,error}} />} 
    </>
  );
}

function SignUp(props){
  const {show,handleClose,SetAccess,handleSignup,error} = props.properties

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [phone,setPhone] = useState(0)

    function signUpButton(){
     handleSignup({
        userID: uuidv4(),
        email : email,
        password: password,
        firstName: firstName,
        lastName:lastName,
        phoneNumber: phone,
        createdDate: JSON.stringify(Date.now()),
        admin : false,
        bio : "default",
        wishList:[]
      })
    }
    function submitValidation(){
      if(password.length >= 8 && email.includes("@") && 
      email.includes(".") && password === confirmPassword && 
      firstName.length >2  && lastName.length >2 && phone.length === 10) {
        return false
      }else 
      return true;
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up <span onClick={(e)=> SetAccess(false)} className="loginButton">Log in</span> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
           
            <Form>
             <Form.Group className="mb-3" controlId="formBasicEmail">
                         <Form.Control onChange={(e)=> setEmail(e.target.value)} isValid={email.includes("@") && email.includes(".")} type="email" placeholder="Email..." />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Control onChange={(e) => setPassword(e.target.value)} isValid={password.length >= 8} type="password" placeholder="password" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Control onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={password !== confirmPassword} isValid={ password === "" ? false : password === confirmPassword} type="password" placeholder="Retype Password" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                         <Form.Control onChange={(e) => setFirstName(e.target.value)} isValid={firstName.length >2} type="text" placeholder="First name" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                         <Form.Control onChange={(e) => setLastName(e.target.value)} isValid={lastName.length >2} type="text" placeholder="Last Name" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                         <Form.Control onChange={(e) => setPhone(e.target.value)} isValid={phone.length === 10} placeholder="Phone Number" />
            </Form.Group>
            {error !== "" ? <Form.Text  className="alert alert-danger error">{error}</Form.Text> : null}
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" disabled={submitValidation()} onClick={signUpButton}>Sign up</Button>
        </Modal.Footer>
      </Modal>

    )
}

function LoginForm(props){
  
    const {show,handleClose,SetAccess,loginAccess,handleLogin,error} = props.properties
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")

    function loginButton(){
      handleLogin({email : email,password : password})
    }

    return (
        < Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {loginAccess === true ? "Sign up" : "Login in" }<span  onClick={(e)=> SetAccess(true)} className="loginButton"> {loginAccess === false ? "Sign up" : "Login in" }</span> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" onChange={(e)=> {setEmail(e.target.value)}}  isValid={email.includes("@") && email.includes(".")} placeholder="Email..." />
                </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password"  onChange={(e)=> setPassword(e.target.value)}  isValid={password.length >= 8} placeholder="password" />
                </Form.Group>
                {error !== "" ? <Form.Text  className="alert alert-danger error">{error}</Form.Text> : null}
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={loginButton}>Log in </Button>
          </Modal.Footer>
      </Modal>
    )
}