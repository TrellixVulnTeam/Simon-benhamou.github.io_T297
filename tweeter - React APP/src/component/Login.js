import React, { useState } from 'react'
import { Container, Button, Row } from 'react-bootstrap'
import '../App.css';
import {createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth'
import { auth } from '../firebase-config'

function Login({submit}) {

    const [registerEmail, SetEmailRegister] = useState("")
    const [registerPassword, SetPasswordRegister] = useState("")
    const [loginEmail, SetEmailLogin] = useState("")
    const [loginPassword, SetPasswordLogin] = useState("")
    const [displayLogReg, SetDisplayLogReg]= useState(false)

    const register = async ()=>{
        try {
             await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
            submit()
        }catch(error){
            console.log(error.message)
        }
     };
     const login = async ()=>{
        try {
            await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
            submit()

        }catch(err){
            console.log(err)
        }
     };

    const signInWithGoogle = async () => {

        const provider =  new GoogleAuthProvider()
         await signInWithPopup(auth, provider)
         .then((result)=>{
             console.log(result)
             submit()
            })
         .then((error)=> {console.log(error)}) 
    }
    const registerClick = () => {
        SetDisplayLogReg(true)
    }
    const LoginClick = () => {
        SetDisplayLogReg(false)

    }
    return (
        <Container>
                {displayLogReg === false ?<div>
                <Row className="justify-content-md-center d-block">
                <h1 style={{marginTop:"2rem"}}> Log in </h1>
                </Row>
                <Row className="justify-content-md-center d-block">
                <input onChange={(event)=> SetEmailLogin(event.target.value)} name="email"  style={{width:"30%"}} placeholder="Email..."></input>
                </Row>
                <Row className="justify-content-md-center d-block">
                <input onChange={(event)=> SetPasswordLogin(event.target.value)} name="password" style={{width:"30%"}} placeholder="Password..."></input>
                </Row>
                <div className="justify-content-md-center d-block">
                <Button onClick={login} style={{marginTop:"2rem"}}>Log in</Button>
                <span  className="registerLink" onClick={registerClick}> register</span>
                <Button onClick={signInWithGoogle} className="signinGoogle">Sign in with Google </Button>
                </div>
                
                
                </div> : null }

                
                {displayLogReg === true ? <div>
                 <Row className="justify-content-md-center d-block">
                <h1 style={{marginTop:"2rem"}}> Register</h1>
                </Row>
                <Row className="justify-content-md-center d-block">
                <input onChange={(event)=> SetEmailRegister(event.target.value)} name="email"  style={{width:"30%"}} placeholder="Email..."></input>
                </Row>
                <Row className="justify-content-md-center d-block">
                <input onChange={(event)=> SetPasswordRegister(event.target.value)} name="password" style={{width:"30%"}} placeholder="Password..."></input>
                </Row>
                <Button onClick={register} style={{marginTop:"2rem"}}>Register</Button>
                <span  className="registerLink" onClick={LoginClick}> Login</span>

                </div> : null }

                
            </Container>
        )
    
}

export default Login
