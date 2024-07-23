// ---------version 2-----------
import React, { useState } from 'react';
import ProfilePix from '../../assets/Images/interview.jpg';
import MessageModal from '../Modals/Mesage';
import { CgMoreVertical } from 'react-icons/cg';
import axios from 'axios';
import { toast } from 'react-toastify';

function JobSeeker({data}) {
  const [showMessage, setShowMessage] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const updateJobSeekerURL = 'http://localhost:3003/api/v1/jobseeker/updateJobSeeker'


  const handleMessage = ()=>{
    setShowMessage(!showMessage)
  }

  // ---------More button is toggled base on the current index selection--------------------
  const handleMore = (indexToSet)=>{
    currentIndex === null ? setCurrentIndex(indexToSet) : setCurrentIndex(null)
  }

  const handleBlackList = (candidateId)=>{
    // ------Update jobSeeker to blacklist
    try{
      const blacklistJobSeeker = axios.put(updateJobSeekerURL, {
        jobSeekerId: candidateId,
        isBlacklisted: true
      }, {withCredentials: true})
      setCurrentIndex(null)
      toast.success('success')
    }catch(error){
      toast.error('Error')
      console.log(error)
    }
  }

  return (
    <div className="p-6 w-fit bg-white shadow rounded-lg">
      <table className="w-full overflow-x-scroll">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports Made</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports Received</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interviews</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blacklisted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachCandidate, index) => (
            <tr className={`hover:bg-gray-100 mt-4 ${eachCandidate.isBlacklisted ? 'bg-red-500 text-white hover:text-gray-800' : "text-gray-500"}`}>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{index + 1}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">
                <img alt="profile" className="w-10 h-10 rounded-full object-cover" src={eachCandidate.avatar} />
              </td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate?.firstName}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.lastName}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.appliedJobs?.length || 0}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.reportsMade?.length || 0}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.reportsGotten?.length || 0}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate?.interviews || 0}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">50,000</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.isBlacklisted ? 'True' : 'False'}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider relative">
                <CgMoreVertical onClick={()=>{handleMore(index)}} className={`cursor-pointer`}/>
                {currentIndex === index && <div className='absolute z-30 top-14 -right-16 bg-gray-800 rounded-sm'>
                  <button onClick={handleMessage} className='px-4 py-2 hover:bg-green-400 w-full border-gray-400 text-white'>Message</button>
                  <button onClick={()=>{handleBlackList(eachCandidate._id)}} className='px-4 py-2 hover:bg-red-400 w-full border-gray-400 text-white'>Blacklist</button>
                </div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMessage && <MessageModal toggle={handleMessage}/>}
    </div>
  );
}

export default JobSeeker;
