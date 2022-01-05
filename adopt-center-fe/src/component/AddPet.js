import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Form,Col} from 'react-bootstrap'
import{v4 as uuidv4 } from 'uuid'
import AccessDenied from './AccessDenied';

export default function AddPet(props) {
    const [type,setType] = useState("")
    const [name,setName] = useState("")
    const [image,setImage] = useState("")
    const [color,setColor] = useState("")
    const [weight,setWeight] = useState("")
    const [height,setHeight] = useState("")
    const [bio,setBio] = useState("")
    const [hypoallergenic,setHypoallergenic] = useState("no")
    const [dietaryRestriction,setDietaryRestriction] = useState("")
    const [breedOfAnimal,setBreedOfAnimal] = useState("")
    const [success, setSuccess] = useState(false)
    const [failedMessage,setFailedMessage] = useState("")
    const [failed, setFailed] = useState(false)
    const {setAdmin,user} = props.properties

    useEffect(() => {
        if(user.admin){
            setAdmin(true)
        }else{
            setAdmin(false)   
        }
    }, [user.admin])

    const addButton = async (e) => {
            e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append('id',uuidv4());
        bodyFormData.append('type',type);
        bodyFormData.append('name',name);
        bodyFormData.append('status',"Available");
        bodyFormData.append('image',image);
        bodyFormData.append('color',color);
        bodyFormData.append('weight',weight);
        bodyFormData.append('height',height);
        bodyFormData.append('bio',bio);
        bodyFormData.append('hypoallergenic',hypoallergenic);
        bodyFormData.append('dietaryRestriction',dietaryRestriction);
        bodyFormData.append('breedOfAnimal',breedOfAnimal);
        bodyFormData.append('fosterBy',"none");
        bodyFormData.append('adoptedBy',"none");
        await axios({
                 method:'post',
                 url:"http://localhost:5500/pets/add",
                 data: bodyFormData,
                 headers: {"Content-Type": "multipart/form-data"}
        }).then((response)=> {
                setSuccess(true)
                setTimeout(()=>   window.location.reload(false),[3000])      
        })
        .catch(err =>  {
            setSuccess(false)
            setFailed(true)
            setFailedMessage(err)
        })     
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        setImage(file)
  }
    
    return (
            <Col>
          <div className="row justify-content-center">
                <div className="m-5 my-cards w-75 addpetcard rounded">
            {user.admin === true ?
                <Form >
                    <div className='d-flex m-2'> 
                    <select defaultValue={"Type"} onChange={(e)=> setType(e.target.value)} className="form-select my-4 w-50"  aria-label="Default select example">
                            <option value="Type">Type</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Fish">Fish</option>
                            <option value="Hamster">Hamster</option>
                            <option value="Turtle">Turtle</option>
                     </select>
                    <Form.Group className="my-4 w-50" controlId="formBasicPassword">
                        <Form.Control type="text"onChange={(e)=> setName(e.target.value)} placeholder=" what's his name ?" />
                    </Form.Group>
                    </div>
                    <div className='d-flex m-2'> 
                     <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setColor(e.target.value)} placeholder="white, blue, whatever.." />
                    </Form.Group>
                     <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setBio(e.target.value)} placeholder="What's his story ? " />
                    </Form.Group>
                      </div>
                    <div className='d-flex m-2'> 
                    <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type="text"onChange={(e)=> setWeight(e.target.value)} placeholder="Weight.." />
                    </Form.Group>
                    <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Height</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setHeight(e.target.value)} placeholder="Height.." />
                    </Form.Group>
                     </div>

                   <div className='d-flex m-2'> 
                    <Form.Group className="my-4 w-50" controlId="formBasicPassword">
                    <Form.Label>Hypoallergenic</Form.Label>
                        <select defaultValue={"no"}  onChange={(e)=> setHypoallergenic(e.target.value)} className="form-select "  aria-label="Default select example">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                         </Form.Group>
                     <Form.Group className="my-4 w-50" controlId="formBasicPassword">
                        <Form.Label>Dietary restriction</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setDietaryRestriction(e.target.value)} placeholder="Any food restriction ? " />
                    </Form.Group>
                     </div>
                    <div className='d-flex m-2'> 
                     <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                        <Form.Label>Breed of animal</Form.Label>
                        <select defaultValue={"poodle"}  onChange={(e)=> setBreedOfAnimal(e.target.value)} className="form-select"  aria-label="Default select example">
                            <option value="poodle">Poodle</option>
                            <option value="siamese">Siamese</option> 
                        </select>
                    </Form.Group>
                     <Form.Group controlId="formFile" className="mb-3 w-50">
                        <Form.Label>Add a picture</Form.Label>
                        <Form.Control  onChange={handleImageChange} type="file" />
                    </Form.Group>
                      </div>
                    <button className='btn btn-outline-secondary m-2' onClick={addButton} variant="primary" > Add a new pet</button>
                    {success === true ? <div className='d-inline-flex alert alert-success m-2 p-1 w-30' > Successfully saved, thank you !</div> : null }
                    {failed === true ? <div className='alert alert-danger w-50'>{failedMessage}</div> : null }
                    </Form>
                
            : <AccessDenied />}
        </div>
     </div>
     </Col>

    )
}
