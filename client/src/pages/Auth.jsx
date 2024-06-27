import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = () => {
    const [currState, setCurrState] = useState("register")
    return (
        <div className="">
            {currState === "login" ? <Login setCurrState={setCurrState} /> : <Register setCurrState={setCurrState} />}
        </div>
    )
}

export default Auth
