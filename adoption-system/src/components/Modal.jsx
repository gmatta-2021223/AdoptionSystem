import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export const Modal = (props) => {

    const [user, setUser] = useState([])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:3000/user/get')
            setUser(data.users)
            //console.log(data.users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => getUsers, [])


    const [animal, setAnimal] = useState({
        name: '',
        description: '',
        age: '',
        type: '',
        user: ''
    })

    const handleChange = (e) => {
        setAnimal({
            ...animal,
            [e.target.name]: e.target.value
        })
    }

    const addAnimal = async (e) => {
        try {
            e.preventDefault()
            console.log(animal)
            const { data } = await axios.post('http://localhost:3000/animal/save', animal, {headers: headers})
        } catch (err) {
            console.log(err)
            throw new Error('Error adding animal')
        }
    }


    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Animal</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="" className="form-label">Name</label>
                        <input name='name' onChange={handleChange} type="text" id="" className="form-control" />

                        <label htmlFor="" className="form-label">Description</label>
                        <input name='description' onChange={handleChange} type="text" id="" className="form-control" />

                        <label htmlFor="" className="form-label">Age</label>
                        <input name='age' onChange={handleChange} type="number" id="" className="form-control" />

                        <label htmlFor="" className="form-label">Type</label>
                        <input name='type' onChange={handleChange} type="text" id="" className="form-control" />

                        <label htmlFor="" className="form-label">User</label>
                        {/* <input name='user' onChange={handleChange} type="text" id="" className="form-control" /> */}
                        <select className="form-control" id="inputUser" name='user' onChange={handleChange}>
                            {
                                user.map(({ _id, username }, i) => {
                                    return (
                                        <option key={i} value={_id}>{username}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={(e) => addAnimal(e)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
