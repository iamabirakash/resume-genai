import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (<main><h1 className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 px-4 text-gray-300]">Loading...</h1></main>)
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected