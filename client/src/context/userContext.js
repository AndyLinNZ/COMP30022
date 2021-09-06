import React from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ name: 'Stefan' })
    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
}

export const useUser = () => {
    const [user, setUser] = React.useContext(UserContext)

    return [user, setUser]
}
