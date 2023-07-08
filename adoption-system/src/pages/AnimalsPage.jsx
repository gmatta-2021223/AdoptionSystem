import React from "react";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";


export const AnimalsPage = () => {

    const [animals, setAnimals] = useState([{}])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getAnimals = async () => {
        try {
            const { data } = await axios('http://localhost:3000/animal/get', { headers: headers })
            if (data.animals) {
                setAnimals(data.animals)
                //console.log(data.animals)
            }
        } catch (err) {
            console.log(err)
            throw new Error(err.response.message || 'Error getting animals')
        }
    }

    useEffect(() => getAnimals, [animals])



    return (
        <>
            <main>
                <div className="left-binding color fs-1">
                    <i className="fa-solid fa-dog text-dark"></i>
                    ㅤ| CONTROL ANIMALS

                </div>
                <div>
                    <br />

                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add animal
                    </button>
                    <Modal/>
                </div>
                <div className="row g-0 justify-content-center">
                    {
                        animals.map(({ name, description, age }, i) => {
                            return (
                                <Card key={i} title={name} description={description} age={age}></Card>
                            )
                        })
                    }


                </div>

            </main>
        </>
    );
};
