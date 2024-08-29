
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};





// import { useState, createContext,useContext } from "react";

// export const AuthContext = createContext();

// //wslint disable next line
// export const useAuthContext = () => {
//     return useContext (AuthContext);
// }

// export const AuthContextProvider= ({children}) => {
//     console.log(localStorage.getItem('chat-user'))
//     const [authUser,setAuthUser] = useState(localStorage.getItem("chat-user"));
//     return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
// }