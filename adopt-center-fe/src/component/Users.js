import React ,{useState,useEffect}from 'react'
import axios from "axios";
import { Container ,Table,Dropdown,Col} from 'react-bootstrap';
import { HeartFill,Telephone,Envelope } from 'react-bootstrap-icons';
import { Image ,CloudinaryContext} from 'cloudinary-react'
import {Link} from 'react-router-dom';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import AccessDenied from './AccessDenied';

export default function Users(props) {

        const {user,setAdmin} = props.properties   
        const [users, setUsers] =  useState([])

    useEffect(() => {
        if(user.admin){
           setAdmin(true)
        }else{
            setAdmin(false)
        }
        const fetchData = async() => {
            const usersData = await getUserData()
            setUsers(usersData)
        }

        fetchData();
    }, [user.admin])
    
     async function getUserData() {
         try{
            const response = await axios.get(`http://localhost:5500/users/`);
            return response.data;

         }catch(err){
             console.log(err)
         }
    }

    return (
        <Container className='m-7'>
            {user.admin === true ? <div className=' mt-4'>
               {
                   users.map((element,index) => {
                       return <UserCard key={index} admin={element.admin} firstName={element.firstName} bio={element.bio}lastName={element.lastName} email={element.email} phoneNumber={element.phoneNumber} id={element._id} wishList={element.wishList} />
                   })
               }
            </div> :<AccessDenied /> }

        </Container>
    ) 
}

function UserCard(props){

    const {firstName,lastName,phoneNumber,email,admin,wishList,id,bio} = props
    const [adopted ,setAdopted]= useState([])
    const [foster,setFosterPet] = useState([])
    const [relevantArray, setRelevantArray] = useState([])
    const [likeAccess,setLikeAccess] = useState(false)

    async function adoptedPetsData(id) {
    const listOfAdoptedPets = await axios.get("http://localhost:5500/pets/adopted/"+id)
    return listOfAdoptedPets.data
           
    }
     async function FosterPetData(id) {
    const listOfFosterPets = await axios.get("http://localhost:5500/pets/foster/"+id)
    return listOfFosterPets.data
           
    }

    useEffect(()=>{

        let isMounted = true; 

        const fetchData = async () => {
         const userAdoptedPets =  await adoptedPetsData(id)
         const fosterPetsData = await FosterPetData(id)

         if(isMounted){
            setAdopted(userAdoptedPets)
            setFosterPet(fosterPetsData)
         }
        }
        fetchData()
        return () => { isMounted = false };
    },[])

    const adoptClick = () => {
        setRelevantArray(adopted)  
        setLikeAccess(false)

    }
    const fosterClick = () => {
        setRelevantArray(foster)
        setLikeAccess(false)

    }
    const likedClick = () => {
        setLikeAccess(true)
        setRelevantArray(wishList)
    }

    return(
    <Col className='m-3'>
         <div className="card text-center m-3 w-75">
             <CloudinaryContext cloudName="dd4kip7hd">
                <div className="card-header">
                
                    <div className="d-flex justify-content-start"> 
                    <img  className="rounded-circle users-image" src="https://picsum.photos/200/300?random=2" alt="" /> 
                    <div className='m-2'>{firstName} {lastName}{admin === true ? "(admin)" : null}</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-start"> 
                        <Telephone />
                        <span className='mx-2 '>{phoneNumber}</span>
                     </div>
                    <div className="d-flex justify-content-start">
                        <Envelope />
                        <span className='mx-2 '>{email}</span>
                    </div>
                    <div className="card-text">{bio==="default" ? null : bio}</div>
                </div>
                <div className='d-flex justify-content-start m-2'>
                <Dropdown>
                <Dropdown.Toggle variant="btn btn-outline-secondary m-2 border-0" id="dropdown-basic">Type</Dropdown.Toggle>
                    <DropdownMenu>
                        <Dropdown.Item onClick={adoptClick}>Adopted</Dropdown.Item>
                        <Dropdown.Item onClick={fosterClick}>Fostered</Dropdown.Item>
                        <Dropdown.Item onClick={likedClick}  >Wishlist <HeartFill /> </Dropdown.Item>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="card-footer  text-muted">
                {relevantArray.length !== 0 ? 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>{relevantArray === wishList ? <HeartFill /> : relevantArray === adopted ? "Adoped" : "Fostered"}</th>
                            <th>Name</th>
                            <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relevantArray.map((element,index) => <PetLine key={index} name={element.name} image={element.image} id={element.id}/>)}
                        </tbody>
                    </Table> : null}
                </div>
            </CloudinaryContext> 
        </div>
</Col>)
}

function PetLine(props){

    const {name,image,id} = props

    return <tr>
      <td><Image className="usersWishlist-picture rounded-circle" publicId={image}  /></td>
      <td>{name}</td>
      <td><Link  to={"/pet/" +id}> See more</Link></td>
    </tr>  
}