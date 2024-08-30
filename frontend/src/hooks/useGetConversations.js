import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiurl } from "../constents/constents";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const token = localStorage.getItem("token"); // Get the token from localStorage

	useEffect(() => {
		const getConversations = async () => {
			console.log("Token: ", token);

			if (!token) {
        toast.error("No token found. Please log in.");
        setLoading(false);
        return;
      }
			setLoading(true);
			try {
				const res = await fetch(`${apiurl}/api/users`,{
					method: "GET",
					headers: {
					  "Content-Type": "application/json",
					  "Authorization": `Bearer ${token}`, // Include the token in the request headers
					},
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "failed to fetch the conversation");
				}

				setConversations(data);

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		
			getConversations();
		  
	}, [token]);

	return { loading, conversations };
};
export default useGetConversations;










// import  { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'

// const useGetConversations = () => {
//  const [loading,setLoading] = useState(false);
//  const [conversations,setConversations] = useState([]);

//  useEffect(() => {
//     const getConversations = async () => {
//         setLoading(true);


//         // const token =  localStorage.getItem("chat-user")
//         // if(!token ) console.error("Token Not found")

//         const token = localStorage.getItem('chat-user');
//         console.log('Token from localStorage:', token);


//       if (!token) {
//         console.error("Token not found");
//         toast.error("Unauthorized access");
//         setLoading(false);
//         return;
//       }
 
        
//         try{   
         
//             const res = await fetch('http://localhost:3000/api/users', {
//                 method: 'GET',
//                 headers: {
//                    'Content-Type': 'application/json',
//                    'Authorization': `Bearer ${token}`,
//                 },
                
//              });

//             //get req
//             const data =await res.json();

//             console.log({data})

//             if(data.error){
//                 throw new Error(data.error);
//             }
//             setConversations(data);

//         }  catch (error) {
//             toast.error(error.message);

//         } finally{
//             setLoading(false);
//         }
//     }
//     // console.log("Page paint...")

//     getConversations();

//  },[]);


//  return {loading,conversations};
// } 

// export default useGetConversations;