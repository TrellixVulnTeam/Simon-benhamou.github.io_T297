import React, {useState, useEffect } from 'react';
import {Container,Button ,Form} from 'react-bootstrap';
import axios from "axios";
import PetCard from './PetCard';

export default function Search() {

    const [request, setRequest] = useState({})
    const [data, setData] = useState([])

    async function getData() {
    const response = await axios.get("http://localhost:5500/pets");
    return response.data.pets;
    }
    useEffect(() => {
        const fetchData = async () => {
           const data =  await getData()
            return setData(data)
        }
         fetchData()
    }, [])

const filteredData = filterHandler(data,request)

    return (
        <div className="App">
            <Container>
                <h3 className='my-4'> Search for a pet </h3>
                <FormRequest properties={{setRequest}}/>
                {
                    filteredData.map((element,index) => <PetCard key={index} id ={element.id} name={element.name} status={element.status} image ={element.image}/> )
                }
            </Container>
        </div>
    )
}

function FormRequest(props){
     const  defaultRequest = {
            type : "",
            status : "",
            name:"",
            minHeight:"",
            maxHeight:"",
            minWeight:"",
            maxWeight:""
    }
    const [requestDetails, SetRequestDetails] = useState(defaultRequest)

    function changeHandler(event){

        const {name, value} = event.target;

        SetRequestDetails(preValue => {
            return {
                ...preValue,[name]: value
            }
        })
    }

    function request(){
         props.properties.setRequest({
             type : requestDetails.type,
             adoptionStatus: requestDetails.status,
             name : requestDetails.name,
             minHeight : requestDetails.minHeight,
             maxHeight : requestDetails.maxHeight, 
             minWeight: requestDetails.minWeight,
             maxWeight: requestDetails.maxWeight
         })
    }

    return (
        <Container>
            <div className="row justify-content-center mt-2">
                <select  name="type" defaultValue={"Type"} onChange={changeHandler} className="form-select w-50"  aria-label="Default select example">
                    <option value="Type">Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Fish">Fish</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Turtle">Turtle</option>
                </select>
                
            </div>

            <div className="row justify-content-center mt-2">
                <select name="status" defaultValue={"Adoption status"}  onChange={changeHandler} className="form-select w-50"  aria-label="Default select example">
                    <option value="Adoption status">Adoption status</option>
                    <option value="Available">Available</option>
                    <option value="Fostered">Fostered</option>
                    <option value="Adopted">Adopted</option>
                </select>
            </div>
            <div className="row justify-content-center mt-2">
                <Form.Control name="name" onChange={changeHandler} className="w-50" type="text"  placeholder="Name" />
            </div>
            <div className="row justify-content-center mt-2">
                <Form.Control name="minHeight" onChange={changeHandler} className="w-25" type="text" placeholder="Min Height in CM" />
                <Form.Control name="maxHeight" onChange={changeHandler} className="w-25" type="text" placeholder="Max Height in CM" />
            </div>
            <div className="row justify-content-center mt-2">
                <Form.Control name="minWeight" onChange={changeHandler} className="w-25" type="text" placeholder="Min Weight in KG" />
                <Form.Control name="maxWeight" onChange={changeHandler} className="w-25" type="text" placeholder="Max Weight in KG" />
            </div>
            <Button onClick={request} disabled={requestDetails.type === ("Type" || "") && requestDetails.status === ("Adoption status" || "") && requestDetails.name === "" } className="mt-3">Search</Button>
        </Container>
    )
}

 function filterHandler(data,request){
     return data.filter((element) =>{
        if(request.type !== "Type" && request.type !== ""){
            return element.type === request.type
        }else{
            return element
        }
     }).filter((element) => {
         if(request.adoptionStatus !== "Adoption status" && request.adoptionStatus !== ""){
             return element.status === request.adoptionStatus
         }else{
             return element
         }
     })
     .filter((element)=> { 
         if(request.name !== ""){
             return element.name.includes(request.name)
         }else{
             return element
         }
     }).filter((element) => {
         if(request.minWeight !== "" || request.maxWeight !== ""){

             if(request.minWeight !== "" && request.maxWeight !== ""){
                 return Number(element.weight) >= Number(request.minWeight) && Number(element.weight) <= Number(request.maxWeight)
             }
             if(request.minWeight !== ""){
                 return Number(element.weight) >= Number(request.minWeight)
             }
             if(request.maxWeight !== "")
             {
                return Number(element.weight) <= Number(request.maxWeight)
             }
         }else{
            return element
         }
     }).filter((element) => {
         if(request.minHeight !== "" || request.maxHeight !== ""){

             if(request.minHeight !== "" && request.maxHeight !== ""){
                 return Number(element.height) >= Number(request.minHeight) && Number(element.weight) <= Number(request.maxHeight)
             }
             if(request.minHeight !== ""){
                 return Number(element.height) >= Number(request.minHeight)
             }
             if(request.maxHeight !== "")
             {
                return Number(element.height) <= Number(request.maxHeight)
             }
         }else{
            return element
         }
     })
 }
