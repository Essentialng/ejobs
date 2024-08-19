import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import Background from '../assets/Images/vidBack1.jpg';
import { BiPhone, BiPhoneIncoming } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdCancel } from 'react-icons/md';
import { conversation } from '../assets/chatMessages';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3003');

function InterviewPeer() {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const currentUser = useSelector(state=>state.user.currentUser)

  const [openChat, setOpenChat] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  // const [activeUser, setActiveUsers] = useState(null)

  const [message, setMessage] = useState([]);
  const [room, setRoom] = useState('');
  const { interviewId } = useParams();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

    return () => {
      socket.off('me');
      socket.off('callUser');
    };
  }, []);

  useEffect(() => {
    socket.emit('join_interview', interviewId);
  
    socket.on('receive_message', (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });
  
    return () => {
      socket.emit('leave_interview', interviewId);
      socket.off('receive_message');
    };
  }, [interviewId]);


  const sendMessage = () => {
    if (inputMessage !== '') {
      const messageData = {
        author: name,
        message: inputMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      socket.emit('send_message', { interviewId, message: messageData });
      setInputMessage('');
    }
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  // --------------Chatting functionality------------
  const handleChat = ()=>{
    setOpenChat(!openChat)
  }


  return (
    <div className='w-screen overflow-hidden h-screen border-2 border-gray-400'>
      {/* -------interviewer stream------ */}
      <div className='w-full h-full relative flex items-center justify-center gap-5 bg-gray-950'>
        {stream && (
          <div className='border-orange-400 text-center w-36 h-36 absolute top-0 right-0'>
            <video className="" playsInline muted ref={myVideo} autoPlay />
            <h2 className='bg-[rgba(255,_255,_255,_0.2)] rounded-xl [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(255,255,255,0.3)] text-white'>{name || "Name"}</h2>
          </div>
        )}
        {/* -------interviewee stream------ */}
        <div className='bg-cover bg-gray-950 block w-screen h-screen'>
          {callAccepted && !callEnded && (
            <video className="block w-screen h-screen" playsInline ref={userVideo} autoPlay />
          )}
          <form onSubmit={(e) => e.preventDefault()} className="absolute flex flex-col gap-20 items-center justify-center top-0 left-0 text-center w-1/4 h-full bg-[rgba(255,_255,_255,_0.2)] rounded-xl [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[rgba(255,255,255,0.3)] py-4">
            <div className='flex flex-col items-center justify-start w-3/4 gap-2'>
              <label className='text-center font-semibold text-white text-xl' htmlFor='name'>Account Info</label>
              <input className='mx-auto w-full rounded-sm py-2 bg-transparent border-b-2 text-gray-100 px-2 bg-blue-300 outline-none' id='name' value={name} placeholder='Name' type="text" onChange={(e) => setName(e.target.value)} />
              <CopyToClipboard text={me}>
                <button className='bg-gray-700 p-2 px-4 rounded-sm text-white w-full'>Copy your Id</button>
              </CopyToClipboard>
            </div>
            {call.isReceivedCall && !callAccepted && (
              <div>
                <button className='flex items-center justify-center gap-2 text-xl px-4 py-2 bg-red-400 text-white rounded-full' onClick={answerCall}><BiPhoneIncoming /> Answer</button>
              </div>
            )}
            <div className='flex flex-col items-center justify-start w-3/4 gap-2'>
              <label className='text-center font-semibold text-white text-xl'>Make a call</label>
              <input className='mx-auto w-full py-2 bg-transparent border-b-2 rounded-sm text-gray-100 px-2 outline-none' value={idToCall} placeholder='Id to call' type="text" onChange={(e) => setIdToCall(e.target.value)} />
              <button onClick={handleChat} className={`${!openChat ? 'block' : 'hidden'} px-4 py-2 rounded-sm w-full mt-2 ml-2 bg-blue-500 text-white`}>Open chat</button>
              {callAccepted && !callEnded ? (
                <button className="bg-red-500 p-2 px-4 rounded-sm text-white w-full" onClick={leaveCall}>Hang Up</button>
              ) : (
                <button className="text-white bg-gray-700 rounded-sm p-2 px-4 flex items-center gap-2" onClick={(e) => { e.preventDefault(); callUser(idToCall); }}><BiPhone className="text-white" /> Make a call</button>
              )}
            </div>
          </form>
          {/* -------Chat-------- */}
          <div className={`absolute bottom-10 right-5 w-1/3 text-sm h-2/3 bg-gray-200 ml-2 mt-2 rounded-sm ${openChat ? 'block' : 'hidden'}`}>
          <MdCancel className='text-red-500 cursor-pointer w-6 h-6' onClick={handleChat}/>
          <div className="flex flex-col h-full bg-gray-50">
          <div className="flex-grow overflow-y-auto p-4">
            {message.map((msg, index) => (
              <div key={index} className={`p-2 my-2 rounded ${msg.author === name ? 'bg-blue-200 ml-auto' : 'bg-gray-200'}`}>
                <strong>{msg.author}</strong>: {msg.message}
                <small className="block text-gray-500">{msg.time}</small>
              </div>
            ))}
          </div>
        <div className="border-t p-4 flex flex-col">
        <button 
          onClick={() => {
            const messageData = {
              author: name,
              message: `My ID is: ${me}`,
              time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            socket.emit('send_message', { interviewId, message: messageData });
          }}
            className="mb-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Share My ID
        </button>
        <div className="flex">
          <input 
            value={inputMessage} 
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-grow border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
          <button 
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPeer;

// ----------Version 2-------------

// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
// import Background from '../assets/Images/vidBack1.jpg';
// import { BiPhone, BiPhoneIncoming } from 'react-icons/bi';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { MdCancel } from 'react-icons/md';
// import { conversation } from '../assets/chatMessages';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

// const socket = io('http://localhost:3003');

// function InterviewPeer() {
//   const [stream, setStream] = useState(null);
//   const [me, setMe] = useState('');
//   const [idToCall, setIdToCall] = useState('');
//   const [call, setCall] = useState({});
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState('');
//   const currentUser = useSelector(state => state.user.currentUser);
//   const interviewId = useParams().interviewId

//   const [openChat, setOpenChat] = useState(false);
//   const [inputMessage, setInputMessage] = useState('');
//   const [activeUser, setActiveUsers] = useState(null);

//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         if (myVideo.current) {
//           myVideo.current.srcObject = currentStream;
//         }
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices:', error);
//       });

//     socket.on('me', (id) => setMe(id));

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//       setCall({ isReceivedCall: true, from, name: callerName, signal });
//     });

//     return () => {
//       socket.off('me');
//       socket.off('callUser');
//     };
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('answerCall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//       if (userVideo.current) {
//         userVideo.current.srcObject = currentStream;
//       }
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

//   const callUser = (id) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
//     });

//     socket.on('callAccepted', (signal) => {
//       setCallAccepted(true);
//       peer.signal(signal);
//     });

//     peer.on('stream', (currentStream) => {
//       if (userVideo.current) {
//         userVideo.current.srcObject = currentStream;
//       }
//     });

//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();
//     window.location.reload();
//   };

//   const handleChat = () => {
//     setOpenChat(!openChat);
//   };

//   const sendMessage = () => {
//     // send message here
//   };

//   return (
//     <div className="flex h-screen overflow-hidden w-screen">
//       <div className="flex flex-col w-1/4 bg-gray-800 p-4 text-white">
//         <div className="flex items-center mb-4">
//           <h2 className="text-2xl font-semibold">Interview Panel</h2>
//         </div>

//         {/* -------Account details------- */}
//         <div className="flex-grow">
//           <div className="mb-4">
//             <label className="block text-lg">Account Info</label>
//             <input
//               className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="name"
//               value={name}
//               placeholder="Name"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <CopyToClipboard text={me}>
//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Copy your ID</button>
//             </CopyToClipboard>
//           </div>
//           <div>
//             <label className="block text-lg">Make a call</label>
//             <input
//               className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={idToCall}
//               placeholder="ID to call"
//               type="text"
//               onChange={(e) => setIdToCall(e.target.value)}
//             />
//             {callAccepted && !callEnded ? (
//               <button
//                 className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
//                 onClick={leaveCall}
//               >
//                 Hang Up
//               </button>
//             ) : (
//               <button
//                 className={`w-full mt-2 bg-green-600 hover:bg-green-700 ${currentUser.userType === 'jobEmployer' ? 'block' : 'hidden'} text-white py-2 rounded`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   callUser(idToCall);
//                 }}
//               >
//                 <BiPhone className="inline-block mr-2" /> Make a call
//               </button>
//             )}
//           </div>
//         </div>
//       </div>


//       {/* ------------Call CTA's------------- */}
//       <div className="flex-grow relative bg-gray-950">
//         <div className="flex items-center justify-between p-4">
//           <h2 className="text-xl text-white">Interview</h2>
//           {call.isReceivedCall && !callAccepted && (
//             <button
//               className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//               onClick={answerCall}
//             >
//               <BiPhoneIncoming className="inline-block mr-2" /> Answer
//             </button>
//           )}
//         </div>

        
//         {/* ----------------- */}
//         <div className="flex justify-center items-center h-full bg-cover bg-center">
//           {stream && (
//             <div className="absolute top-4 right-4 w-36 h-36">
//               <video className="w-full h-full object-cover" playsInline muted ref={myVideo} autoPlay />
//               <h2 className="mt-2 text-white text-center">{name || "Name"}</h2>
//             </div>
//           )}
//           {callAccepted && !callEnded && (
//             <video className="w-full h-full object-cover" playsInline ref={userVideo} autoPlay />
//           )}
//         </div>
//         <div className="absolute bottom-4 left-4">
//           <button onClick={handleChat} className="bg-blue-500 text-white py-2 px-4 rounded">
//             {openChat ? 'Close Chat' : 'Open Chat'}
//           </button>
//         </div>
//       </div>


//       {/* -----------Chat section functionality----------- */}
//       <div className={`absolute bottom-5 text-sm right-5 w-1/3 h-2/3 bg-gray-200 p-4 rounded-tl-lg ${openChat ? 'block' : 'hidden'}`}>
//         <MdCancel className="text-red-500 cursor-pointer w-6 h-6" onClick={handleChat} />
//         <div className="flex flex-col h-full bg-gray-50">
//           <div className="flex-grow overflow-y-auto p-4">
//             {conversation.map((msg, index) => (
//               <div className={`flex w-full ${msg.from === currentUser._id ? 'justify-start' : 'justify-end'}`} key={index}>
//                 <div className={`p-4 max-w-1/3 my-2 rounded-lg ${msg.from === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                   <strong>{msg.from === currentUser._id ? 'You' : msg.from}</strong>: {msg.message}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="border-t p-4 flex">
//             <input
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//               placeholder="Type your message..."
//               className="flex-grow border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
//             >
//               Send
//             </button>
//           </div>
//           <div className="border-t p-4">
//             <h3 className="font-semibold">Active Users:</h3>
//             <div className="flex flex-wrap">
//               <div className="p-2 m-2 bg-gray-200 rounded-lg">
//               {activeUser}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

// </div>
// );}

// export default InterviewPeer;