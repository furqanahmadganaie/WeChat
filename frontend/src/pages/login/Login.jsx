import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';
const login = () => {
  //two  diff inputs one for username and  one for password

  const [username,setUsename] = useState("");
  const [password,setPassword] = useState("");
  //loginfct from hook
    const {loading,login} = useLogin();

  const handleSubmit =  async(e) => {
    e.preventDefault();
      await login(username,password)
  }

  return (
    <div>
      <div className='text-center'>
      <h1 className='text-5xl   font-bold text-white'>Welcome Back To  <span className='text-5xl text-gradient-blue'>WeChat</span></h1>
        <p className='text-3xl  font-light pb-10 text-white items-center'>Enter your credentials to login</p>
      
      </div>
    
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
      <div className='w-full h-96  p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-gradient-to-r from-blue-800/50 to-blue-300/50
      bg-opacity-0 '>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-600'>WeChat</span>
        </h1>
         
         <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
            <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
            value ={username}
            onChange={ (e) => setUsename(e.target.value)}
            />
          </div>

          <div>
          <label className="label ">
            <span className='text-base label-text text-white'>Password</span>
            </label>
            <input type="password"
             placeholder='Enter Password' 
             className='w-full input input-bordered h-10'
             value ={password}
             onChange={ (e) => setPassword(e.target.value)}
             
             />
          </div>

          {/* link for signup if not havi acc */}
          <span className='font-light text-white'>{"Don't have account ? "}</span>
          <Link to='/signup' className='text-sm  hover:text-green-400 mt-2 inline-block pt-5 pb-5 font-bold text-white'>
            SignUp Now
          </Link>

          <div>
            <button className='btn btn-block btn-sm- mt-2 text-white hover:bg-green-500 hover:border-green-500' disabled ={loading}>
              
              {loading ? <span className='loading loading-spinner font-bold'></span> : "Login"}
              
              </button>
          </div>

         </form>

      </div>

    </div>
    </div>
  )
}

export default login

 // future refrence 
 
//  <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
{/* <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
bg-opacity-0 '>
  <h1 className='text-3xl font-semibold text-center text-gray-300'>
    Login
    <span className='text-blue-500'>WeChat</span>
  </h1>
   
   <form>
    <div>
      <label className="label p-2">
      <span className='text-base label-text'>Username</span>
      </label>
      <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
    </div>

    <div>
    <label className="label ">
      <span className='text-base label-text'>Password</span>
      </label>
      <input type="password"
       placeholder='Enter Password' 
       className='w-full input input-bordered h-10' />
    </div>

    {/* link for signup if not havi acc */}

//     <a href="#" className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
//       {"Don't"} have an account?
//     </a>

//     <div>
//       <button className='btn btn-block btn-sm- mt-2'>Login</button>
//     </div>

//    </form>

// </div>

// </div> */}