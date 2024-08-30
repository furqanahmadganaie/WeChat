
import { useState } from "react";
import toast from 'react-hot-toast'
import useConversation from '../zustand/useConversation';
import { apiurl } from "../constents/constents";


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const token=localStorage.getItem('token');
	if (!token) {
        console.error('No token found in localStorage');
    }

	const sendMessage = async (message) => {
		setLoading(true);
		try {
            
			const res = await fetch(`${apiurl}/api/messages/send/${selectedConversation._id}`, {






				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
                    
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
            
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage