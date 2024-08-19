import { MdCancel } from "react-icons/md";
import { TbCalendarSearch} from "react-icons/tb";
import DefaultProfile from "../assets/Images/interview.jpg";
import { FaCamera } from "react-icons/fa6";
import ProfileData from "../component/ProfileData";
import Header from "../component/Header";
import FooterComponent from "../component/Footer";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { hiredApplicantList } from "../assets/data";
import LoadSpinner from "../component/Modals/LoadSpinner";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import companyContact, { setCompanyContact, updateCompanyContact } from "../redux/companyContact/companyContact";
import ProfileInput from "../component/ProfileInput";
import { updateUser } from "../redux/users/userSlice";
import { convertToBase64 } from "../Utils/fileConverter";


function EmployeePage() {
  const currentUser = useSelector((state) => state.user);
  const listedJobs = useSelector((state)=>state.EmployerListedJob.employerJobList)
  const hiredApplicantList = useSelector((state)=>state.HiredList.hiredList)
  const companyContact = useSelector((state=>state.CompanyContact.companyContact))
  const [profileUpdateListener, setProfileUpdateListener] = useState(false)
  const [companyContactPerson, setCompanyContactPerson] = useState({contactId: currentUser.currentUser.contactPerson?._id || null});
  const [companyProfile, setCompanyProfile] = useState({})

  
// -----Image previews-------
const [previewImage, setPreviewImage] = useState(null)



  // ----------URL Links---------------
  const createPersonURL = `${process.env.REACT_APP_API_URL}contactPerson/createContact`;
  const getjobURL = `${process.env.REACT_APP_API_URL}job/getAJob`;
  const updatePerson = `${process.env.REACT_APP_API_URL}contactPerson/updateContact`;
  const updateCompanyProfile = `${process.env.REACT_APP_API_URL}jobrecruiter/updateJobEmployer`



  // ----------loaders------------
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [contactLoader, setContactLoader] = useState(false)

  const dispatch = useDispatch() 
  const navigate = useNavigate();
  

// ------------Handle form change-------------
  const handleContactChange = (e) => {
    setCompanyContactPerson({ ...companyContactPerson, [e.target.name]: e.target.value });
  };



// ------------Handle Profile update--------------
  const handleUpdateProfile = async(e)=>{
    setLoadingProfile(true);
    try{
      const response = await axios.put(updateCompanyProfile, 
        companyProfile, {withCredentials: true})
      dispatch(updateUser(response.data))
      setLoadingProfile(false)
      setProfileUpdateListener(false)
      setPreviewImage(null)
      toast.success('successfully updated')
    }catch(error){
      console.log(error)
      toast.error('Error Please try again')
    }
}



// -------Handle profile change
const handleChangeProfile = (e)=>{
    const updatedProfileInfo = {
      ...companyProfile,
      [e.target.name]: e.target.value,
      jobEmployerId: currentUser.currentUser._id
    }
    setCompanyProfile(updatedProfileInfo)
    setProfileUpdateListener(true)
  }

// -----------------------Handling Image change--------------------------
const handleAvatar = async(e)=>{
    const file = e.target.files[0]
    const fileSize = file.size
    // --------check file size-----
    if(fileSize > 65540) {
      return (alert('Pls select file less than 50KB'))
    }

    // --------check file size-----
    setPreviewImage(file.name);
    // ---------convert file/image---------
    const base64 = await convertToBase64(file)
    setCompanyProfile({...companyProfile, 
      [e.target.name]: base64,
      jobEmployerId: currentUser.currentUser._id
    })
    setProfileUpdateListener(true);
  }


  // --------------------Handle contact person submission-------------------------
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setContactLoader(true)
    // ----check if its for a new contact or an update
    try{
      if(currentUser.currentUser.contactPerson || companyContact){
        setCompanyContact({...companyContact, contactId: companyContact._id})
        const updatedContact = await axios.put(updatePerson, companyContactPerson, {
            withCredentials: true
          })
          dispatch(updateCompanyContact(updatedContact.data))
          toast.success('successfully updated')
          setContactLoader(false)
      }else{
        const newContact = await axios.post(createPersonURL, companyContactPerson, {
          withCredentials: true
        })
        dispatch(setCompanyContact(newContact.data))
        toast.success('success updating')
        setContactLoader(false)
      }
    }catch(error){
      toast.error('Error try again')
      setContactLoader(false)
    }
  }



// Navigate to applicants page
  const handleApplicant = (jobId) => {
    navigate(`/${jobId}/jobApplicants`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header darkMode={false} />
      <main className="max-w-7xl mx-auto px-4 py-8 text-sm">
        
        
        {/* Profile and Contact Information */}
        <section className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">

            <div className="relative">
              <img
                className="w-24 h-24 object-cover rounded-full"
                src={currentUser.currentUser.avatar || DefaultProfile}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-gray-200 rounded-full">
                <input onChange={handleAvatar} className="hidden" type="file" name="avatar" id="profilePicture" />
                <label htmlFor="profilePicture" className="cursor-pointer">
                  <FaCamera className="text-gray-600" />
                </label>
              </div>
            </div>
            <div>
              <h2 className="sm:text-xl text-md font-semibold capitalize">{currentUser.currentUser.companyName}</h2>
              <p className="text-gray-600 text-xs">{currentUser.currentUser.email}</p>
            </div>
            </div>
            <Link to={`/${currentUser.currentUser._id}/postJob`} className="sm:py-2 py-1 sm:px-4 px-2 bg-orange-500 text-white text-sm rounded-sm">Post New Job</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProfileInput
              text="Address"
              input='text'
              name="address"
              update={handleChangeProfile}
              placeholder={currentUser.currentUser.address}
            />
            <ProfileInput
              text="Contact Number"
              input='text'
              name="phoneNumber"
              update={handleChangeProfile}
              placeholder={currentUser.currentUser.phoneNumber}
            />
            <ProfileInput
              text="Conpany Size"
              input='text'
              name="size"
              update={handleChangeProfile}
              placeholder={currentUser.currentUser.size}
            />
          </div>
          <div className="flex items-center justify-center">
          <button onClick={handleUpdateProfile} className={`${profileUpdateListener === true ? 'block' : 'hidden'} bg-green-500 text-white font-semibold flex items-center gap-2 px-4 py-1 rounded-sm`}>
            {loadingProfile ? <LoadSpinner/> : 'Update Profile'}</button>
          <p className={`${previewImage ? 'inline' : 'hidden'} `}>{previewImage}</p>
          </div>
        </section>


        {/* Company Contact Person Form */}
        <section className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Company Contact Person</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileData
                placeholder={companyContact?.firstName || companyContactPerson?.firstName}
                handleChange={handleContactChange}
                data="firstName"
                tagName="First Name"
                title="First Name"
              />
              <ProfileData
                placeholder={companyContact?.lastName || companyContactPerson?.lastName}
                handleChange={handleContactChange}
                data="lastName"
                tagName="Last Name"
                title="Last Name"
              />
              <ProfileData
                placeholder={companyContact?.email || companyContactPerson?.email || ""}
                handleChange={handleContactChange}
                data="email"
                tagName="Email"
                title="Email"
              />
              <ProfileData
                placeholder={companyContact?.position || companyContactPerson?.position || ""}
                handleChange={handleContactChange}
                data="position"
                tagName="Position"
                title="Position"
              />
              <ProfileData
                placeholder={companyContact?.phoneNumber || companyContactPerson?.phoneNumber || ""}
                handleChange={handleContactChange}
                data="phoneNumber"
                tagName="Phone Number"
                title="Phone Number"
              />
              <div className="col-span-2">
                <select
                  className="w-full border p-2 rounded"
                  name="gender"
                  id="companyRepGender"
                  onChange={handleContactChange}
                  value={companyContact?.gender || companyContactPerson?.gender || ""}
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
            >
              {contactLoader ? <LoadSpinner/> : "Submit"}
            </button>
          </form>
        </section>

        {/* ---------------Job listing------------------*/}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                </tr>
              </thead>
              <tbody>
                {listedJobs.map((applicationData, index) => (
                  <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleApplicant(applicationData._id.toString())}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{applicationData.jobTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{`${applicationData.state} ${applicationData.localGovernment}`}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{applicationData.createdAt.split('T')[0]}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{applicationData.vacancyDuration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="bg-white shadow rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">History log</h2>
          <div className="w-full flex items-center justify-between mb-2 text-lg font-semibold">
            <h2>Payment history</h2>
            <TbCalendarSearch/>
          </div>


          {/* --------------Hired individuals----------------- */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Employed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make Payment</th>
                </tr>
              </thead>
              <tbody>
                {hiredApplicantList.map((paymentData, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer">
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{paymentData.applicantName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{paymentData.position}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{paymentData.dateOfEmployment}</td>
                    <td className="px-6 py-4 text-sm text-gray-500"><button className="bg-green-400 px-6 py-2 rounded-lg text-white">Pay</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
}

export default EmployeePage;
