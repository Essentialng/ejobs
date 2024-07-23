// import React from 'react'
// import { BiMessageAdd, BiVideo } from 'react-icons/bi'
// import { MdCall } from 'react-icons/md'
// import { VscCallIncoming, VscCallOutgoing } from 'react-icons/vsc'

// function InterviewNew() {
//     const localVideoRef = useRef();
//     const remoteVideoRef = useRef();

//     useEffect(() => {
//         const initialize = async()=>{
//         localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
//         localVideoRef = localStream
        
//     }
//     }, [])
    

//   return (
//     <div className='text-center p-4 bg-gray-950'>
//         <h1>Job Interview</h1>
//         <div className='flex items-center justify-center mt-32 border-2 gap-5'>
//             <div className='w-1/3'>
//                 <h1 className='text-white text-xl font-semibold mb-2'>User 1</h1>
//                 <div className='w-full bg-black h-72'>
//                     <video className='w-full h-full' id='vid1' autoPlay playsInline></video>
//                 </div>
//             </div>
//             <div className='w-1/3'>
//                 <h1 className='text-white text-xl font-semibold mb-2'>User 2</h1>
//                 <div className='w-full bg-black h-72'>
//                     <video className='w-full h-full' id='vid2' autoPlay playsInline></video>
//                 </div>
//             </div>
//         </div>
//         <div className='mt-4'>
//             <button className='flex items-center justify-center gap-2 text-white bg-gray-800 px-4 py-2 rounded-full w-fit mx-auto'>
//                 <BiVideo className='w-6 h-6'/>
//                 <span>Start webCam</span>
//             </button>
//             <div className='flex items-center justify-center gap-10 w-fit mx-auto mt-5'>
//                 <button className='flex items-center justify-center gap-2 text-white bg-gray-800 px-4 py-2 rounded-full w-fit mx-auto'>
//                     <VscCallOutgoing/>
//                     <span>Maka a call</span>
//                 </button>
//                 <button className='flex items-center justify-center gap-2 text-white bg-gray-800 px-4 py-2 rounded-full w-fit mx-auto'>
//                     <VscCallIncoming/>
//                     <span>Answer the call</span>
//                 </button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default InterviewNew