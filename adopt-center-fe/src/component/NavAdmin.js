import React from 'react'
import {Link} from 'react-router-dom'
import { Nav,Col } from 'react-bootstrap';
import { Image ,CloudinaryContext} from 'cloudinary-react'


export default function NavAdmin(props) {
    return (
        <Col className="sidebar-admin "xs={2} id="sidebar-wrapper">  
            <Nav className="col-md-12 mt-5 d-none d-md-block sidebar">
                    <CloudinaryContext cloudName="dd4kip7hd">
                            <Image className="m-3 rounded w-25" publicId="Logo_f4y0gs"  />
                    </CloudinaryContext>
                
                <Nav.Link className='sidebar-menu' as={Link} to="/admin">Dashboard</Nav.Link>
                <Nav.Link className='sidebar-menu' as={Link} to="/admin/users" >Users</Nav.Link>
                <Nav.Link className='sidebar-menu' as={Link} to="/admin/add" >Add pet</Nav.Link>
                <Nav.Link className='sidebar-menu' as={Link} to="/" > Home</Nav.Link>

            </Nav>
            </Col>
    )
}
