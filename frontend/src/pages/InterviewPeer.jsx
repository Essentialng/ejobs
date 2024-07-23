import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import Background from '../assets/Images/vidBack1.jpg';
import { BiPhone, BiPhoneIncoming } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const socket = io('http://localhost:3003');

function InterviewPeer() {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

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

  return (
    <div className='w-screen h-screen border-2 border-gray-400'>
      <div className='w-full h-full relative flex items-center justify-center gap-5 bg-gray-950'>
        {/* -------interviewer stream------ */}
        {stream && (
          <div className='border-orange-400 text-center w-36 h-36 absolute top-0 right-0'>
            <video className="" playsInline muted ref={myVideo} autoPlay />
            <h2 className='bg-[rgba(255,_255,_255,_0.2)] rounded-xl [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(255,255,255,0.3)] text-white'>{name || "Name"}</h2>
          </div>
        )}
        {/* -------interviewee stream------ */}
        <div className='border-orange-400 bg-cover bg-white block w-screen h-screen' style={{ backgroundImage: `url(${Background})` }}>
          {callAccepted && !callEnded && (
            <video className="block w-screen h-screen" playsInline ref={userVideo} autoPlay />
          )}
          <form onSubmit={(e) => e.preventDefault()} className="absolute flex items-center justify-between bottom-0 text-center w-full bg-[rgba(255,_255,_255,_0.2)] rounded-xl [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[rgba(255,255,255,0.3)] py-4">
            <div className='flex flex-col items-center justify-start w-3/4 gap-2'>
              <label className='text-center font-semibold text-white text-xl' htmlFor='name'>Account Info</label>
              <input className='mx-auto w-1/3 py-2 bg-transparent border-b-2 text-gray-100 px-2 outline-none' id='name' value={name} placeholder='Name' type="text" onChange={(e) => setName(e.target.value)} />
              <CopyToClipboard text={me}>
                <button className='bg-gray-700 p-2 px-4 rounded-sm text-white'>Copy your Id</button>
              </CopyToClipboard>
            </div>
            {call.isReceivedCall && !callAccepted && (
              <div>
                <button className='flex items-center justify-center gap-2 text-xl px-4 py-2 bg-red-400 text-white rounded-full' onClick={answerCall}><BiPhoneIncoming /> Answer</button>
              </div>
            )}
            <div className='flex flex-col items-center justify-start w-3/4 gap-2'>
              <label className='text-center font-semibold text-white text-xl'>Make a call</label>
              <input className='mx-auto w-1/3 py-2 bg-transparent border-b-2 rounded-sm text-gray-100 px-2 outline-none' value={idToCall} placeholder='Id to call' type="text" onChange={(e) => setIdToCall(e.target.value)} />
              {callAccepted && !callEnded ? (
                <button className="bg-gray-700 p-2 px-4 rounded-sm text-white" onClick={leaveCall}>Hang Up</button>
              ) : (
                <button className="text-white bg-gray-700 rounded-sm p-2 px-4 flex items-center gap-2" onClick={(e) => { e.preventDefault(); callUser(idToCall); }}><BiPhone className="text-white" /> Make a call</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InterviewPeer;
