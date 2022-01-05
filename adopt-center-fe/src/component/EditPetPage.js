import React,{useState,useEffect } from 'react'
import axios from "axios";
import { Image } from 'cloudinary-react'
import { Form} from 'react-bootstrap';

export default function EditPetPage(props) {
    
        const {setEdit,petData,setPetData} = props.properties

        const [image , setImage] = useState()
        const [AllUsers,setAllUsers]=useState([])
        const [selectedUser, setSelectedUser] = useState("")

    useEffect(()=>{
           const fetchData = async() => {
            const data = await getUsers()
            setAllUsers(data)
        }
        fetchData();
    },[])

    useEffect(()=>{
        if(petData.status === "Available"){
                        console.log("Available")
            setPetData(preValue => {
                return {
                    ...preValue,fosterBy: "none"
                }
            })
            setPetData(preValue => {
                return {
                    ...preValue, adoptedBy: "none"
                }
            })
        }else if(petData.status === "Fostered"){
            console.log("Fostered")

            setPetData(preValue => {
                return {
                    ...preValue,fosterBy: selectedUser 
                }
            })
             setPetData(preValue => {
                return {
                    ...preValue, adoptedBy:"none"
                }
            })
        }else if (petData.status === "Adopted"){
            console.log("Adopted")

              setPetData(preValue => {
                return {
                    ...preValue, adoptedBy: selectedUser
                }
            })
            setPetData(preValue => {
                return {
                    ...preValue,fosterBy: "none"
                }
            })
        }

    },[petData.status,selectedUser])

    const changeHandler = (event) => {
            const {name, value} = event.target;

            if(value !== "default") {
                if(name === "selectedUser"){
                    setSelectedUser(value)
                }else{

                setPetData(preValue => {
                    return {
                        ...preValue,[name]: value
                    }
                })
            }
            }
        }
      
    const saveAction = async  () => {
    let bodyFormData = new FormData();
        bodyFormData.append('type',petData.type);
        bodyFormData.append('name',petData.name);
        bodyFormData.append('status',petData.status);
        bodyFormData.append('image', image);
        bodyFormData.append('color',petData.color);
        bodyFormData.append('weight',petData.weight);
        bodyFormData.append('height',petData.height);
        bodyFormData.append('bio',petData.bio);
        bodyFormData.append('hypoallergenic',petData.Hypoallergenic);
        bodyFormData.append('dietaryRestriction',petData.dietaryRestriction);
        bodyFormData.append('breedOfAnimal',petData.breedOfAnimal);
        bodyFormData.append('fosterBy',petData.fosterBy);
        bodyFormData.append('adoptedBy',petData.adoptedBy);

        await axios({
                 method:'put',
                 url:"http://localhost:5500/pets/update/"+petData.id,
                 data: bodyFormData,
                 headers: {"Content-Type": "multipart/form-data"}
        }).then((response)=> {
            if(response.data !== "pet successfully updated") {
                setPetData(preValue => {
                return {
                    ...preValue, image: response.data
                }
            })
            }
                setEdit(false)
        })
        .catch(err =>  {
            console.log(err)
        })     
    }  

    return  <> 
        <div>
         <Image className="mt-2 rounded-circle w-25" publicId={petData.image}  />
         <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">Name:</th>
                    <td><Form.Control onChange={changeHandler} name="name" placeholder={petData.name}></Form.Control></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">Bio</th>
                    <td><Form.Control onChange={changeHandler}  name="bio" placeholder={petData.bio}></Form.Control></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">Status</th>
                    <td>
                        <select onChange={changeHandler}  name="status" className="form-select w-75" defaultValue="default">
                            <option value="default"> Select a status</option>
                            <option value="Available">Available</option>
                             <option value="Fostered">Fostered</option>
                             <option value="Adopted">Adopted</option>
                        </select>
                        <select  onChange={changeHandler} name="selectedUser"  className="form-select w-75" defaultValue="default">
                            <option value="default">Select a user</option>
                            {AllUsers.map((element,index) => <option key={index} value={element._id}>{element.firstName} {element.lastName}</option>)}
                        </select>
                        </td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">color:</th>
                    <td><Form.Control onChange={changeHandler}  name="color" placeholder={petData.color}></Form.Control></td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">Weight:</th>
                    <td><Form.Control onChange={changeHandler}  name="weight"placeholder={petData.weight}></Form.Control></td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">Height:</th>
                    <td><Form.Control name="height" onChange={changeHandler}  placeholder={petData.height}></Form.Control></td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">Type:</th>
                    <td>
                        <select name="type" onChange={changeHandler}  defaultValue={petData.type}  className="form-select w-75"  aria-label="Default select example">
                            <option value="Type">Type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Fish">Fish</option>
                            <option value="Hamster">Hamster</option>
                            <option value="Turtle">Turtle</option>
                         </select>
                    </td>
                    <td></td>
                    <td></td>
                    </tr>
                      <tr>
                    <th scope="row">hypoallergenic:</th>
                    <td> <select name="Hypoallergenic" onChange={changeHandler}  defaultValue={petData.Hypoallergenic}   className="form-select w-75"  aria-label="Default select example">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select></td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">Dietary restriction:</th>
                    <td><Form.Control name="dietaryRestriction"onChange={changeHandler}  placeholder={petData.dietaryRestriction}></Form.Control></td>
                    <td></td>
                    <td></td>
                    </tr>
                     <tr>
                    <th scope="row">breed of animal:</th>
                    <td>
                        <select name="breedOfAnimal" onChange={changeHandler}  defaultValue={petData.breedOfAnimal}  className="form-select w-75"  aria-label="Default select example">
                            <option value="poodle">Poodle</option>
                            <option value="siamese">Siamese</option>
                        </select>
                    </td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">Picture</th>
                    <td><Form.Control  onChange={(e)=> setImage(e.target.files[0])} type="file" /></td>
                    <td></td>
                    <td></td>
                    </tr>
                </tbody>
                </table>

        </div>
        <button  className=" btn btn-outline-secondary m-2" onClick={saveAction}>Save</button>
    </>
}
  async function getUsers() {
         try{
        const response = await axios.get(`http://localhost:5500/users/`);
        return response.data;
         }catch(err){
             console.log(err)
         }
    }
