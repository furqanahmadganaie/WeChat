

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
		console.log("Password:", password);
    console.log("Confirm Password:", confirmpassword);
		const success = handleInputErrors({ fullname, username, password, confirmpassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullname, username, password, confirmpassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
	if (!fullname || !username || !password || !confirmpassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmpassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}










// import { useState } from "react"
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// const UseSignUp = () => {
//   // reteun sate and funlty
//   const [loading,setLoading] = useState(false);
//  const {setAuthUser}= useAuthContext();

//   const signup = async({fullname ,username,password,confirmpassword,gender}) =>{
//        const success =handleInputErrors({fullname ,username,password,confirmpassword,gender})
//        if(!success) return; 
//        try{
//            const res = await fetch ("http://localhost:3000/api/auth/signup",
//             {
//               method:"POST",
//               headers: {"Content-Type": "application/json"},
//               body:JSON.stringify({fullname ,username,password,confirmpassword,gender})
//             }
//            )

//            const data = await res.json();
//            if(data.error)
//            {
//             throw new Error(data.error)
//            }
//            //localstorage
//            //context

//            localStorage.setItem("chat-user",JSON.stringify(data));
//            setAuthUser(data);


//        } catch(error) {
//         toast.error(error.message)
//        }   finally{
//         setLoading(false)
//        }
//   }

//   return {loading,signup};
// };



// export default UseSignUp


// const handleInputErrors = ({fullname ,username,password,confirmpassword,gender})=>{
//    if(!fullname || !username || !password || !confirmpassword || !gender){
//     //setalert from bibray react hot toast add in app
//     toast.error('Please fill in the fields')
//     return false
//    }


//    if(password!=confirmpassword){
//     toast.error('Password do not match')
//     return false
//    }

//    if(password.length < 6){
//     toast.error('Password must be at least 6 characters')
//     return false
//    }

//    return true
// }