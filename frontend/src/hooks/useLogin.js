
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { apiurl } from "../constents/constents";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser ,setToken} = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;

		setLoading(true);
		
		try {
			const res = await fetch(`${apiurl}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
            console.log("The response recieved: ",res);
			const data = await res.json();

			console.log("data in useLogin: ",data);

			if (!res.ok) {
				throw new Error(data.error || "login failed");
			}
		
			// localStorage.setItem("chat-user", JSON.stringify(data));

			// Store the JWT token in localStorage
			localStorage.setItem("token", data.token);
			setToken(data.token)
//storea user details in context

			setAuthUser({
				_id: data._id,
				fullname: data.fullname,
				username: data.username,
				profilePic: data.profilePic,
				gender:data.gender,
			});
			
			toast.success("Login successful");

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}












// import { useState } from "react"
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useLogin = () => {
//    const [loading,setLoading] = useState(false) 

//    const {setAuthUser}= useAuthContext();

//   const login= async(username,password) =>{
//     const success =handleInputErrors(username,password)
//     if(!success) return;

//          setLoading(true)
  
//        try{
//            const res = await fetch ("http://localhost:3000/api/auth/login",
//             {
//               method:"POST",
//               headers: {"Content-Type": "application/json"},
//               body:JSON.stringify({username,password}),
//             }
//            )

//            const data = await res.json();
//            console.log({data})
//           //  localStorage.setItem("chat-user",data.token || null);
//            if(data.error)
//            {
//             throw new Error(data.error)
//            }
             
//             // Step 1: Extract the JWT from the response
//             const { token, user } = data;
//              if (!token) {
//                throw new Error("Token not provided");
//            }
           
//            // Step 2: Store the JWT in localStorage
//            localStorage.setItem("chat-user", token);
//            console.log("Token stored in localStorage:", localStorage.getItem("chat-user"));

//           //  localStorage.setItem("chat-user",JSON.stringify(data));
//            setAuthUser(user);
//        } catch(error) {
//         toast.error(error.message)
//        }   finally{
//         setLoading(false)
//        }
//     }
//    return {loading,login} 

// }

// export default useLogin



// const handleInputErrors = (username,password)=>{
//     if(!username || !password ){
//      //setalert from bibray react hot toast add in app
//      toast.error('Please fill in the fields')
//      return false
//     }
 
 
 
//     return true
//  }