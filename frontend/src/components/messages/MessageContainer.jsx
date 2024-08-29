import {useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);
   
  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {/* header lets put fragemnt foer this  */}

        {!selectedConversation ? <NoChatSelected/> :(

        <>
            <div className=' flex items-center  justify-center px-4 py-2 rounded=full bg-slate-600  mb-2'>
                <span className='label-text text-white font-semibold'>To:</span> <span className='text-white  front-bold'>{selectedConversation.fullname}</span>
            </div>

            {/* messages 
            and messageinput  */}

            <Messages/>
            <MessageInput/>
        </>

        )}

    </div>
  )
}

export default MessageContainer



const NoChatSelected = () =>{
  const {authUser} = useAuthContext();

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-white font-semibold 
      flex flex-col items-center gap-2'>
        <p>Welcome {authUser.fullname}</p>
        <p className='text-white '>select a chat to start messaging </p>
        <TiMessages className='text-3xl md:tet-6xl text-center'/>

      </div>
    </div>
  );
}



{/* <div className='md:min-w-[450px] flex flex-col'>
{/* header lets put fragemnt foer this  */}

{/* // <>
//     <div className='bg-slate-500 px-4 py-2 mb-2'>
//         <span className='label-text'>To:</span> <span className='text-grey-900 front-bold'>fullname</span>
//     </div>

//     {/* messages 
//     and messageinput  */}
{/* 
//     <Messages/>
//     <MessageInput/>
// </> */}

{/* // </div> */} 