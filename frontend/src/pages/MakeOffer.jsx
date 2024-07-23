// import axios from 'axios';
// import React, { useEffect, useId, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { addNotification } from '../redux/notification/notificationSlice';





// function MakeOffer({companyName, companyAddress, Country, phoneNumber}) {
  
//   const updateApplication = "http://localhost:3003/api/v1/application/updateApplication";
//   const createAnOfer = "http://localhost:3003/api/v1/offer/createOffer";
//   const currentUser = useSelector(state=>state.user.currentUser)
//   const dispatch = useDispatch()
//   const {employer, candidate, application, index} = useParams()
//   const fetchApplication = 'http://localhost:3003/api/v1/application/getAnApplication'
//   const fetchApplicant = 'http://localhost:3003/api/v1/jobSeeker/getAjobSeeker'
//   const createNotificationUrl = "http://localhost:3003/api/v1/notification/createNotification";
//   const [applicationInfo, setApplicationInfo] = useState({})
//   const [applicantInfo, setApplicantInfo] = useState({})
//   const [offerData, setOfferData] = useState({
//     employer,
//     candidate,
//     application
//   })


//   useEffect(()=>{
//     const fetchApplicationDetails = async()=>{
//       const applicationDetails = await axios.post(fetchApplication, {applicantionId: application})
//       const applicantDetails = await axios.post(fetchApplicant, {jobSeekerId: candidate})
//       setApplicationInfo(applicationDetails.data)
//       setApplicantInfo(applicantDetails.data)
//     }
//     fetchApplicationDetails()
//   },[])

//   const handleForm = (e)=>{
//     setOfferData({...offerData, [e.target.name]: e.target.value})
//   }

//   const handleOffer = async(e)=>{
//     e.preventDefault()
//     try{
//       const updateCurrentApplication = await axios.put(updateApplication, {applicationId:application, status: 'Offer'})
//       // Send offer letter to candidate. -->-->  
//       await axios.post(createAnOfer, offerData)
//       // ----notification handler
//       const createNotification = await axios.post(createNotificationUrl, {sender: employer, recipient: candidate,application: application, message: "Offer letter"});
//       dispatch(addNotification(createNotification.data))
//       toast.success('Successfully updated')
//     }catch(error){
//       toast.error('Error try again')
//     }
//   }


//   return (
//     <div className='top-0 w-full h-full flex items-center justify-center px-24 py-4 bg-white'>
//       <div className='w-full'>
//         <div className='w-full flex items-center justify-center'>
//         <h1 className='font-semibold text-2xl uppercase mb-4'>Resumption confirmation for employment</h1>
//         </div>
//         <div className='relative h-32 mt-4 w-full block'>
//           <div className='absolute right-10'>
//             <h3>{`${applicantInfo?.firstName}`} {`${applicantInfo?.lastName}`}</h3>
//             <h3>{`${applicantInfo?.localGovernment}, ${applicantInfo?.state}`}</h3>
//             <h3>{`${applicantInfo?.country}`}</h3>
//             <h3>{`${applicantInfo?.phoneNumber}`}</h3>
//           </div>
//         </div>
//         <div className='my-4 flex items-center justify-between'>
//           <div className=''>
//             <span>Resumption time</span>
//             <input onChange={handleForm} name='resumptionDate' type="time" className='border-b-2 ml-2 border-black outline-none'/>
//           </div>
//           <div>
//             <span>Resumption Date</span>
//             <input onChange={handleForm} name='resumptionTime' type="date" className='border-b-2 ml-2 border-black outline-none'/>
//           </div>
//         </div>
//         {/* salutaion */}
//         <div className='my-4 flex items-center justify-between'>
//           <div className='mb-2'>
//             <span>Miss/Mr/Mrs</span>
//           </div>
//           <div>
//             <span>Reg</span>
//           </div>
//         </ div>
//         {/* content section */}
//         <div>
//         <p>
//           After your interview with this company, you are hereby shortlisted for employment, since we have acknowledged you to be qualified for this
//           position.
//         </p>
//         <p>You are expected to resume on <span className='underline w-28'>{offerData.resumptionDate || ""}</span> by <span className='underline w-28'>{offerData.resumptionTime || ""}</span>. Failure to do this would not be tolorated
//         You are offered the sum of N <input onChange={handleForm} name='amount' className='border-b-2 ml-2 border-black outline-none' type='number'/> per month while after three of six months’ probation revert to the expected salary offer or
//         review subject to your performance.
//         </p>
//         <p>You can now call the number below for more information.</p>
//         </div>
//         <div className='mt-6'>
//           <h3>Yours Faithfully</h3>
//           <h3>{`${applicationInfo?.companyId?.companyName}`}</h3>
//           <h3>{`${applicationInfo?.companyId?.localGovernment}, ${applicationInfo?.companyId?.state}`}</h3>
//         </div>
//         <div className='flex items-center mt-4 gap-5'>
//         <button onClick={handleOffer} className='px-6 py-2 bg-orange-400 text-white '>Send</button>
//         <Link to={`/employer/${employer}`} className='px-6 py-2 bg-red-400 text-white'>Back to profile</Link>
//         </div>

//     </div>
//     </div>
//   )
// }

// export default MakeOffer

// --------Make offer---------

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNotification } from '../redux/notification/notificationSlice';

function MakeOffer({ companyName, companyAddress, Country, phoneNumber }) {
  const updateApplication = "http://localhost:3003/api/v1/application/updateApplication";
  const createAnOffer = "http://localhost:3003/api/v1/offer/createOffer";
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const { employer, candidate, application, index } = useParams();
  const fetchApplication = 'http://localhost:3003/api/v1/application/getAnApplication';
  const fetchApplicant = 'http://localhost:3003/api/v1/jobSeeker/getAjobSeeker';
  const createNotificationUrl = "http://localhost:3003/api/v1/notification/createNotification";
  const [applicationInfo, setApplicationInfo] = useState({});
  const [applicantInfo, setApplicantInfo] = useState({});
  const [offerData, setOfferData] = useState({
    employer,
    candidate,
    application
  });

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      const applicationDetails = await axios.post(fetchApplication, { applicantionId: application });
      const applicantDetails = await axios.post(fetchApplicant, { jobSeekerId: candidate });
      setApplicationInfo(applicationDetails.data);
      setApplicantInfo(applicantDetails.data);
    }
    fetchApplicationDetails();
  }, []);

  const handleForm = (e) => {
    setOfferData({ ...offerData, [e.target.name]: e.target.value });
  }

  const handleOffer = async (e) => {
    e.preventDefault();
    try {
      const updateCurrentApplication = await axios.put(updateApplication, { applicationId: application, status: 'Offer' });
      // Send offer letter to candidate.
      await axios.post(createAnOffer, offerData);
      // Notification handler
      const createNotification = await axios.post(createNotificationUrl, { sender: employer, recipient: candidate, application: application, message: "Offer letter" });
      dispatch(addNotification(createNotification.data));
      toast.success('Successfully updated');
    } catch (error) {
      toast.error('Error try again');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-2xl font-semibold uppercase'>Resumption Confirmation for Employment</h1>
        </div>
        <div className='relative mb-8'>
          <div className='absolute right-0'>
            <h3>{applicantInfo?.firstName} {applicantInfo?.lastName}</h3>
            <h3>{applicantInfo?.localGovernment}, {applicantInfo?.state}</h3>
            <h3>{applicantInfo?.country}</h3>
            <h3>{applicantInfo?.phoneNumber}</h3>
          </div>
        </div>
        <div className='mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <span>Resumption Time</span>
              <input onChange={handleForm} name='resumptionTime' type="time" className='border-b-2 ml-2 border-gray-400 outline-none' />
            </div>
            <div>
              <span>Resumption Date</span>
              <input onChange={handleForm} name='resumptionDate' type="date" className='border-b-2 ml-2 border-gray-400 outline-none' />
            </div>
          </div>
        </div>
        <div className='mb-6'>
          <p className='mb-4'>After your interview with {companyName}, you are hereby shortlisted for employment, as we have acknowledged you to be qualified for this position.</p>
          <p className='mb-4'>You are expected to resume on <span className='underline'>{offerData.resumptionDate || "_______"}</span> by <span className='underline'>{offerData.resumptionTime || "_______"}</span>. Failure to do this would not be tolerated.</p>
          <p className='mb-4'>You are offered the sum of <span className='underline'>N <input onChange={handleForm} name='amount' type='number' className='border-b-2 border-gray-400 outline-none' /></span> per month. After a probation period of three to six months, your salary will be reviewed based on your performance.</p>
          <p className='mb-4'>You can call the number below for more information.</p>
        </div>
        <div className='mb-6'>
          <h3>Yours Faithfully,</h3>
          <h3>{applicationInfo?.companyId?.companyName}</h3>
          <h3>{applicationInfo?.companyId?.localGovernment}, {applicationInfo?.companyId?.state}</h3>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <button onClick={handleOffer} className='px-6 py-2 bg-blue-500 text-white rounded'>Send</button>
          <Link to={`/employer/${employer}`} className='px-6 py-2 bg-red-500 text-white rounded'>Back to Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default MakeOffer;
