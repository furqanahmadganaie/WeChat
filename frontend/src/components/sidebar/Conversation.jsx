import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';


const Conversation = ({conversation,lastIdx,emoji}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;

  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id)  

  return (
   <>
   <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2'
              ${isSelected ? "bg-sky-500" : ""}
   `}

   onClick={() => setSelectedConversation(conversation)}

   >
    
    {/* will have pprofile  fullname and icon  below it there is dividerr  avatar from daisyui  */}

   <div className={`avatar ${isOnline ? "online" : ""}`}> 

    {/* as it is online we will ad functionalities when online then online when off line then offline */}
    <div className='w-14 rounded-full'>
        <img src={conversation.profilePic} alt=" user avatar" />
    </div>
   </div>

   <div className='flex flex-col flex-1'>
      <div className='flex gap-14 justify-between'>
        <p className='font-bold text-blue-200'>{conversation.fullname}</p>    
        {/* <span className='text-xl'>{emoji}</span> */}
      </div>
   </div>
   </div>
      { !lastIdx && <div className='divider my-0 py-0 h-1' />}
  </>

  );
    
  
};

export default Conversation





// import React from 'react'

// const Conversation = () => {
//   return <>
//    <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2'>
//     {/* will have pprofile  fullname and icon  below it there is dividerr  avatar from daisyui  */}
//    <div className='avatar online'> 
//     {/* as it is online we will ad functionalities when online then online when off line then offline */}
//     <div className='w-14 rounded-full'>
//         <img src=" https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt=" user avatar" />
//     </div>
//    </div>

//    <div className='flex flex-col flex-1'></div>
//       <div className='flex gap-14 justify-between'>
//         <p className='font-bold text-grey-200'>fullname</p>    <span className='text-xl'>emoji</span>
//       </div>
//    </div>


//    <div className='divider my-0 py-0 h-1'>

//    </div>
  
  
//   </>