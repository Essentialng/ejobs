import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import MessageInfo from '../component/MessageInfo'
import { useSelector } from 'react-redux';
import axios from 'axios';


function Notification() {
  const allNotifications = useSelector((state)=> state.notification.notificationList)
  const [notificationDetails, setNotificationDetails] = useState([])
  const currentUser = useSelector((state)=>state.user.currentUser)
  const notificationURL = currentUser.userType === 'jobSeeker' ? 'http://localhost:3003/api/v1/notification/getUserNotification/' : 'http://localhost:3003/api/v1/notification/getEmployerNotification/'
  const getANotification = 'http://localhost:3003/api/v1/notification/getANotification'
  const userType = currentUser.userType

  // ----fetch notificaticatin details
  useEffect(()=>{
    const fetchAllNotification = async()=>{
      const notificationData = await Promise.all(
        allNotifications.map(async(eachNotification)=>{
           const response = await axios.post(getANotification, {notificationId: eachNotification}, {withCredentials: true})
            return response.data
          })
      )
      setNotificationDetails(notificationData)
    }
    fetchAllNotification()
  },[allNotifications, getANotification])
  return (
    <div className="">
      <div className="sm:mx-24 mx-4">
        <Header/>
        <div className="text-sm">
          <div className="mt-8">
            <h1 className='text-xl text-slate-400 mb-4'>Notification</h1>
            <div className=""></div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {
              notificationDetails.map((eachDetails, index)=>{
                return(
                  <MessageInfo key={index} data={eachDetails} userType={userType}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification

// --------Version 2 --------
// import React, { useEffect, useState, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import Header from '../component/Header';
// import MessageInfo from '../component/MessageInfo';

// function Notification() {
//   const [notificationDetails, setNotificationDetails] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const allNotifications = useSelector((state) => state.notification.notificationList);
//   const currentUser = useSelector((state) => state.user.currentUser);

//   const getANotification = 'http://localhost:3003/api/v1/notification/getANotification';

//   const fetchNotificationDetails = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const notificationData = await Promise.all(
//         allNotifications.map(async (notificationId) => {
//           const response = await axios.post(
//             getANotification, 
//             { notificationId },
//             { withCredentials: true }
//           );
//           return response.data;
//         })
//       );
//       setNotificationDetails(notificationData)
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//       setError("Failed to load notifications. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [allNotifications, getANotification]);

//   useEffect(() => {
//     if(allNotifications && allNotifications.length > 0){
//       fetchNotificationDetails();
//     }
//   }, [fetchNotificationDetails]);

//   return (
//     <div className="sm:mx-24 mx-4">
//       <Header />
//       <div className="text-sm">
//         <div className="mt-8">
//           <h1 className='text-xl text-slate-400 mb-4'>Notifications</h1>
//         </div>
//         {isLoading ? (
//           <p>Loading notifications...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : notificationDetails.length === 0 ? (
//           <p>No notifications found.</p>
//         ) : (
//           <div className="flex flex-col items-center justify-center gap-4">
//             {notificationDetails.map((eachDetails) => (
//               <MessageInfo 
//                 key={eachDetails._id || eachDetails.id} 
//                 data={eachDetails} 
//                 userType={currentUser.userType}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notification;