import React,{useEffect} from 'react'
import { Container, Carousel } from 'react-bootstrap';

export default function Home(props) {
    
    const {setAdmin} = props

    useEffect(() => {

      setAdmin(false)

    }, [])

    return (   
    <div className="App">
        <h3 className='my-3'>Welcome to Adopt-Center </h3>
        <p className='my-3'> Taking care of ours pets is our priority.</p>
        <Container className='d-flex justify-content-center'>
        <Carousel  variant="light">
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://www.purina.co.uk/sites/default/files/2020-12/Outdoor%20Dog%20GamesHERO.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h5>Dog playing</h5>
                <p>What's your favorite? Adopt-Centers is here to make your life easier and find the right buddy.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://www.sciencealert.com/images/2020-09/processed/walk-fish-1_1024.jpg"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h5>Nemo is waiting for you</h5>
                <p>Adopt it anyway he will forget after the next 8 seconds.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://www.advantagepetcare.com.au/sites/g/files/adhwdz311/files/styles/paragraph_image/public/2019-08/cat-eating-out-of-bowl.jpg"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h5>Find the right dog </h5>
                <p> Play, enjoy, smile.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </Container>
        <div className='d-block  m-4'>
            <p style={
                {
                    position:"relative",
                    bottom:"0",
                    width:"100%",
                    textAlign:"center"
                }
            }>
                Copyright &copy; {new Date().getFullYear()} Simon Benhamou
            </p>
        </div>
    </div>
    )
}
