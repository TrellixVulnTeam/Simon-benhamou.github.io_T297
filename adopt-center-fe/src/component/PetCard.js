import React from 'react'
import {Link} from 'react-router-dom';
import { Image ,CloudinaryContext} from 'cloudinary-react'

export default function PetCard(props) {

    return(
            <div className="row justify-content-center">
                <div className="my-cards rounded">
                      <CloudinaryContext cloudName="dd4kip7hd">
                            <Image className="mt-2 rounded w-50" publicId={props.image}  />
                    </CloudinaryContext>
                    <h4>{props.name}</h4>
                    <div className="mb-2 d-flex justify-content-start">
                        <span className="border border-warning rounded-pill m-2 p-2">{props.status}</span>
                        <span  className="m-2 p-2 seeMore"><Link  to={"/pet/" +props.id}> See more</Link></span>
                    </div>
                </div>
            </div>

    )
}
