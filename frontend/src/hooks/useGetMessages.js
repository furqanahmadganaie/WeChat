import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiurl } from "../constents/constents";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
                const token = localStorage.getItem('token');
				const res = await fetch(`${apiurl}/api/messages/${selectedConversation._id}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include the token in the request headers
                    }
                });
				const data = await res.json();
				if (!res.ok) throw new Error("failed to fetch messages");
				
				setMessages(data);

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();

	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;