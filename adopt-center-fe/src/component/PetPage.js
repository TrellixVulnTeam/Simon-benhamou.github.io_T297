import React,{useState,useEffect } from 'react'
import axios from "axios";
import { Heart,HeartFill,PencilSquare } from 'react-bootstrap-icons';
import { Image ,CloudinaryContext} from 'cloudinary-react'
import EditPetPage from './EditPetPage';

export default function PetPage(props) {
    
 const id = window.location.pathname.split("/").pop() 

 const [petData, setPetData] = useState({})
 const [saved,setSaved] = useState(false)
 const [adopted,setAdopted] = useState(false)
 const [disabled, setDisabled] = useState(false)
 const [user,setUser]= useState({})
 const [foster,setFoster] = useState(false)
 const [fosterByOtherUser, setFosterByOtherUser] = useState(false)
 const [auth,setAuth] = useState(false)
 const [edit,setEdit] = useState(false)

  useEffect(() => {

    fetchData()

    const token = localStorage.getItem('token')

    if(token === null){
        setAuth(false)
    }else{
        setAuth(true)
        const currentUser =  JSON.parse(atob(token.split('.')[1]))
        setUser(currentUser)
        fetchUserData(currentUser)
    }
    }, [])

    useEffect( ()=> {
         const validation = async () => {
            await isAdoptedPet(user._id,petData)
            await fosterPets(user._id,petData)
        }
        validation()

    },[isAdoptedPet,fosterPets])

    const fetchData = async () => {
           const data =  await getData(id)
           setPetData(data)
        }

    const fetchUserData = async (currentUser) =>  {
         try{
            const userWishList = await wishListData(currentUser._id)
             await isAdoptedPet(currentUser._id,petData)
            await fosterPets(currentUser._id,petData)
      
           if(userWishList.find(element => element.id === id)){
               setSaved(true)
           }
           }catch(err){
               console.log(err)
           }
    }

    async function isAdoptedPet(userID,data) {

        const isAdopted = await axios.get("http://localhost:5500/pets/adopted/"+id+"/"+userID)

        if(isAdopted.data === true ){
                setAdopted(true)          
            }else{
                setAdopted(false)
            }

        if(isAdopted.data === false  && data.status === "Adopted"){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    }

    async function fosterPets(userID,data){
        const response = await axios.get("http://localhost:5500/pets/foster/" + id + "/"+userID);
        if(response.data === true ){
            setFoster(true)
        }else{
            setFoster(false)
        }

        if(response.data === false && data.status === "Fostered"){
            setFosterByOtherUser(true)
        }else{
             setFosterByOtherUser(false)
        }
        return response.data
    }
  
    const saveAction = async () => {
        if(saved === false){
            setSaved(true)
            await axios.put("http://localhost:5500/users/wishlist/"+props.properties.user._id, {pets: petData})
        }else{
            setSaved(false)
            await axios.delete("http://localhost:5500/users/wishlist/"+props.properties.user._id, {data: {pets: petData}})
        }
    }
   
    const adoptAction = async () => {
       if(adopted === false){

            setPetData((preData) => ({ ...preData ,status: "Adopted"}))
            setAdopted(true)
            setFoster(false)

            try{
                await axios.put("http://localhost:5500/pets/adopted/" + id + "/"+ user._id)
            }catch(err){
                console.log(err)
            }

        }else{
            setPetData((preData) => ({ ...preData ,status: "Available"}))
            setAdopted(false)
            try{
                 await axios.delete("http://localhost:5500/pets/adopted/"+id)
                 await axios.delete("http://localhost:5500/pets/foster/"+id)

            }catch(err){
                console.log(err)
            }

        }
    }

    const fosterAction = async () => {
        if(foster === false){

            setPetData((preData) => ({ ...preData ,status: "Fostered"}))
            setFoster(true)
            try{
                await axios.put("http://localhost:5500/pets/foster/" + id + "/"+ user._id)

            }catch(err){
                console.log(err)
            }

        }else{
            setPetData((preData) => ({ ...preData ,status: "Available"}))
             setFoster(false)
            try{
                 await axios.delete("http://localhost:5500/pets/foster/"+id)

            }catch(err){
                console.log(err)
            }
        }
    }
    const editPetHandler = () => {
            setEdit(true)
    }

    return (
        <div>
             <CloudinaryContext cloudName="dd4kip7hd">
            <div className="row justify-content-center">
                <div className="m-4 my-cards rounded">
                    {edit === true ? <EditPetPage properties={{setEdit,petData,setPetData,user}} /> : null}
                    
                        { edit === false ? 
                         <>
                    <div className="m-2 d-flex justify-content-start">
                        <span className="border border-warning rounded-pill p-2">{petData.status}</span>
                        <span className='m-2'>{user.admin === true? <PencilSquare onClick={editPetHandler} />:null}</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h4 className=""> Meet {petData.name}</h4>
                     </div>
                   
                    <div className="row justify-content-center" >
                            <Image className="mt-2 rounded w-50" publicId={petData.image}  />
                    </div>
                

                    <div className="mb-2 d-flex justify-content-start">
                        <span className="m-4 ">{petData.bio}</span>
                    </div>
                    <p><u>Pet details:</u> </p>
                     <div className=" d-flex justify-content-start">
                        <div className="mx-3 d-block">
                        <p className="text-muted m-0"><small>weight: {petData.weight}</small></p>
                        <p className="text-muted m-0"><small>height: {petData.height} </small></p>
                        <p className="text-muted m-0"><small>dietary restriction: {petData.dietaryRestriction}</small> </p>

                        </div>
                            <div className="mx-3 d-block">
                                <p className="text-muted m-0"><small>color: {petData.color} </small></p>
                                <p className="text-muted m-0"><small>type: {petData.type} </small></p>
                            </div>
                        <div className="mx-3 d-block">
                            <p className="text-muted m-0"><small> Hypoallergenic: {petData.Hypoallergenic}</small> </p>
                            <p className="text-muted m-0"><small>breedOfAnimal: {petData.breedOfAnimal} </small></p>
                        </div>
                    </div>
                    <div className="my-2 d-flex justify-content-start">
                        { auth === true ? <>

                    
                        {disabled === false ? 
                        <button type="button" disabled={disabled}  onClick={adoptAction} className="rounded-pill m-2 p-2 adopt" >{ adopted === false ? "Adopt" : "Return to agency"}</button> 
                        : null}
                        {petData.status === "Adopted" || fosterByOtherUser === true ? null : <div>
                        {disabled  === false  ? < button onClick={fosterAction} className='rounded-pill m-2 p-2 adopt'>  {foster === true ? "Return to Agency" : "Foster"} </button> : null} </div>}
                        <span className='m-3'>{saved === false ? <Heart onClick={saveAction} /> : <HeartFill onClick={saveAction} />}</span>

                        </> : null }
                    </div> 
                   </> :null}
                </div>
            </div>
             </CloudinaryContext>
        </div>
    )
}

 async function getData(id) {
        const response = await axios.get(`http://localhost:5500/pets/${id}`);
        return response.data.element;
    }
async function wishListData(id) {
    const isLikedData = await axios.get("http://localhost:5500/users/wishlist/"+ id)
    return isLikedData.data
    }
