import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navbar } from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { DashboardPage } from './DashboardPage/DashboardPage'

export const LoginPage = () => {

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
            console.log(data)
            if (data.message) {
                alert(data.message)
                localStorage.setItem('token', data.token)
                navigate('/dashboard')
            }
        } catch (err) {
            console.log(err)
            alert(err.response.data.message)
            throw new Error('Error login user')
        }
        
    }

    return (
        <>
            <Navbar></Navbar>
            <div className='container'>
                <h3 className='text-center mt-5' >Login</h3>
                <form className='m-5 text-center'>

                    <div className='mb-3 text-center'>
                        <label className='form-label' htmlFor="">username</label>
                        <input onChange={handleChange} name='username' className='form-control' type="text" />
                    </div>
                    <div className='mb-3 text-center'>
                        <label className='form-label' htmlFor="">password</label>
                        <input onChange={handleChange} name='password' className='form-control' type="text" />
                    </div>

                    <button onClick={(e) => login(e)} className='btn btn-primary'>
                        Sign In
                    </button>
                </form>
            </div>
        </>
    )
}
