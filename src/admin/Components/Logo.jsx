import React, { useEffect, useState } from 'react'

export default function Logo() {
    const [mode, setMode] = useState()
    useEffect(()=>{
        setMode(sessionStorage.getItem("mode"))
    })

    return (
        <div>{mode === "light" ? (
            <img
                src="/src/images/logo-light.png"
                className="img-fluid"
                alt="Logo"
            />
        ) : (
            <img
                src="/src/images/logo-dark.png"
                className="img-fluid"
                alt="Logo"
            />
        )}</div>
    )
}
