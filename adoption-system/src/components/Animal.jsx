import React from 'react'
import { AnimalsPage } from '../pages/AnimalsPage'

export const Animal = () => {
    return (
        <>
            <main>
                <div className="left binding">
                    <h1 className="text-black">Control Animals</h1>
                    <AnimalsPage />
                </div>
            </main>
        </>
        
    )
}
