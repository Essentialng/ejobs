// import React, { useEffect, useRef, useState } from "react";
// import Header from '../component/Header';

// const Interview = () => {
//   const socketRef = useRef();
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerRef = useRef();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Establish socket connection
//     socketRef.current = io("http://localhost:3003");

//     // Access user media
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         localVideoRef.current.srcObject = stream;

//         // Join a call
//         socketRef.current.emit("join", { roomId: "some-room-id" });

//         socketRef.current.on("init", () => {
//           peerRef.current = new SimplePeer({
//             initiator: true,
//             trickle: false,
//             stream,
//           });

//           peerRef.current.on("signal", (data) => {
//             socketRef.current.emit("signal", { desc: data, roomId: "some-room-id" });
//           });

//           peerRef.current.on("stream", (remoteStream) => {
//             remoteVideoRef.current.srcObject = remoteStream;
//           });
//         });

//         socketRef.current.on("ready", () => {
//           peerRef.current = new SimplePeer({
//             initiator: false,
//             trickle: false,
//             stream,
//           });

//           peerRef.current.on("signal", (data) => {
//             socketRef.current.emit("signal", { desc: data, roomId: "some-room-id" });
//           });

//           peerRef.current.on("stream", (remoteStream) => {
//             remoteVideoRef.current.srcObject = remoteStream;
//           });
//         });

//         socketRef.current.on("desc", (data) => {
//           peerRef.current.signal(data.desc);
//         });

//         socketRef.current.on("users", (userList) => {
//           setUsers(userList);
//         });

//       })
//       .catch((error) => {
//         console.error("Error accessing webcam:", error);
//       });

//     // Clean up the socket connection and media streams on unmount
//     return () => {
//       if (peerRef.current) {
//         peerRef.current.destroy();
//       }
//       socketRef.current.disconnect();
//     };
//   }, []);

//   return (
//     <div className='w-full'>
//       <Header />
//       <div className="flex flex-col items-center">
//         <div>
//           <video ref={localVideoRef} autoPlay playsInline muted />
//         </div>
//         <div>
//           <video ref={remoteVideoRef} autoPlay playsInline />
//         </div>
//         <div>
//           <h2>Users in Call:</h2>
//           <ul>
//             {users.map((user, index) => (
//               <li key={index}>{user}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Interview;
