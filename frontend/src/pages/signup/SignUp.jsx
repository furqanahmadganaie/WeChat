import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import UseSignUp from '../../hooks/UseSignUp';

const SignUp = () => {
  const [inputs,setInputs] =useState({
    fullname: "",
    username:"",
    password:"",
    confirmpassword:"",
    gender:"",
  });
  const {loading,signup}= UseSignUp()
//funct for gender ...spred
const handleCheckboxChange= (gender)=>{
  setInputs({...inputs,gender})
}

  const handleSubmit= async (e)=>{
    e.preventDefault();  //as it refreshes when we subnmit this avvoides that
     //signup with details
       await signup(inputs)

  };

      
  return (
    <div><h1 className='text-5xl pb-10  font-bold text-white'>Welcome To  <span className='text-5xl text-gradient-blue'>WeChat</span></h1>
    <div className='fles flex-col items-center justify-center min-w-80   mx-auto'>
          
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bbg-clip-padding backdrop-filter
      backdrop-blur-lg bg-gradient-to-r from-blue-800/50 to-blue-300/50 bg-opacity-0'>

        <h1 className='text-3xl font-semibold text-center text-white'>
          Sign Up  <span className='text-blue-600'>WeChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className='text-base label-text text-white'>Full Name</span>
            </label>

            <input type="text" placeholder='Enter Name' className='w-full input input-bordered h-10'
            value={inputs.fullname} 
            onChange={(e) => setInputs({...inputs, fullname: e.target.value})}
            />

          </div>
            
          <div>
          <label className="label p-2">
            <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' 
             value={inputs.username} 
             onChange={(e) => setInputs({...inputs, username: e.target.value})}
             />

          </div>
          
          <div>
          <label className="label ">
            <span className='text-base label-text text-white'>Password</span>
            </label>

            <input type="password"
             placeholder='Enter Password' 
             className='w-full input input-bordered h-10'
             value={inputs.password} 
             onChange={(e) => setInputs({...inputs, password: e.target.value})}
             
             />
          </div>

          <div>
          <label className="label ">
            <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input type="password"
             placeholder='Confirm Password' 
             className='w-full input input-bordered h-10' 
             
             value={inputs.confirmpassword} 
             onChange={(e) => setInputs({...inputs, confirmpassword: e.target.value})}
            
            />
          </div>

          {/* gender check box create genderbox in signup page  */}
         <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender= {inputs.gender}/>
          

          
          <span className='text-white '>Already have an account? </span>
          <Link to='/login' className='  hover:text-green-300 mt-2 inline-block font-bold text-white text-2xl'>
             Login 
          </Link>

          <div>
            <button className='btn btn-sm btn-block  border border-slate-700 text-white font-bold mt-5 hover:bg-green-500 hover:border-green-500' disabled = {loading}>
              {loading ? <span className='loading loading-spinner'></span> : " Sign Up"}
              </button>
          </div>

        </form>

      </div>
    </div>
    </div>
  )
}

export default SignUp




// stateer code for signup
// import GenderCheckBox from './GenderCheckBox'

// const SignUp = () => {
//   return (
//     <div className='fles flex-col items-center justify-center min-w-96 mx-auto'>

//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bbg-clip-padding backdrop-filter
//       backdrop-blur-lg bg-opacity-0'>

//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           Sign Up  <span className='text-blue-500'>WeChat</span>
//         </h1>

//         <form >
//           <div>
//             <label className="label p-2">
//               <span className='text-base label-text'>Full Name</span>
//             </label>
//             <input type="text" placeholder='Enter Name' className='w-full input input-bordered h-10' />

//           </div>
            
//           <div>
//           <label className="label p-2">
//             <span className='text-base label-text'>Username</span>
//             </label>
//             <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
//           </div>
          
//           <div>
//           <label className="label ">
//             <span className='text-base label-text'>Password</span>
//             </label>
//             <input type="password"
//              placeholder='Enter Password' 
//              className='w-full input input-bordered h-10' />
//           </div>

//           <div>
//           <label className="label ">
//             <span className='text-base label-text'>Confirm Password</span>
//             </label>
//             <input type="password"
//              placeholder='Confirm Password' 
//              className='w-full input input-bordered h-10' />
//           </div>

//           {/* gender check box create genderbox in signup page  */}
//          <GenderCheckBox/>
          

          

//           <a href="#" className='text-sm hover:underline hover:text-blue-800 mt-2 inline-block'>
//              Already have an account?
//           </a>

//           <div>
//             <button className='btn btn-sm btn-block mt-2 border border-slate-700'>Sign Up</button>
//           </div>

//         </form>

//       </div>
//     </div>
//   )