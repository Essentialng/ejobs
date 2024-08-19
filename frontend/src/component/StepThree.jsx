import { useEffect, useState } from 'react';
import Background from '../assets/Images/group.jpg'
import { nigeriaStates } from '../assets/jobData';
import { lgaData } from '../assets/localGov';
import {Country, State, City} from 'country-state-city'



function StepThree({ next, prev, formData, setFormData }) {
  
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const previousFormState = formData

  const handleNext = (e) => {
    e.preventDefault()
    if(!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.address || !formData.state || !formData.localGovernment || !formData.gender){
      setError(true)
      setErrorMessage("All fields are required")
      return
    }
    const nextPage = "stepFour";
    next(nextPage);
  };

  const handlePrevious = () => {
    const previousPage = "stepTwo";
    prev(previousPage);
  };

  const handleChange = (e) => {
    setError(false)
    setErrorMessage(undefined)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div style={{ backgroundImage: `url(${Background})` }} className="w-full h-full sm:w-2/3 rounded-sm sm:h-fit bg-cover bg-center flex items-center justify-center">
        <form className='sm:w-2/3 w-4/5 mx-auto h-ful relative sm:p-6 bg-cover flex flex-col items-center justify-center after:absolute after:bg-black after:z-10 after:top-0 after:left-0 after:w-full after:h-full after:opacity-55 text-white bg-white p-8'>
          <h3 className="cursor-pointer absolute -top-8 right-0 py-0.5 border-[1px] border-red-600 hover:bg-white hover:text-red-500 px-4 bg-red-500 text-slate-50" onClick={handlePrevious}>back</h3>
          <div className='w-full relative z-20'>
            <h3 className="mb-4 text-center text-xl">Further Personal Info</h3>
          <div className="flex items-center justify-between sm:gap-10 gap-2">
            <div className="w-1/2">
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="firstName">FirstName</label>
                <input className="w-full p-1.5 outline-none"
                  onChange={handleChange}
                  name="firstName"
                  type="text"
                  placeholder="James"
                />
              </div>
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="lastName">LastName</label>
                <input className="w-full p-1.5 outline-none"
                  onChange={handleChange}
                  name="lastName"
                  type="text"
                  placeholder="doe"
                />
              </div>
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="phoneNumber">Phone number</label>
                <input className="w-full p-1.5 outline-none text-gray-600"
                  onChange={handleChange}
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone number"
                />
              </div>
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="address">Address</label>
                <input className="w-full p-1.5 outline-none text-gray-600"
                  onChange={handleChange}
                  name="address"
                  type="text"
                  placeholder="Residential address"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="country">Country</label>
                <input type='text' onChange={handleChange} name="country" id="country" className='w-full p-1.5 outline-none text-gray-600' />
              </div>

              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="state">State</label>
                <input type='text' onChange={handleChange} name="state" id="state" className='w-full p-1.5 outline-none text-gray-600' />
              </div>
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="state">localGovernment</label>
                <input type='text' onChange={handleChange} name="localGovernment" id="localGovernment" className='w-full p-1.5 outline-none text-gray-600' />
              </div>
              <div className="w-full p-1.5 outline-none text-gray-600">
                <label className="text-white block" htmlFor="gender">Gender</label>
                <select className="w-full p-1.5 outline-none text-gray-600"
                  onChange={handleChange}
                  name="gender"
                  id='gender'
                  >
                    <option value='Gender' disabled>Gender</option>
                    <option value='Male' >Male</option>
                    <option value="Female" >Female</option>
                  </select>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col w-3/4 mx-auto">
            <span className={`p-2 ${error ? "block" : "hidden"} bg-red-300 text-red-600`}>{errorMessage}</span>
            <button className='w-full py-2 bg-orange-500 text-slate-50 my-2' onClick={handleNext}>Next</button>
            <button className='w-full py-2 bg-orange-500 text-slate-50 my-2'>Connect using e-verify</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StepThree;
