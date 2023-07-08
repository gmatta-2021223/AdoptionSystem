import '../node_modules/bootstrap/dist/js/bootstrap.min.js' // Windows 11 ../node_modules y Windows 10 sin eso
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom'


function App() {

    return (
        <>

            
            <Outlet />

        </>

    )
}

export default App
