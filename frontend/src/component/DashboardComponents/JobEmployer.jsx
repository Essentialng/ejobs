// -----------Version 1--------------

import React, { useState } from 'react';
import ProfilePix from '../../assets/Images/group.jpg';
import { CgMoreVertical, CgProfile } from 'react-icons/cg';
import MessageModal from '../Modals/Mesage';
import axios from 'axios';
import LoadSpinner from '../Modals/LoadSpinner';
import { toast } from 'react-toastify';
const Profile = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>



function JobEmployer({data}) {
  const [showMessage, setShowMessage] = useState(false)
  const [moreOptions, setMoreOptions] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const updateJobEmployerURL = `${process.env.REACT_APP_API_URL}jobrecruiter/updateJobEmployer` 
  const [isLoading, setIsloading] = useState(false)


  const handleMessage = ()=>{
    setShowMessage(!showMessage)
  }

  const handleMore = (indexToShow)=>{
    currentIndex === null ? setCurrentIndex(indexToShow) : setCurrentIndex(null)
  }


  const handleBlackList = async(employerId)=>{

    try {
      setIsloading(true)
      const blacklistUser = await axios.put(updateJobEmployerURL, {
        jobEmployerId:employerId,
        isBlacklisted: true
      }, {withCredentials: true})
      setIsloading(false)
      toast.success('Success')
      setCurrentIndex(null)
    } catch (error) {
      console.log(error)
      setIsloading(false)
      setCurrentIndex(null)
      toast.error('error try again')
    }
  }

  return (
    <div className="p-6 w-fit bg-white shadow rounded-lg">
      <table className="w-full overflow-x-scroll">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jobs list</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports Made</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports Received</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blacklisted</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachCandidate, index) => (
            <tr className={`hover:bg-gray-100 mt-4 ${eachCandidate.isBlacklisted ? 'bg-red-500 text-white hover:text-gray-800' : "text-gray-500"}`} key={index}>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{index + 1}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">
                {eachCandidate.avatar ? <img alt="profile" className="w-10 h-10 rounded-full object-cover" src={eachCandidate.avatar||ProfilePix} /> : <CgProfile className='w-6 h-6'/>}
              </td>

              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.companyName}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{`${eachCandidate.localGovernment} ${eachCandidate.state}`}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.listedJobs?.length}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.reportsMade?.length || 0}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.reportsGotten?.length || 0}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.employers?.length}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider">{eachCandidate.isBlacklisted ? 'True' : 'False'}</td>
              <td className="border-2 border-gray-200 text-xs font-medium px-6 py-4 tracking-wider relative">
                <CgMoreVertical onClick={()=>{handleMore(index)}} className={`cursor-pointer`}/>
                {currentIndex === index && <div className='absolute z-30 top-14 -right-16 bg-gray-800 rounded-sm'>
                  <button onClick={handleMessage} className='px-4 py-2 hover:bg-green-400 w-full border-gray-400 text-white'>Message</button>
                  <button onClick={()=>{handleBlackList(eachCandidate._id)}} className='px-4 py-2 hover:bg-red-400 w-full border-gray-400 text-white'>
                    {isLoading ? <LoadSpinner/> : 'Blacklist'}
                  </button>
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

export default JobEmployer;
