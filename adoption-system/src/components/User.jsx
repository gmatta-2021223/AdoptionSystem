import React from 'react'
import { UserPage } from '../pages/UserPage'

export const User = () => {
    return (
        <>
            <main>
                <div className="left binding">
                    <h1 className="text-black">Control Users</h1>
                    <br />
                    <UserPage />
                </div>
            </main>

        </>
    )
}
