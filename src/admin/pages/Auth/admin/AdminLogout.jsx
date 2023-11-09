import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("mode");
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("USER")
        navigate("/admin/login");
    })
    return (
        <div></div>
    )
}
