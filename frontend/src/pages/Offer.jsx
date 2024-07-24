// ---------Version 2--------
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Background from '../assets/Images/letterBack.jpg';
import { updateApplication } from '../redux/applicationList/applicationSlice';
import { toast } from 'react-toastify';
import LoadSpinner from '../component/Modals/LoadSpinner';
import { addNotification } from '../redux/notification/notificationSlice';


// -----------------Status---------------------
const updateOfferURL = `${process.env.REACT_APP_API_URL}offer/updateOffer`;
// -----------------Status---------------------

const Offer = () => {
    const [loading, setLoading] = useState(null)
    // const [loading, setLoading] = useState(false)
    const offerId = useParams().offerId
    const applicationId = useParams().applicationId
    const dispatch = useDispatch()
    const fetchOfferURL = `${process.env.REACT_APP_API_URL}offer/getAnOffer`
    const [offerData, setOfferData] = useState({})
    const navigate = useNavigate()

    // -------------Fetch offer once when page loads-----------
    useEffect(()=>{
        const getAnOfferDetails = async()=>{
            const offerDetails = await axios.post(fetchOfferURL, {offerId}, {withCredentials: true})
            setOfferData(offerDetails.data)
        }
        getAnOfferDetails()
    },[offerId])

    const handleOfferResponse = async(response)=>{
      setLoading(response)
        try{
            const updateOffer = await axios.put(updateOfferURL, {
                status: response,
                offerId: offerId,
                sender: offerData.employer._id,
                recipient: offerData.candidate._id,
                application:applicationId
            }, {withCredentials: true})

            // -----------Set and pdate in redux------------
            const data = updateOffer.data.offer
            const notificatication = updateOffer.notificatication
            dispatch(updateApplication(data))
            dispatch(addNotification(notificatication))
            toast.success('Successfull')
            navigate('/')
            setLoading(null)
          }catch(error){
            console.log(error)
            toast.error('Error, pls try again')
            setLoading(null)
        }
    }

  return (
    <div className='p-4 sm:p-10 w-full'>
      <Header />
      <div className='flex items-center justify-center'>
        <div style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }} className='relative bg-white mt-4 shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-2xl'>
          <div className='absolute inset-0 bg-black opacity-50 rounded-lg'></div>
          <div className='relative z-10 text-white'>
            <div className='text-center mb-8'>
              <h1 className='text-xl sm:text-2xl font-semibold uppercase'>Resumption Confirmation for Employment</h1>
            </div>
            <div className='relative mb-10'>
              <div>
                <h3>{offerData?.candidate?.firstName} {offerData?.candidate?.lastName}</h3>
                <h3>{offerData?.candidate?.localGovernment} {offerData?.candidate?.state}</h3>
                <h3>{offerData?.candidate?.country}</h3>
                <h3>{offerData?.candidate?.phoneNumber}</h3>
              </div>
            </div>
            <div className='mb-6'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
                <div className='mb-4 sm:mb-0'>
                  <span className='font-semibold'>Resumption Time</span>
                  <p className='text-lg'>{offerData?.resumptionTime}</p>
                </div>
                <div>
                  <span className='font-semibold'>Resumption Date</span>
                  <p className='text-lg'>{offerData?.resumptionDate}</p>
                </div>
              </div>
            </div>
            <div className='mb-6'>
              <p className='mb-4'>Dear {offerData?.candidate?.firstName}</p>
              <p className='mb-4'>
                After a thorough review of your qualifications and a successful interview with <strong>{offerData?.employer?.companyName}</strong>, we are pleased to inform you that you have been shortlisted for employment. We believe that your skills and experience make you a valuable addition to our team.
              </p>
              <p className='mb-4'>
                You are expected to resume work on <span className='underline'>{offerData?.resumptionDate}</span> by <span className='underline'>{offerData.resumptionTime}</span>. Please ensure you adhere to this schedule, as timely resumption is crucial for onboarding.
              </p>
              <p className='mb-4'>
                You are offered a monthly salary of <span className='underline'>N {offerData?.amount}</span>. After a probation period of three to six months, your salary will be reviewed based on your performance.
              </p>
              <p className='mb-4'>
                Should you have any questions or need further information, please do not hesitate to call the number below. We look forward to having you on our team and contributing to our mutual success.
              </p>
            </div>
            <div className='mb-6'>
              <h3>Sincerely,</h3>
              <h3><strong>{offerData?.employer?.companyName}</strong></h3>
              <h3>{offerData?.employer?.localGovernment}, {offerData?.employer?.country}</h3>
            </div>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button onClick={()=>{handleOfferResponse('Accepted')}} className='px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4 sm:mb-0'>
                {loading === 'Accepted' ? <LoadSpinner/> : 'Accept'}
              </button>
              <button onClick={()=>{handleOfferResponse('Rejected')}} className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
                {loading === 'Rejected' ? <LoadSpinner/> : 'Reject Offer'}
              </button>
            </div>
            <div className='text-center mt-6'>
              <Link to={`/`} className='px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'>Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
