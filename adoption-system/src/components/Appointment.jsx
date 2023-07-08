import React from 'react'
import { AppointmentPage } from '../pages/AppointmentPage'

export const Appointment = () => {
    return (
        <main>
            <div className="left binding">
                <h1 className="text-black">Control Appointments</h1>
                <br />
                <AppointmentPage />
            </div>
        </main>

    )
}
