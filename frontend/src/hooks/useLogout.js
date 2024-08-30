import  { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { apiurl } from '../constents/constents'

const useLogout = () => {
  const [loading,setLoading]= useState(false)
  const {setAuthUser} =  useAuthContext()

  const logout = async () => {
     setLoading(true)
    try{
        const res = await fetch(`${apiurl}/api/auth/logout`,
            {
                method : "POST" ,
                headers: {"Content-Type": "application/json"}
            }
        );
        const data = await res.json()
        if(data.error){
            throw new Error(data.error)
        }

        localStorage.removeItem("token")
        setAuthUser(null)


    }  catch(error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }

  };

  return {loading,logout};

}

export default useLogout;