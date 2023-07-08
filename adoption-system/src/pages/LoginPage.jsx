import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import { Navbar } from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { DashboardPage } from './DashboardPage/DashboardPage'
import { AuthContext } from '../Index'

import '../assets/vendor/css/core.css'
import '../assets/vendor/css/theme-default.css'
import '../assets/css/demo.css'
import '../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../assets/vendor/css/pages/page-auth.css'
import '../assets/vendor/js/helpers.js'
import '../assets/js/config.js'
import "../assets/vendor/libs/jquery/jquery.js"
import "../assets/vendor/libs/popper/popper.js"
import "../assets/vendor/js/bootstrap.js"
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"
import "../assets/vendor/js/menu.js"
import "../assets/js/main.js"



export const LoginPage = () => {

    const {loggedIn, setLoggedIn, setDataUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const login = async(e)=>{
        try {
            e.preventDefault() //Evita que el evento al darle al boton recargue la pagina
            const {data} = await axios.post('http://localhost:3000/user/login', form)
            if (data.message) {
                alert(data.message)
                localStorage.setItem('token', data.token)
                setDataUser(data.userLogged)
                /* localStorage.setItem('name', data.userLogged.name)
                localStorage.setItem('username', data.userLogged.username)
                localStorage.setItem('role', data.userLogged.role) */

                setLoggedIn(true)
                navigate('/dashboard')
            }
        } catch (err) {
            console.log(err)
            alert(err.response?.data.message)
            throw new Error('Error login user')
        }
        
    }

    return (

        <>
            
            <Navbar></Navbar>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        
                        <div className="card">
                            <div className="card-body">
                                
                                <div className="app-brand justify-content-center">
                                    <a className="app-brand-link gap-2">
                                        
                                        <span className="app-brand-text demo text-body fw-bolder">Adoption System</span>
                                    </a>
                                </div>
                                
                                <h4 className="mb-2">Welcome to Adoption System! 👋</h4>
                                <p className="mb-4">Please sign-in to your account.</p>

                                <form id="formAuthentication" className="mb-3">
                                    <div className="mb-3">
                                        <label  className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            
                                            onChange={handleChange} 
                                            name='username'
                                            placeholder="Enter your username"
                                            
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <a href="#">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="form-control"
                                                onChange={handleChange} 
                                                name='password'
                                               
                                                
                                            />
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" />
                                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={(e) => login(e)} className="btn btn-primary d-grid w-100">Sign in</button>
                                    </div>
                                </form>

                                <p className="text-center">
                                    <span>New on our platform?</span>
                                    <a href="#">
                                        <span> Create an account</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </>

    )
}
