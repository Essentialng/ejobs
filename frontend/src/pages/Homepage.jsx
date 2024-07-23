// ----------Component collection---------------------
import Header from "../component/Header";
import HomevideoComponent from "../component/HomevideoComponent";
import ApplicationSteps from "../component/ApplicationSteps";
import JobPostHomePage from "../component/JobPostHomePage";
import AboutComponent from "../component/AboutComponent";
import CategoryComponent from "../component/CategoryComponent";
import ProductComponent from "../component/ProductComponent";
import TestimonialComponent from "../component/TestimonialComponent";
import StatisticsComponent from "../component/StatisticsComponent";
import FooterComponent from "../component/Footer";

// ------------------React icons-----------------
import {
  FaGreaterThan,
  FaBriefcase,
  FaHandshake,
  FaLessThan,
  FaSearch,
} from "react-icons/fa";
import { MdFactory, MdNotifications } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { BsBriefcase, BsDatabase, BsDatabaseCheck, BsPeople } from "react-icons/bs";


// ------------Video collection----------------
import Video1 from "../assets/videos/lie.mp4";
import Video2 from "../assets/videos/life.mp4";
import Video3 from "../assets/videos/pressure.mp4";
import Video4 from "../assets/videos/truth.mp4";
import OtherChoices from "../component/OtherChoices";

// ------------images collection---------------
import Background from "../assets/Images/homepage.png";
import Energy from '../assets/Images/energy.jpg'
import Health from '../assets/Images/health.jpg'
import Manufacturing from '../assets/Images/manufacturing.jpg'
import Manufacturing2 from '../assets/Images/manufacturing2.jpg'
import Technology from '../assets/Images/technology.jpg'
import Finance from '../assets/Images/finance.jpg'
import Entertainment from '../assets/Images/entertainment2.jpg'
import Entertainment2 from '../assets/Images/entertainment.jpg'
import SampleImage from "../assets/Images/group.jpg";
// import SampleImage2 from "../assets/Images/nightCompany.jpg";


// -----------React hooks collection--------------------
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// ------------Dependencies collection-------------------
import axios from "axios";

// -------------Redux reducers---------------------------
import { fetchinfJobFailure, fetchingJobStart, fetchingJobSuccess } from "../redux/jobList/jobListSlice";

// -------------Data collection----------------------------
import CounterCard from "../component/CounterCard";
import { PiBriefcaseBold, PiFactoryDuotone } from "react-icons/pi";
import { workTypes } from "../assets/jobData";


function Homepage() {
  const [currentTestimonial, setCUrrentTestimonial] = useState(0)
  const [currentJobpage, setCurrentJobPage] = useState("1");
  const loggedInUser = useSelector((state) => state.user);
  const [allJob, setAllJob] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([])
  const [activeJob, setActiveJob] = useState('recent')
  const allNotifications = useSelector(state=>state.notification.notificationList)
  const allJobURL = "http://localhost:3003/api/v1/job/allJob";
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const searchSection = useRef()


  // --------data-----------
const testimonialData = ['Musa', 'Niyi', 'Munachi', 'Sarah']

  // --------Fetch all jobs----------
  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(fetchingJobStart)
      try {
        const allJobs = await axios.get(allJobURL, {
          withCredentials: true
        });
        if(allJobs) dispatch(fetchingJobSuccess(allJobs.data))
        setAllJob(allJobs.data) 
        setSelectedJobs(allJobs.data)
      } catch (error) {
        dispatch(fetchinfJobFailure(error.message))
      }
    };
    fetchJobs();
  }, []);


  const handlejobPage = (currentPage) => {
    setCurrentJobPage(currentPage);
  };



  // -----------------Pagination system---------------
  const handleNextJobContent = () => {
    currentJobpage === "3"
      ? setCurrentJobPage("1")
      : setCurrentJobPage(String(Number(currentJobpage) + 1));
  };
  const handlePrevJobContent = () => {
    currentJobpage === "1"
      ? setCurrentJobPage("3")
      : setCurrentJobPage(String(Number(currentJobpage) - 1));
  };


  // ------hanlde job filter----------
  const handleFilter = (option)=>{
    if(option === 'part time'){
      setActiveJob('part time')
      setSelectedJobs(allJob.filter((eachJob)=>{return(eachJob.workType.toLowerCase() === 'Part-Time'.toLocaleLowerCase())}))
    }else if(option === 'full time'){
      setSelectedJobs(allJob.filter((eachJob)=>{return(eachJob.workType.toLowerCase() === 'Full-Time'.toLocaleLowerCase())}))
      setActiveJob('full time')
    }else{
      setActiveJob('recent')
      setSelectedJobs(allJob)
    }
  }

  // ----------Handle Homesearch------------
  const handleHomeSearch = (e)=>{
    e.preventDefault()
    if(formData.workType && !formData.jobTitle && !formData.state){
      setSelectedJobs(allJob.filter(eachJob=>eachJob.workType === formData.workType))
    }else if(!formData.workType && formData.jobTitle && !formData.state){
      setSelectedJobs(allJob.filter(eachJob=>eachJob.jobTitle === formData.jobTitle))
    }else if(!formData.workType && !formData.jobTitle && formData.state){
      setSelectedJobs(allJob.filter(eachJob=>eachJob.state === formData.state))
    }else if(formData.workType && formData.jobTitle && !formData.state){
      setSelectedJobs(allJob.filter(eachJob=>eachJob.workType === formData.workType && eachJob.jobTitle === formData.jobTitle))
    }else if(formData.workType && !formData.jobTitle && formData.state){
      setSelectedJobs(allJob.filter(eachJob=>eachJob.workType === formData.workType && eachJob.state === formData.state))
    }else if(!formData.workType && formData.jobTitle && formData.state){
      setSelectedJobs(allJob.filter(eachJob=>eachJob.jobTitle === formData.jobTitle && eachJob.state === formData.state))
    }
    navigate('#jobResult')
  }


  // -----------Handle scroll-------------
  const handleScroll = (e)=>{
    e.preventDefault()
    searchSection.current.scrollIntoView()
  }


  // ----------Handle changes----------------
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }



  return (
    <div className="w-screen overflow-x-hidden h-screen sm:text-md text-sm">
      
      
      {/* ----------------Hero Section---------------- */}
      <section
      style={{ background: `url(${Background}) no-repeat center center/cover` }}
      className="relative w-full min-h-screen mb-10 bg-cover sm:px-20 px-5 pb-16"
    >
      <Header lightMode={true} />
      
      {loggedInUser.currentUser && loggedInUser.currentUser.userType === 'jobSeeker' && (
        <div className="absolute top-20 right-10 flex gap-4">
          <button className="bg-orange-500 px-6 py-2 rounded-full text-white hover:bg-orange-600 transition-colors">
            <Link to={`/benefit`}>Apply for allowance</Link>
          </button>
          <button className="bg-orange-500 px-6 py-2 rounded-full text-white hover:bg-orange-600 transition-colors">
            <Link to={`/${loggedInUser.currentUser._id}/createCV`}>Create a CV</Link>
          </button>
        </div>
      )}
      
      <div className="flex flex-col items-center gap-8 mt-24 text-center text-white">
        <ul className="flex flex-wrap gap-4 justify-center font-semibold">
          <li className="cursor-pointer hover:underline">Unemployed (11)</li>
          <li className="cursor-pointer hover:underline">Employed (12)</li>
          <li className="cursor-pointer hover:underline">Self Employed (0)</li>
          <li className="cursor-pointer hover:underline">Artisans (0)</li>
          <li className="cursor-pointer hover:underline">Students (1)</li>
          <li className="cursor-pointer hover:underline">Professionals (0)</li>
          <li className="cursor-pointer hover:underline">Job Seekers (24)</li>
          <li className="cursor-pointer hover:underline">Overseas Skilled Worker (0)</li>
        </ul>
        
        <h1 className="text-4xl font-bold">
          The Easiest Way To Get Your New Job
        </h1>
        <h3 className="text-xl">
          Search 270 new jobs. <span className="text-lg">0 added in the last 24 hours</span>
        </h3>
        
        <form className="flex flex-col items-center gap-4 w-full sm:w-3/5 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex gap-4 mb-4">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              FIND A JOB
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              FIND A CANDIDATE
            </button>
          </div>
          
          <input
            className="p-2 mb-4 text-gray-600 w-full border-2 border-gray-300 rounded-md outline-none focus:border-orange-500 transition-colors"
            type="text"
            placeholder="e.g., Web Developer"
            onChange={handleChange}
            name="jobTitle"
          />
          <select
            onChange={handleChange}
            className="p-2 mb-4 w-full text-gray-600 border-2 border-gray-300 rounded-md outline-none focus:border-orange-500 transition-colors"
            name="workType"
          >
            <option disabled>Category</option>
            {
              workTypes.map((eachType, index)=>{
                return(
                  <option value={eachType.toLocaleLowerCase()}>{eachType}</option>
                )
              })
            }
          </select>
          <input
            onChange={handleChange}
            className="p-2 text-gray-600 mb-4 w-full border-2 border-gray-300 rounded-md outline-none focus:border-orange-500 transition-colors"
            type="text"
            name="state"
            placeholder="Location: Lagos"
          />
          <button
            onClick={handleScroll}
            className="bg-orange-500 px-6 py-2 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </section>

{/* ------------Job section------------- */}
  <section className="bg-white py-12 sm:py-16 px-5 sm:px-20">
  <p className="text-center text-gray-700 mb-8">
    Job allowance offers you the sum of ₦5000 - ₦10000 monthly to cover your transportation allowance to potential employers for interview and will be deducted once you get a job.
  </p>
  
  <div className="flex flex-wrap justify-center gap-16 font-semibold text-gray-800">
      <CounterCard title='ejob users' value='56' Icon={<BsPeople className="w-5 h-5"/>}/>
      <CounterCard title='Companies' value='100' Icon={<PiFactoryDuotone className="w-5 h-5"/>}/>
      <CounterCard title='Applications' value='200' Icon={<BsDatabaseCheck className="w-5 h-5"/>}/>
      <CounterCard title='Jobs' value='1200' Icon={<PiBriefcaseBold className="w-5 h-5"/>}/>
  </div>
</section>


{/* -------------------Job by job category------------------------- */}
<section className="my-20 w-full sm:px-20 px-5">
  <h1 className="text-3xl font-bold text-center uppercase mb-4 text-gray-800">
    Popular Job Categories
  </h1>
  <p className="text-center text-gray-600 mb-8">
    By utilizing our paid job listing, your jobs are displayed to more applicants and you can alter or bring down your job posting whenever it suits you. joblink.ng is by a wide margin, the most visited job platform in Nigeria, and posting your occupation on our website gives it more openness than some other job sites in Nigeria.
  </p>
  <ul className="flex items-center justify-center gap-6 flex-wrap">
    {[
      { category: "Administrative assistant", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Administrative assistant".toLocaleLowerCase()).length },
      { category: "Compliance officer", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Compliance officer".toLocaleLowerCase()).length },
      { category: "Business development", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Business development".toLocaleLowerCase()).length },
      { category: "Health service manager", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Health service manager".toLocaleLowerCase()).length },
      { category: "Management consultant", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Management consultant".toLocaleLowerCase()).length },
      { category: "Purchasing", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Purchasing".toLocaleLowerCase()).length },
      { category: "Trade Union Officials", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Trade Union Officials".toLocaleLowerCase()).length },
      { category: "Software engineer", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Software engineer".toLocaleLowerCase()).length },
      { category: "Receptionist", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Receptionist".toLocaleLowerCase()).length },
      { category: "Secretary", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Secretary".toLocaleLowerCase()).length },
      { category: "Auditing and Accounting", count: allJob.filter(eachJob=>eachJob.jobTitle.toLocaleLowerCase() === "Auditing and Accounting".toLocaleLowerCase()).length },
    ].map((item, index) => (
      <li key={index}>
        <Link
          className="text-gray-800 hover:text-blue-600 font-medium"
          to={`/searchByCategory/${item.category}`}
        >
          {item.category} ({item.count})
        </Link>
      </li>
    ))}
  </ul>
</section>


{/* --------------------Job by location----------------------- */}
  <section className="my-20 sm:px-20 px-5">
    <h1 className="text-3xl font-bold text-center uppercase mb-4 text-gray-800">
      Job By Location
    </h1>
    <p className="text-center text-gray-600 mb-6">
      We provide you jobs even at the proximity of your location and place of choice and convenience.
    </p>
    <ul className="flex items-center justify-center flex-wrap gap-6">
    {[
      { location: "lagos", label: "Lagos" },
      { location: "anambra", label: "Anambra" },
      { location: "bauchi", label: "Bauchi" },
      { location: "bayelsa", label: "Bayelsa" },
      { location: "benue", label: "Benue" },
      { location: "borno", label: "Borno" },
      { location: "cross river", label: "Cross River" },
      { location: "delta", label: "Delta" },
      { location: "ebonyi", label: "Ebonyi" },
      { location: "edo", label: "Edo" },
      { location: "ekiti", label: "Ekiti" },
      { location: "enugu", label: "Enugu" },
      { location: "fct (federal capital territory)", label: "FCT" },
      { location: "gombe", label: "Gombe" },
      { location: "imo", label: "Imo" },
      { location: "oyo", label: "Oyo" },
    ].map((item, index) => (
      <li key={index} className="text-gray-800 hover:text-blue-600">
        <Link
          to={`/searchByLocation/${item.location}`}
          className="text-md font-medium"
        >
          {item.label} ({allJob.filter(eachJob => eachJob.state.toLowerCase() === item.location).length})
        </Link>
      </li>
    ))}
  </ul>
</section>

{/* ---------------Advert section---------------- */}
<section className="sm:px-20 px-5">
    <p className="w-full border-2 border-slate-500 h-60">Adds here</p>
</section>

     
{/* --------------How we work section----------------- */}
<section className="my-20 sm:px-20 px-5">
  <h1 className="text-3xl font-bold text-center text-gray-800 border-b-2 border-orange-500 pb-2 mb-8">
    How It Works
  </h1>
  <p className="text-center text-gray-600 mb-8">
    Post your job to let us know what you are searching for, with simple-to-use job description layouts and eJobs will connect you with relevant and qualified candidates. With your job post on eJobs, it can be promoted through emails, notifications, and mobile alerts, making it easier for job seekers to find and apply for your position.
  </p>

  <div className="flex flex-col sm:flex-row items-start justify-center gap-12">
    <ApplicationSteps
      logo={<VscAccount className="w-14 h-14 text-orange-500" />}
      title="Register an Account"
      content="Connect with numerous companions, personnel, artisans, employed, unemployed, and general opportunities in your surroundings on eJobs."
    />
    <ApplicationSteps
      logo={<FaSearch className="w-14 h-14 text-orange-500" />}
      title="Search for Jobs"
      content="We have been working hard to enhance your experience, making it easier for you to find the right job fit."
    />
    <ApplicationSteps
      logo={<FaHandshake className="w-14 h-14 text-orange-500" />}
      title="Apply for Jobs"
      content="Explore a vast network of companies, organizations, and users to connect with numerous opportunities and advance your career."
    />
  </div>
</section>

<section className="my-20 sm:px-20 px-5">
  <div className="flex items-center justify-between mb-6 text-sm w-full max-w-5xl mx-auto">
    <h2 className="text-2xl font-semibold text-gray-800">Short Videos</h2>
    <Link to="/videos" className="text-lg text-blue-600 hover:underline">
      See All
    </Link>
  </div>
  <div className="flex w-full flex-wrap items-center justify-center gap-4">
    <HomevideoComponent source={Video1} likes="203" views="5,345" />
    <HomevideoComponent source={Video2} likes="203" views="5,345" />
    <HomevideoComponent source={Video3} likes="203" views="5,345" />
    <HomevideoComponent source={Video4} likes="203" views="5,345" />
  </div>
</section>

{/* ----------------Choices Section------------------- */}
<section className="my-20 sm:px-20 px-5 border-t-4 py-4 border-b-4 border-orange-500">
              <h2 className="text-xl font-semibold mb-2">Our Other Choices</h2>
              <div className="flex items-center justify-center flex-wrap gap-8">
                <OtherChoices
                  choiceImage={Technology}
                  title="Technology"
                  content="Encompasses businesses focused on the development, production, and distribution of technology products and services, including software, hardware, and IT services. This industry drives innovation and includes major segments like computing, telecommunications, and electronics"
                />
                <OtherChoices
                  choiceImage={Health}
                  title="HealthCare"
                  content="Involves organizations and professionals that provide medical services, manufacture medical equipment or drugs, and facilitate the provision of healthcare to patients. It includes hospitals, pharmaceutical companies, and biotechnology firms."
                />
                <OtherChoices
                  choiceImage={Finance}
                  title="Finance"
                  content="Comprises businesses that manage money, including banks, investment firms, insurance companies, and real estate firms. This industry is crucial for economic stability and growth, providing services like lending, investment, insurance, and financial planning."
                />
                <OtherChoices
                  choiceImage={Entertainment}
                  title="Entertainment"
                  content="Encompasses businesses that produce and distribute entertainment content, such as movies, music, television, and video games, as well as news and information services. This industry plays a significant role in shaping culture and public opinion."
                />
                <OtherChoices
                  choiceImage={Manufacturing}
                  title="Manufacturing"
                  content="Involves the production of goods using labor, machinery, and tools. This industry spans a wide range of products, from automobiles and electronics to textiles and food. Manufacturing is a backbone of industrialized economies, driving innovation and employment.
"
                />
                <OtherChoices
                  choiceImage={Energy}
                  title="Energy"
                  content="Consists of businesses involved in the production and distribution of energy, including fossil fuels (oil, gas, coal), nuclear power, and renewable energy sources (solar, wind, hydro). It is essential for powering homes, businesses, and transportation systems."
                />
              </div>
            </section>


    {/* ------------Job search section------------- */}
        <search ref={searchSection} className="bg-slate-300 py-10 sm:px-20 px-5">
          <div className="">
            <h1 className="my-4 text-slate-600 border-b-2 w-fit mx-auto text-2xl border-orange-500">
              Find Jobs
            </h1>
            <p className="text-center text-slate-600 font-semibold">
              Post a job to tell us about your project. We ll quickly match you
              with the right freelancers.
            </p>
          </div>
          <div className="my-8 flex items-center justify-center bg-slate-50 w-fit mx-auto">
            <button onClick={()=>{handleFilter('recent')}} className={`${activeJob === "recent" && "bg-orange-500 text-white"} px-4 py-2 hover:bg-orange-500 hover:text-slate-50`}>
              Recent Jobs
            </button>
            <button onClick={()=>{handleFilter('part time')}} className={`${activeJob === "part time" && "bg-orange-500 text-white"} px-4 py-2 hover:bg-orange-500 hover:text-slate-50`}>
              Part time
            </button>
            <button onClick={()=>{handleFilter('full time')}} className={`${activeJob === "full time" && "bg-orange-500 text-white"} px-4 py-2 hover:bg-orange-500 hover:text-slate-50`}>
              Full Time
            </button>
          </div>

          {/* ----------Job search section----------- */}
          <section id="jobResult" className="sm:w-2/3 w-full mx-auto sm:px-20 px-5">
            {allJob && selectedJobs.map((eachJob, index) => {
              return (
                <JobPostHomePage
                  key={index}
                  employerName={eachJob.employerName}
                  salary={eachJob.salary}
                  state={eachJob.state}
                  workType={eachJob.workType}
                  jobTitle={eachJob.jobTitle}
                  id={eachJob._id}
                />
              );
            })}
            <div className="flex mb-10 items-center justify-center gap-2 border-2 w-fit border-slate-300 mx-auto">
              <FaLessThan
                onClick={handlePrevJobContent}
                className="cursor-pointer text-slate-500 hover:text-orange-500"
              />
              <span
                onClick={() => {
                  handlejobPage("1");
                }}
                className={`${
                  currentJobpage === "1"
                    ? "px-2 bg-orange-500 text-slate-50 cursor-pointer"
                    : "ppx-2 text-slate-800 hover:bg-white hover:text-orange-500 cursor-pointer"
                }`}
              >
                1
              </span>
              <span
                onClick={() => {
                  handlejobPage("2");
                }}
                className={`${
                  currentJobpage === "2"
                    ? "px-2 bg-orange-500 text-slate-50 cursor-pointer"
                    : "ppx-2 text-slate-800 hover:bg-white hover:text-orange-500 cursor-pointer"
                }`}
              >
                2
              </span>
              <span
                onClick={() => {
                  handlejobPage("3");
                }}
                className={`${
                  currentJobpage === "3"
                    ? "px-2 bg-orange-500 text-slate-50 cursor-pointer"
                    : "ppx-2 text-slate-800 hover:bg-white hover:text-orange-500 cursor-pointer"
                }`}
              >
                3
              </span>
              <FaGreaterThan
                onClick={handleNextJobContent}
                className="cursor-pointer text-slate-500 hover:text-orange-500"
              />
            </div>
          </section>
        </search>


        {/* ------------Advert Section--------------------- */}
        <section className="w-full h-64 border-2 py-10 sm:px-20 px-5">
          <p>This is an adverts</p>
        </section>


        {/* ----------------About section------------- */}
  <section className="mt-10 py-10 sm:px-20 px-5">
    <h2 className="text-3xl text-center font-bold mb-8 text-slate-800">Why Essential Jobs</h2>
    <div className="flex items-center justify-center flex-wrap gap-4">
      <AboutComponent
        logo={<FaBriefcase className="text-orange-500 text-3xl" />}
        title="Search Millions of Jobs"
        content="We know that searching for a job is a rollercoaster ride. We bring together over 2M unique, live jobs and job applicants just in one simple search."
      />
      <AboutComponent
        logo={<FaBriefcase className="text-orange-500 text-3xl" />}
        title="Search Millions of Jobs"
        content="We know that searching for a job is a rollercoaster ride. We bring together over 2M unique, live jobs and job applicants just in one simple search."
      />
      <AboutComponent
        logo={<FaBriefcase className="text-orange-500 text-3xl" />}
        title="Search Millions of Jobs"
        content="We know that searching for a job is a rollercoaster ride. We bring together over 2M unique, live jobs and job applicants just in one simple search."
      />
      <AboutComponent
        logo={<FaBriefcase className="text-orange-500 text-3xl" />}
        title="Search Millions of Jobs"
        content="We know that searching for a job is a rollercoaster ride. We bring together over 2M unique, live jobs and job applicants just in one simple search."
      />
      <AboutComponent
        logo={<FaBriefcase className="text-orange-500 text-3xl" />}
        title="Search Millions of Jobs"
        content="We know that searching for a job is a rollercoaster ride. We bring together over 2M unique, live jobs and job applicants just in one simple search."
      />
      <AboutComponent
        logo={<FaBriefcase className="text-orange-500 text-3xl" />}
        title="Search Millions of Jobs"
        content="We know that searching for a job is a rollercoaster ride. We bring together over 2M unique, live jobs and job applicants just in one simple search."
      />
    </div>
</section>


{/* -------------Group Section--------------- */}
{/* <section className="mt-16 mb-20 sm:px-20 px-5">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-2xl font-semibold text-slate-800">Groups You May Like</h3>
    <Link className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
      See More
    </Link>
  </div>
  <div className="flex flex-wrap gap-6 items-center justify-center">
    <CategoryComponent
      categoryImage={Energy}
      categoryTitle="IT News"
      categoryMember="1"
      categoryPost="0"
    />
    <CategoryComponent
      categoryImage={Technology}
      categoryTitle="Tech Group"
      categoryMember="1"
      categoryPost="0"
    />
    <CategoryComponent
      categoryImage={SampleImage}
      categoryTitle="Group"
      categoryMember="1"
      categoryPost="0"
    />
    <CategoryComponent
      categoryImage={Entertainment}
      categoryTitle="Essential Staff"
      categoryMember="1"
      categoryPost="0"
    />
  </div>
</section> */}


{/* --------------Product Section----------------- */}
<section className="my-20 sm:px-20 px-5">
  <div className="mb-12 text-center">
    <h3 className="text-3xl font-bold uppercase text-slate-800 mb-4">
      Explore More with Essential
    </h3>
    <p className="text-lg text-slate-600">
      Promotions, deals, and special offers just for you
    </p>
  </div>
  <div className="flex flex-wrap items-center gap-6 justify-center">
    <ProductComponent
      productImage={Manufacturing2}
      productTitle="Everify"
    />
    <ProductComponent
      productImage={Entertainment}
      productTitle="e-Student"
    />
    <ProductComponent
      productImage={Manufacturing}
      productTitle="e-Jobs"
    />
    <ProductComponent
      productImage={Entertainment2}
      productTitle="e-Schools"
    />
    <ProductComponent
      productImage={Finance}
      productTitle="Oosh Business"
    />
  </div>
</section>
        
  {/* -------------------Testimonial Page-------------------- */}
        <section className="bg-slate-300 my-20 sm:px-20 py-10">
          <h3 className="mx-auto my-8 text-xl font-semibold border-b-2 border-orange-500 w-fit">Happy Employers</h3>
          <div className="flex items-center flex-col justify-center">
            <TestimonialComponent
              customerName={`${testimonialData[currentTestimonial]} Micheal`}
              customerTitle="creative director essential ltd"
              customerTestimonial="Conceiving and implementing concepts, guidelines and strategies in various creative projects and overseeing them ..."
            />  
            <div className="flex items-center justify-center">
            {[1,2,3,4].map((eachDot, index)=>{
              return(
                <div
                key={index}
                className="w-8 h-1 bg-slate-400 cursor-pointer hover:bg-slate-200"
                ></div>
              )
            })}
          </div>
        </div>
        </section>


{/* ------------------Statistic Section-------------------- */}
        <section
          style={{ backgroundImage: `url(${Manufacturing})` }}
          className="min-h-80 my-20 bg-black backdrop-filter flex flex-wrap items-center justify-center bg-cover sm:px-20 px-5"
        >
          <div className="w-full flex flex-wrap items-center justify-center h-full gap-16">
            <StatisticsComponent
              Logo={<MdFactory />}
              statisticNumber="49"
              statisticTitle="Companies"
            />
            <StatisticsComponent
              Logo={<BsDatabase />}
              statisticNumber="49"
              statisticTitle="Applications"
            />
            <StatisticsComponent
              Logo={<BsBriefcase />}
              statisticNumber="49"
              statisticTitle="Job posted"
            />
            <StatisticsComponent
              Logo={<BsPeople />}
              statisticNumber="49"
              statisticTitle="Members"
            />
          </div>
        </section>


    {/* ----------------Notification section----------------- */}
        <section className="flex items-center gap-4 justify-center my-20 sm:px-20 px-5">
          <div className=" flex gap-2 items-center relative">
            <MdNotifications className="text-orange-500 w-6 h-6" />
            {loggedInUser.currentUser && <Link to={`/${loggedInUser.currentUser._id}/notification`}>Your Job Notification</Link>}
            <span className="absolute -top-10 left-0 px-2 py-1 rounded-full bg-orange-500 text-slate-50">
              {allNotifications ? allNotifications.length : "0"}
            </span>
          </div>
          <div className="border-2 border-slate-400 rounded-lg">
            <form>
              <input
                className="outline-none px-2"
                type="text"
                placeholder="Your email"
              />
              <button className="bg-orange-500 h-full px-4 py-2 text-slate-50">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      
      <FooterComponent />
    </div>
  );
}

export default Homepage;
