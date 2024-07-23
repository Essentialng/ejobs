// import React, { useState } from 'react'
// import { MdCancel, MdMessage } from 'react-icons/md'


// function MessageModal({toggle, ApplicantName}) {

//     const [messageType, setMessageType] = useState('text')
//     const hanldeMessageType = ()=>{
//         messageType === 'text' ? setMessageType('email') : setMessageType('text')
//     }

//     const handleSend = ()=>{
//         alert('Sending message')
//         toggle()
//     }

//   return (
//     <div className='w-full text-sm h-screen flex items-center justify-center bg-gray-900 absolute -top-40 left-0'>
//         <div className='relative p-4 w-1/2 h-auto flex flex-col items-center justify-center bg-white rounded-sm'>
//             <MdCancel onClick={toggle} className='absolute top-0 right-0 text-orange-400 w-8 h-8 cursor-pointer'/>
//             <div className='mb-4 flex items-center justify-center gap-4'>
//                 <div className='p-3 rounded-full bg-gray-200'>
//                 <MdMessage className='text-orange-500'/>
//                 </div>
//                 <h2 className='text-gray-400 text-md capitalize'>{`${messageType} Message`}</h2>
//             </div>
//             <div onClick={hanldeMessageType} className='relative flex items-center justify-between gap-5 px-4 border-orange-300 border-2 py-1 rounded-full cursor-pointer'>
//                 <span className='text-gray-500 text-sm'>SMS</span>
//                 <span className='text-gray-500 text-sm'>MAIL</span>
//                 <div className={`absolute ${messageType === 'text' ? "left-0" : "right-0"} w-6 h-6 rounded-full bg-orange-400 transition-all ease-linear`}></div>
//             </div>
//             <div className='w-full mt-2'>
//                 <h2 className='text-md text-gray-400'>
//                     To: {ApplicantName}
//                 </h2>
//                 <input type="text" placeholder='subject' className='border-2 border-slate-300 px-4 py-2 my-2 w-full rounded-sm'/>
//                 <textarea placeholder={`${messageType} message`} className='mt-2 w-full border-2 border-gray-400 h-24 p-2 rounded-sm' name="messageUpdate" id="mssageUpdate"></textarea>
//                 <div className='flex items-center gap-2 justify-center mt-4'>
//                 <button onClick={handleSend} className='hover:bg-orange-500 hover:border-none hover:text-white border-2 border-gray-400 rounded-sm px-4 py-2'>Submit</button>
//                 <button onClick={toggle} className='hover:bg-orange-500 hover:border-none hover:text-white border-2 border-gray-400 rounded-sm px-4 py-2'>Cancel</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default MessageModal

// ------------Version 2----------------
import React, { useState } from 'react';
import { MdCancel, MdMessage } from 'react-icons/md';

function MessageModal({ toggle, ApplicantName }) {
  const [messageType, setMessageType] = useState('text');
  const handleMessageType = () => {
    messageType === 'text' ? setMessageType('email') : setMessageType('text');
  };

  const handleSend = () => {
    alert('Sending message');
    toggle();
  };

  return (
    <div className="w-full text-sm h-screen flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 z-50">
      <div className="relative p-6 w-1/3 h-auto flex flex-col items-center justify-center bg-white rounded-md shadow-lg">
        <MdCancel onClick={toggle} className="absolute top-3 right-3 text-gray-400 w-6 h-6 cursor-pointer hover:text-red-500" />
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="p-3 rounded-full bg-gray-100">
            <MdMessage className="text-blue-600" />
          </div>
          <h2 className="text-gray-600 text-lg font-semibold capitalize">{`${messageType} Message`}</h2>
        </div>
        <div onClick={handleMessageType} className="relative flex items-center justify-between gap-5 px-4 border-blue-300 border-2 py-1 rounded-full cursor-pointer">
          <span className="text-gray-600 text-sm">SMS</span>
          <span className="text-gray-600 text-sm">MAIL</span>
          <div className={`absolute ${messageType === 'text' ? "left-0" : "right-0"} w-6 h-6 rounded-full bg-blue-500 transition-all ease-linear`}></div>
        </div>
        <div className="w-full mt-4">
          <h2 className="text-lg text-gray-600 mb-2">
            To: {ApplicantName}
          </h2>
          <input type="text" placeholder="Subject" className="border border-gray-300 px-4 py-2 my-2 w-full rounded-md focus:border-blue-500 focus:outline-none" />
          <textarea placeholder={`${messageType} message`} className="mt-2 w-full border border-gray-300 h-24 p-2 rounded-md focus:border-blue-500 focus:outline-none" name="messageUpdate" id="messageUpdate"></textarea>
          <div className="flex items-center gap-4 justify-center mt-6">
            <button onClick={handleSend} className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none">
              Submit
            </button>
            <button onClick={toggle} className="bg-gray-200 text-gray-600 rounded-md px-4 py-2 hover:bg-gray-300 focus:outline-none">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
