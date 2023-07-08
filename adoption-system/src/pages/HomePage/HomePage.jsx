import React from 'react'
import { Navbar } from '../../components/Navbar'
import './HomeStyle.css'

export const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="contenedor p-5 mt-5 text-center">
                <h1>Bienvenido a la página principal.ㅤ<span>&#160;</span></h1>
            </div>
        </>
    )
}
