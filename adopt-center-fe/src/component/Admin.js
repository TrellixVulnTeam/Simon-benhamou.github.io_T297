import axios from 'axios';
import React ,{useEffect,useState} from 'react'
import { Container,Col } from 'react-bootstrap';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import {Chart, ArcElement} from 'chart.js'
import AccessDenied from './AccessDenied';

Chart.register(ArcElement);

export default function Admin(props) {
    const {setAdmin,user} = props.properties
    const [nbUser, setNbUser] = useState(0)
    const [nbPets, setNbPets] = useState(0)
    const [nbLiked, setNbLiked] = useState(0)
    const [nbFoster,setNbFoster] = useState(0)
    const [nbAdopted,setNbAdopted] = useState(0)

    useEffect(() => {
        if(user.admin){
            setAdmin(true)
        }else{
            setAdmin(false)
        }

        const getUserInfo = async () => {
                const res = await fetchData()
                const pets = await fetchPetData()
                const Wishlist = await AllWishList()
                const adopted = await AllAdoptedPets()
                const foster = await AllFosteredPets()
                
                const relevantAdoptedPets= adopted.filter(element => element !== null )
                const relevantFosteredPets = foster.filter(element => element !== null)

                setNbUser(res.data.length)
                setNbPets(pets.data.pets.length)
                setNbLiked(Wishlist.length)
                setNbFoster(relevantFosteredPets.length)
                setNbAdopted(relevantAdoptedPets.length)
            }
            getUserInfo()
      
    }, [user.admin])

    const fetchData = async () => {
            const res = await axios.get("http://localhost:5500/users/")
            return res
        }

    const fetchPetData = async () => {
            const res = await axios.get("http://localhost:5500/pets/")
            return res
        }

    async function AllWishList() {
        const wishlist = await axios.get("http://localhost:5500/users/wishlist")
        return wishlist.data
    }

    async function AllAdoptedPets() {
        const adopted = await axios.get("http://localhost:5500/pets/adopted")
        return adopted.data
    }

    async function AllFosteredPets() {
        const fostered = await axios.get("http://localhost:5500/pets/foster")
        return fostered.data
    }
 
    return (<>
        {user.admin === true ? 
        <Col className='w-50'>
           <div className='App mt-4'>
                <h3>Dashboard</h3>
                    <Container className='d-flex justify-content-center w-25'>
                        {nbPets !== 0 && nbUser !== 0 ? <ChartsPie label1="pets" label2="users" first={nbPets} second={nbUser}></ChartsPie> : null }
                        {nbLiked !== 0 && nbFoster !== 0 && nbAdopted !== 0 ? <ChartsPie label2="Fostered pets" second={nbFoster} label4="Adopted pets" four={nbAdopted} label3="likes" third={nbLiked}></ChartsPie> : null }
                    </Container>     
            </div> 
         </Col>
        : <AccessDenied /> }
    </>  
    )
}
function ChartsPie (props) {
    const {first,second,third,four,label2,label1,label3,label4}  = props
    const dataDoughnut =  {
                    labels: [label1, label2,label3,label4],
                        datasets: [
                        {
                            data: [first,second, third,four],
                            backgroundColor: ["#F7464A", "#46BFBD","#F2E205","#F26716"],
                            hoverBackgroundColor: [
                            "#FF5A5E",
                            "#5AD3D1",
                            "#F2EEB3",
                            "#F2994B"
                            ]
                        }
                        ]   
                    }

  return <MDBContainer className='m-5'>
      <div className='d-flex'>
      <Doughnut data={dataDoughnut} options={{ responsive: true }} />
        <div className='display-details p-3'>     
            <p className='first'> {label1} {first}</p>
            <p className='second'> {label2} {second}</p>
            <p className='third'> {label3} {third}</p>
            <p className='four'>  {label4} {four}</p>
        </div>
      </div>
    </MDBContainer>
}


 