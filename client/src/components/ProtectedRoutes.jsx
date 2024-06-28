import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    if (!isAuthenticated) {
        return <Navigate to="/auth" />
    }

    return (
        children
    )
}

export default ProtectedRoutes
