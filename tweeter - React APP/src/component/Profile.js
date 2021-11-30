import React, { useState, useEffect } from 'react'
import { Container,Row} from 'react-bootstrap'
import '../App.css';
import {  PencilSquare ,Check} from "react-bootstrap-icons";
import { storage } from '../firebase-config'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'


function Profile(props) {

    const user = props.user
     const [selectedFile,setSelectedFile] = useState();
     const [previewUrl, setPreviewUrl] = useState()
     const [editAccess, setEditAccess]= useState(false)
     const [userName, SetUserName] = useState("")
    const [profile,setProfile]=useState()

     useEffect(() => {
        const profileImage = ref(storage,'users/'+ user.uid+ '/profile.jpg')
        getDownloadURL(profileImage).then(imgUrl => setProfile(imgUrl)).catch(error => console.log(error.message))
        SetUserName(user.displayName)
     }, [])

     useEffect(()=> {
         if(!selectedFile){
             return;
         }
         const fileReader = new FileReader()
         fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
         };
         fileReader.readAsDataURL(selectedFile)

     },[selectedFile])

    function chooseFile(event){
        setSelectedFile(event.target.files[0])
    }
   
    const submitHandler = () => {
        setEditAccess(false)
          props.saveUser(userName)
    }

    const saveFirebase = () => {

        const storageRef = ref(storage,'users/'+ user.uid+ '/profile.jpg')
        const metadata = {
            contentType: 'image/jpg'
        }
        uploadBytes(storageRef,selectedFile,metadata)
        .then((snapshot)=> console.log("upload successful"))
        .catch((error)=> console.log(error.message))
    }

    return (
       <Container>
                 <Row className="justify-content-md-center d-block">
                 <h1> Settings </h1>
                 </Row>
                <img className="profile-pic" src={ previewUrl || profile || user?.photoURL} alt="profile"></img>
                <div>
                <input className="button-profile-pic" type="file" name="file" accept=".jpg,.png,.jpeg" onChange={chooseFile} />
                <button onClick={saveFirebase} className="button-save-server"><Check /></button>
                 </div>
                <Row className="details">
                {editAccess === false ? 
                userName === null ? <p>Name:<span onClick={(event) => setEditAccess(true)}><PencilSquare/></span> </p>: <p> Name : {userName} <span onClick={(event) =>setEditAccess(true) }><PencilSquare /></span> </p>
                : null}

                {editAccess === true ? <div>
                <input onChange={(event) => SetUserName(event.target.value)}  style={{width:"30%"}} placeholder="username"></input>
                <button onClick={submitHandler} >Save</button></div> : null }
                <p> Email : {user?.email} </p>
                </Row> 
             </Container>
    )
}

export default Profile

