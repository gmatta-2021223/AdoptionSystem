import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// yarn add @popperjs/core

export const RegisterPage = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        surname: '',
        userame: '',
        password: '',
        email: '',
        phone: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const register = async (e) => {
        try {
            e.preventDefault() //Evita que el evento al darle al boton recargue la pagina
            const { data } = await axios.post('http://localhost:3000/user/register', form)
            if (data.message) {
                alert(data.message)
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
            throw new Error('Error registering user')
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

                                <form id="formAuthentication" className="mb-3">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"

                                            onChange={handleChange}
                                            name='name'
                                            placeholder="Enter your name"

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Surname</label>
                                        <input
                                            type="text"
                                            className="form-control"

                                            onChange={handleChange}
                                            name='surname'
                                            placeholder="Enter your surname"

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"

                                            onChange={handleChange}
                                            name='username'
                                            placeholder="Enter your username"

                                        />
                                    </div>

                                    <div className="mb-3 form-password-toggle">

                                        <label className="form-label" htmlFor="password">Password</label>


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
                                        <label className="form-label">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"

                                            onChange={handleChange}
                                            name='email'
                                            placeholder="Enter your email address"

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"

                                            onChange={handleChange}
                                            name='phone'
                                            placeholder="Enter your number phone"

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" />
                                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={(e) => register(e)} className="btn btn-primary d-grid w-100">Sign up</button>
                                    </div>
                                </form>

                                <p className="text-center">
                                    <span>Already have an account?</span>
                                    <a href="#">
                                        <span> Sign in instead</span>
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
