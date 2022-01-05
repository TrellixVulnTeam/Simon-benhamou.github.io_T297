import React,{useState,useEffect} from 'react'
import axios from "axios";
import {  Container,Table,Dropdown } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import { Image ,CloudinaryContext} from 'cloudinary-react'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';


export default function MyPets(props) {

    const [adoptedPets, setAdoptedPet] = useState([])
    const [wishList,setWishList] = useState([])
    const [foster,setFosterList] = useState([])
    const [relevantArray,setRelevantArray] = useState([])
    const [likeAccess,setLikeAccess] = useState(false)
    
    const { _id } = props.properties.user
   
    useEffect(() => {
        const fetchData = async() =>{
         const userAdoptedPets =  await adoptedPetsData(_id)
         const wishPets = await wishListData(_id)
         const fosteredByUser = await FosterPetData(_id)
         setWishList(wishPets)
         setAdoptedPet(userAdoptedPets)
         setFosterList(fosteredByUser)
        }

        fetchData()

    }, [])

     const adoptClick = () => {
        setRelevantArray(adoptedPets)  
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

    return (
        <Container>
            <div className='App'>
                  <CloudinaryContext cloudName="dd4kip7hd">
            
            <div className='d-flex justify-content-start m-2'>
               <Dropdown>
                        <Dropdown.Toggle variant="btn btn-outline-secondary border-0 m-2" id="dropdown-basic">
                            Type
                        </Dropdown.Toggle>
                <DropdownMenu>
                     <Dropdown.Item onClick={adoptClick}>Adopted</Dropdown.Item>
                     <Dropdown.Item onClick={fosterClick}>Fostered</Dropdown.Item>
                    <Dropdown.Item onClick={likedClick}  >Wishlist <HeartFill /></Dropdown.Item>
                </DropdownMenu>
               </Dropdown>
            </div>
           {relevantArray.length !== 0 ? 
                 <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>{relevantArray === wishList ? <HeartFill /> : relevantArray === adoptedPets ? "Adoped" : "Fostered"}</th>
                            <th>Name</th>
                            <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {relevantArray.map((element,index) => <PetLine key={index} name={element.name} image={element.image} id={element.id}/>)}
                        </tbody>
                </Table> :null}
            </CloudinaryContext>
            </div>
            
        </Container>
    )
}

function PetLine(props){
    return <tr>
      <td><Image className="usersWishlist-picture rounded-circle" publicId={props.image}  /></td>
      <td>{props.name}</td>
      <td><Link  to={"/pet/" +props.id}> See more</Link></td>
    </tr>
}
 async function wishListData(id) {
    const isLikedData = await axios.get("http://localhost:5500/users/wishlist/"+id)
    return isLikedData.data
           
    }
  async function adoptedPetsData(id) {
    const listOfAdoptedPets = await axios.get("http://localhost:5500/pets/adopted/"+id)
    return listOfAdoptedPets.data
           
    }
      async function FosterPetData(id) {
    const listOfFosterPets = await axios.get("http://localhost:5500/pets/foster/"+id)
    return listOfFosterPets.data
           
    }
 