import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from "../assets/Images/companyName.svg";
import Header from "../component/Header";
import { MdOutlineUpload } from 'react-icons/md';
import { BiFile } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import JobCard from '../component/JobCard';
import { toast } from 'react-toastify';
import DocViewer from 'react-doc-viewer';


function ApplicantResponse() {
  const [applicationDetails, setApplicationDetails] = useState({})
  const [jobDetails, setJobDetails] = useState({})
  const applicationId = useParams().applicationId
  const allJob = useSelector(state=>state.jobListSlice.jobList)
  const loggedInUser = useSelector((state) => state.user);

  // ------------URL routes---------------
  const fetchApplicationDetails = `${process.env.REACT_APP_API_URL}application/getAnApplication/`
  const fetchJobDetails =  `${process.env.REACT_APP_API_URL}job/getAjob`;

  // ------------Fetch job details--------------
  useEffect(()=>{
    const applicationResponse = async()=>{
      const applicationResponse = await axios.post(fetchApplicationDetails, {applicantionId: applicationId}, {withCredentials: true})
      if(applicationResponse.data){
        setApplicationDetails(applicationResponse.data)
        setJobDetails(applicationResponse.data.job)
      }
    }
    applicationResponse()
  },[])

  //-------------Fetch and set user details-------------

  const renderStatus = (status) => {
    const statuses = ['Applied', 'Shortlisted', 'Schedule', 'Interviewed', 'Hired'];
    return (
      <div className="flex items-center">
        {statuses.map((s, index) => (
          <div key={index} className="flex items-center">
            <div className={`sm:w-32 w-20 h-1 ${applicationDetails.status === s ? 'bg-black' : 'bg-gray-300'}`}></div>
            <div className={`w-3 h-3 rounded-full ${applicationDetails.status === s ? 'bg-green-600' : 'bg-gray-300'}`}>
              <p className='absolute top-3 bg-gray-300 p-2 rounded-sm -right-5 hidden hover:block'>{s}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='sm:px-24 px-4 text-sm'>
       <Header darkMode={true} />
       <div className='mt-4 flex w-full items-start gap-4 justify-start'>
         <div className='sm:w-3/5 w-full border-2 border-gray-300 rounded-sm p-4'>
           
           {/* -------------Log details section------------ */}
           <div className='flex items-start justify-between'>
             <div className="mt-4">
               <img className="w-36" src={Logo} alt="company logo" />
               <div>
                 {jobDetails.jobTitle && (
                  <h1 className="text-md font-semibold">
                    {jobDetails.jobTitle}
                  </h1>
                )}
                <p>{jobDetails.employerName}</p>
                <p>{jobDetails.state}</p>
              </div>
            </div>
            <Link to={`/profile/${loggedInUser.currentUser._id}`} className='px-4 py-2 rounded-sm bg-red-500 mt-4 text-white'>Back</Link>
          </div>

            {/* ----------Application form section------------ */}
          <div>
            <form encType="multipart/form-data">
              <div className="mt-6">
                <h3 className="text-xl font-semibold capitalize mb-4">
                  Job Details
                </h3>
                <div className="mb-6 flex text-[.8rem]">
                  <span className="px-4 py-2 bg-slate-300 text-slate-800 rounded-3xl mr-2">
                    {jobDetails.workType}
                  </span>
                  {jobDetails.currency && jobDetails.salary && (
                    <span className="px-4 py-2 bg-slate-300 text-slate-800 rounded-3xl mr-2">
                      {jobDetails.salary} {jobDetails.currency.split("-")[0]}
                    </span>
                  )}
                </div>

                {/* ------------ Application status ------------- */}
                {renderStatus(applicationDetails.status)}
                {jobDetails.jobSummary && (
                  <div>
                    <h3 className="font-semibold text-lg mt-4 mb-2">Summary</h3>
                    <p>
                      {jobDetails.jobSummary}
                    </p>
                  </div>
                )}
                {jobDetails.jobDescription && (
                  <div>
                    <h3 className="font-semibold text-lg mt-4 mb-2">How to survive in on this role</h3>
                    <ul>
                      {jobDetails.jobDescription.map((eachDescription, index) => <li key={index} className="list-disc ml-4">{eachDescription}</li>)}
                    </ul>
                  </div>
                )}
                {jobDetails.requireCoverLetter && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Why should we hire you</h3>
                    <p>
                      {applicationDetails.coverLetter}
                    </p>
                  </div>
                )}
                <div className="my-4">
                  <label className="mb-2" htmlFor="availability">
                    Availability
                  </label>
                  <p>
                    {applicationDetails.availability}
                  </p>
                </div>

                {/* ---------Question area---------- */}
                {jobDetails?.additionalInterviewQuestion && applicationDetails?.additionalQuestionResponse.length &&
                  jobDetails?.additionalInterviewQuestion?.map((eachQuestion, index) => {
                    return <div key={index} className="my-4 bg-gray-100 p-2">
                      <label htmlFor="additionalQuestionResponse">{eachQuestion}</label>
                      <p className='mt-2 font-medium'>
                        ANS: {applicationDetails?.additionalQuestionResponse[0][`Qestion-${index}`]}
                      </p>
                    </div>;
                  })}
              </div>
              <div>
                <BiFile className="w-8 h-8" />
              </div>
              <div className="form-group">
                <label
                  htmlFor="resume"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Resume/CV <span className="text-red-500">*</span>
                </label>
                {applicationDetails.resume && <p className='bg-orange-300 p-2 text-white font-semibold'>{applicationDetails.resume}</p>}
                <MdOutlineUpload className="w-10 h-10 cursor-pointer bg-orange-300 text-white rounded-full p-1 mt-4" />
                <DocViewer documents={[{uri: applicationDetails.resume}]}/>
              </div>
              {jobDetails.requireDocumentUpload && (
                <div className="my-4">
                  <label htmlFor="additionalDocument" className="mb-2">
                    Additional Document
                  </label>
                  <div className="my-2 p-2 border-2 border-slate-300 w-2/3 bg-slate-200">
                    <input
                      name="additionalDocument"
                      type="file"
                      className="bg-slate-50 rounded-md"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className='sm:w-2/5 sm:block hidden'>
          {allJob.map((eachJob, index) => (
            <JobCard key={index} data={eachJob} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApplicantResponse