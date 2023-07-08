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
            <div className='container'>
                <form>

                    <h3 className='text-center mt-5'>Sign Up</h3>

                    <div className="mb-3">
                        <label>Name</label>
                        <input onChange={handleChange} name='name' type="text" className="form-control" placeholder="Your name" />
                    </div>

                    <div className="mb-3 mt-2">
                        <label>Surname</label>
                        <input onChange={handleChange} name='surname' type="text" className="form-control" placeholder="Your surname" />
                    </div>

                    <div className="mb-3 mt-2">
                        <label>Username</label>
                        <input onChange={handleChange} name='username' type="text" className="form-control" placeholder="Your username" />
                    </div>

                    <div className="mb-3 mt-2">
                        <label>Password</label>
                        <input onChange={handleChange} name='password' type="text" className="form-control" placeholder="Your password" />
                    </div>

                    <div className="mb-3 mt-2">
                        <label>Email address</label>
                        <input onChange={handleChange} name='email' type="text" className="form-control" placeholder="Your email" />
                    </div>

                    <div className="mb-3 mt-2">
                        <label>Phone</label>
                        <input onChange={handleChange} name='phone' type="text" className="form-control" placeholder="Your phone" />
                    </div>

                    <div className="text-center mt-4">

                        <button onClick={(e) => register(e)} className="btn btn-primary btn-lg">
                            Sign Up
                        </button>

                    </div>

                </form>

            </div>
        </>


    )
}


