import React from "react";
import "./DashboardStyle.css";
import { useState } from "react";
import { AnimalsPage } from "../AnimalsPage";
import { UserPage } from "../UserPage";
import { AppointmentPage } from "../AppointmentPage";
import { Animal } from "../../components/Animal";
import { User } from "../../components/User";
import { Appointment } from "../../components/Appointment";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Index";


export const DashboardPage = () => {

    const { setLoggedIn, dataUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(true);
    const [showUser, setShowUser] = useState(false);
    const [showAnimal, setShowAnimal] = useState(true);
    const [showAppointment, setShowAppointment] = useState(false);

    const [show, setShow] = useState({
        animal: false,
        user: false,
        appointment: false,
    });

    const handleShow = (e) => {
        console.log(show);
        setShow({
            animal: false,
            user: false,
            appointment: false,
            [e.target.name]: true,
        });
    };

    const logOut = () => {
        localStorage.clear() //Borra todos los datos del localstorage
        setLoggedIn(false)
        navigate('/login')
        //localStorage.removeItem() Solo para eliminar uno en especifica
    }

    return (
        <>
            <div id="body">
                <section id="sidebar">
                    <a className="brand ms-5">
                        <span className="text mt-2 ">Adoption System</span>
                    </a>
                    <ul className="side-menu top">
                        <li>
                            <button>
                                <span className="text">Control Panel</span>
                            </button>
                        </li>
                        <li>
                            <Link to='animals'>
                                <button name="animal" onClick={handleShow}>
                                    Animals
                                </button>
                            </Link>

                        </li>
                        {
                            dataUser.role == 'ADMIN' ? (
                                <li>
                                    <Link to='users'>
                                        <button name="user" onClick={handleShow}>
                                            Users
                                        </button>
                                    </Link>
                                </li>
                            ): null
                        }
                        <li>
                            <Link to='appointments'>
                                <button name="appointment" onClick={handleShow}>
                                    Appointment
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <ul className="side-menu top">
                        <li>
                            <span className="text">Welcome: {dataUser.username}, {dataUser.role}</span>
                        </li>
                        <li>
                            <button>
                                <span className="text">Settings</span>
                            </button>
                        </li>

                        <li>
                            <button onClick={logOut}>
                                <span className="text">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </section>
                <section id="content">
                    <nav>
                        <a></a>
                    </nav>
                    <Outlet />
                    {/* {isAdmin ? (
                        <main>
                            <div className="head-title">
                                <div className="left">
                                    <h1 className="text-black ps-4">Control Administrator</h1>
                                </div>
                            </div>

                            <ul className="box-info">
                                <li>
                                    <span className="text">
                                        <h3>Users</h3>
                                    </span>
                                    
                                </li>

                                <li>
                                    <span className="text">
                                        <h3>Animals</h3>    
                                    </span>
                                    
                                </li>
                                <li>
                                    <span className="text">
                                        <h3>Appointment</h3>    
                                    </span>
                                    
                                </li>
                            </ul>
                        </main>
                    ) : (
                        <div>
                            {show.animal ? (
                                <Animal/>
                            ) : show.user ? (
                                <User/>
                            ) : (
                                <Appointment/>
                            )}
                        </div>
                    )} */}
                </section>
            </div>
        </>
    );
};
