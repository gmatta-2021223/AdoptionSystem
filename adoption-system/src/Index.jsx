import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { HomePage } from './pages/HomePage/HomePage'
import { AnimalsPage } from './pages/AnimalsPage'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { useState, createContext, useEffect } from 'react'
import { Appointment } from './components/Appointment'
import { User } from './components/User'
//import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'

export const AuthContext = createContext()

// SERVIR PARA CREAR EL ENRUTAR Y TAMBIEN PASARLE UN CONTEXTO AL ENRUTADOR (CONJUNTO DE RUTAS)
// SERIE DE DATOS O FUNCIONES JUNTAS SON UN CONTEXTO
export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })

    useEffect(() => {
        
        let token = localStorage.getItem('token')

        if (token) {
            setLoggedIn(true)
        }
       
    }, [])

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/login',
                    element: <LoginPage />
                },
                {
                    path: '/register',
                    element: <RegisterPage />
                },
                
                {
                    path: '/dashboard',
                    element: loggedIn ? <DashboardPage /> : <LoginPage />,
                    children: [
                        {
                            path: 'animals',
                            element: <AnimalsPage/>
                        },
                        {
                            path: 'users',
                            element: <User/>
                        },
                        {
                            path: 'appointments',
                            element: <Appointment/>
                        }
                    ]
                },
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>

    )
}
