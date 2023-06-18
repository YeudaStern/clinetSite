import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();


export const Context = ({ children }) => {

    const [login, setLogin] = useState(0)
    const [user, setUser] = useState(null);
    const [sProject, setSProject] = useState([]);
    const [currentMode, setCurrentMode] = useState(localStorage.themeMode || 'light');
    const [client, setClient] = useState([])
    const [userFile, setUserFile] = useState([]);
    return (
        <StateContext.Provider
            value={{ login, setLogin, user, setUser, currentMode, setCurrentMode, sProject, setSProject, client, setClient, userFile, setUserFile }}
        >
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);