import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" >AdoptionSystem</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                            <li className="nav-item">
                                <Link to='/' className="nav-link align-middle" aria-current="page" >Home</Link>
                            </li>
                        
                        
                            <li className="nav-item">
                                <Link to='/register' className="nav-link" aria-current="page" >Register</Link>
                            </li>
                        
                        
                            <li className="nav-item">
                            <Link to='/login' className="nav-link" aria-current="page" >Login</Link>
                            </li>
                        
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}
