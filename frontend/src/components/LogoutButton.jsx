import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import useLogout from '../hooks/useLogout'

const LogoutButton = () => {
  const {loading,logout} = useLogout();

  return (
    <div className='mt-auto relative group'>
      {!loading ? (
        <BiLogOut className='w-8 h-8 text-white curser-pointer hover:text-green-300'
        onClick={logout}
        /> ) : ( <span className='loading loading-spinner'></span>
          
        )

        

      }

<div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 px-2 py-1 text-sm text-white font-bold bg-white-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Logout
    </div>

    </div>
  )
}

export default LogoutButton;