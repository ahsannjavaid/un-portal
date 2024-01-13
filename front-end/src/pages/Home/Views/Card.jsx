import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ image, name, alt }) => {
    return (
        <Link to={alt}>
            <div className="card shadow" style={{ width: '18rem' }}>
                <img src={image} className="card-img-top" alt={alt} />
                <div className="card-body text-center">
                    <button className='btn fw-bold' style={{color: '#4D3189' , borderColor: '#4D3189'}}>{name}</button>
                </div>
            </div>
        </Link>
    )
}

export default Card