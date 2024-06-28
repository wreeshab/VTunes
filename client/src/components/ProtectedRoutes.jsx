import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const ProtectedRoutes = ({ children }) => {
    const { isAuthenicated } = useContext(AuthContext);

    if (!isAuthenicated) {
        return <Navigate to="/auth" />
    }

    return (
        children
    )
}

export default ProtectedRoutes
