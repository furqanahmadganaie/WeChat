
import { createContext, useContext, useState,useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};
//context provider component

export const AuthContextProvider = ({ children }) => {
	//initialixe authuser from local storage  and token

	const [token, setToken] = useState(() => localStorage.getItem("token") || null);

	const [authUser, setAuthUser] = useState(() => {
		
		const user = localStorage.getItem("chat-user");
		return user ? JSON.parse(user) :  null;
	  });


	  useEffect(() => {
		if (token) {
		  localStorage.setItem("token", token);
		} else {
		  localStorage.removeItem("token");
		}
	  }, [token]);


	  useEffect(() => {
		if (authUser) {
		  localStorage.setItem("chat-user", JSON.stringify(authUser));
		} else {
		  localStorage.removeItem("chat-user");
		}
	  }, [authUser]);

	   // Function to clear authentication
  const clearAuth = () => {
    setToken(null);
    setAuthUser(null);
  };


	return <AuthContext.Provider value={{token, authUser,setToken, setAuthUser,clearAuth }}>{children}</AuthContext.Provider>;
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