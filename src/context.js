import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();


export  const  Context= ({ children })=> {

    const [login, setLogin] = useState(1)
    return (
        <StateContext.Provider
        value={{login,setLogin}}
        >
            { children }           
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);