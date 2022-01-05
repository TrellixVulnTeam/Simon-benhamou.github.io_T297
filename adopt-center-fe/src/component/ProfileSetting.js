import React,{useState,useEffect}from 'react'
import axios from "axios";
import { Container,Form} from 'react-bootstrap';
import { PencilSquare,Telephone,Envelope ,Key} from 'react-bootstrap-icons';

export default function ProfileSetting(props) {
    
    const [userDetails,setUserDetails] = useState({})
    const [editAccess, setEdit] = useState(false)
    const {_id} = props.properties.user

    useEffect(() => {
        const fetchData = async() =>{
           const user =  await getUserDetails(_id)
            return  setUserDetails(user)
        }
        fetchData()
    }, [])

    async function getUserDetails (id){
        try{
           const user =  await axios.get("http://localhost:5500/users/"+ id)
            return user.data
        }catch(err){
            console.log(err)
        }
    }

    return (
        <Container className=' m-5 d-inline-flex'>
             <img  className="rounded-circle profile-image" src="https://picsum.photos/200/300?random=2" alt="" />
             {editAccess === false ? <Profile properties={{userDetails,setEdit}} />: <Settings properties={{userDetails,setEdit,setUserDetails,_id}}/> }
        </Container>
    )
}

function Profile (props) {
    const {userDetails,setEdit} = props.properties

    return <div className='m-5'>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Settings <span onClick={(e)=> setEdit(true)}><PencilSquare /></span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">Name:</th>

                    <td>{userDetails.firstName } {userDetails.lastName}</td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">Bio</th>
                    <td>{userDetails.bio}</td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row"><Envelope /></th>
                    <td>{userDetails.email}</td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row"><Key /></th>
                    <td>********</td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row"><Telephone /></th>
                    <td>{userDetails.phoneNumber}</td>
                    <td></td>
                    <td></td>
                    </tr>
                   
                </tbody>
                </table>
                </div> 
}

function Settings(props) {

     const {userDetails,setEdit,setUserDetails,_id} = props.properties
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [error,setError] = useState("")

      function changeHandler(event){

        const {name, value} = event.target;

        setUserDetails(preValue => {
            return {
                ...preValue,[name]: value
            }
        })
    }
     const saveButton = async () => {
         

        if(password !== ""){

        axios.put("http://localhost:5500/users/profileSetting/password/"+_id, {password: password})
        .then(response => { console.log(response)})
        .catch(error => console.log(error))

        }

        axios.put("http://localhost:5500/users/profileSetting/"+_id, {details: userDetails})
        .then(response => { 
            setUserDetails(response.data)
            setEdit(false)
        }).catch(error => setError(JSON.stringify(error.response.data)))
    }

     return <div className='m-5'> 
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">Name:</th>

                    <td><Form.Control  placeholder='first name ...' name="firstName" onChange={changeHandler} width="50%"/></td>
                    <td><Form.Control placeholder='last name...' name="lastName" onChange={changeHandler} width="50%"/></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">Bio</th>
                    <td><Form.Control  placeholder="What's your story..."name="bio" onChange={changeHandler} width="50%"/></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row"><Envelope /></th>
                    <td><Form.Control placeholder='Email...' name="email" onChange={changeHandler} width="50%"/></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row"><Key /></th>
                    <td><Form.Control  isValid={password.length>=8}type="password" placeholder='New password...' name="password" onChange={(e)=> setPassword(e.target.value)} width="50%"/></td>
                    <td><Form.Control  isInvalid={password !== confirmPassword} isValid={password === confirmPassword && password.length>0} type="password" placeholder='confirm password' name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} width="50%"/></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row"><Telephone /></th>
                    <td><Form.Control placeholder='Phone number...' name="phoneNumber" onChange={changeHandler} width="50%"/></td>
                    <td></td>
                    <td></td>
                    </tr>
                   
                </tbody>
                </table>
                 <button type="button" className='btn btn-outline-secondary m-2' disabled={password !== confirmPassword} onClick={saveButton}> Save </button>
                {error !== "" ? <span  className=" alert alert-danger error">{error}</span> : null}
            </div>
}