import JobChoice from "./JobChoice";
import { jobCategories } from "../assets/data";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadSpinner from "./Modals/LoadSpinner";

const StepFour = (props) => {
  const { next, prev, formData, setFormData } = props;
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");
  const [thirdChoice, setThirdChoice] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [jobChoice, setChoices] = useState([]);
  const [loading, setLoading] = useState(false)
  const baseURL = `${process.env.REACT_APP_API_URL}auth/signup`;

  const handleCategorySelection = (e) => {
    const select =
      "text-sm sm:text-md py-1 px-6 cursor-pointer text-white bg-orange-500 rounded-3xl border-2 border-orange-500 hover:bg-orange-500 hover:text-white";
    const deSelect =
      "text-sm sm:text-md py-1 px-6 cursor-pointer text-orange-500 bg-white rounded-3xl border-2 border-orange-500 hover:bg-orange-500 hover:text-white";

    //-----Handle UI change------
    if (e.target.className === select) {
      e.target.className = deSelect;
    } else {
      e.target.className = select;
    }

    //--------Add text to array list-----------
    const value = e.target.innerText;
    if (jobChoice.includes(value)) {
      const newChoices = jobChoice.filter((choice) => choice !== value);
      setChoices(newChoices);
    } else {
      setChoices([...jobChoice, value]);
    }

    setFormData({ ...formData, jobChoice: jobChoice });
  };

  const interestedChoice = () => {
    const userInterest = [];
    firstChoice !== "" && userInterest.push(firstChoice);
    secondChoice !== "" && userInterest.push(secondChoice);
    thirdChoice !== "" && userInterest.push(thirdChoice);
    setFormData({ ...formData, interestedJob: userInterest });
  };

  const handlePrevious = () => {
    const previousPage = "stepThree";
    prev(previousPage);
  };

  const handleNext = async () => {
    setLoading(false)
    setError("")
    interestedChoice();
    if(!formData.interestedJob){
      setError('Kindly fill job choices')
      return
    }
    try {
      setLoading(true)
      const response = await axios.post(baseURL,formData);
      if (response.statusText === "OK") {
        setLoading(false)
        toast.success('signup success')
        navigate("/signin");
      } else {
        setError("error creating user");
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast.error('signup error');
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-screen sm:h-screen h-auto flex items-center justify-center">
      <div className="relative sm:mt-0 mt-10 sm:w-1/2 sm:h-3/4 h-auto text-center">
        <div className="">
          <h3
            onClick={handlePrevious}
            className="cursor-pointer absolute -top-4 w-fit sm:-top-8 sm:right-0 right-3 py-0.5 border-[1px] border-red-600 hover:bg-white hover:text-red-500 px-4 bg-red-500 text-slate-50"
          >
            back
          </h3>
        </div>
        <h3 className="text-lg my-4">What kind of Job are you searching for</h3>
        <h3 className="sm:text-sm text-xs px-2 my-4 font-semibold">
          Why are we asking this off you? So we can narrow down job openings
          specifically for you. Probably if your preferred job doesnt come in
          time, you would have other thing to fall into.
        </h3>
        <div className="flex flex-wrap items-center justify-evenly my-4">
          <JobChoice
            setUserChoice={setFirstChoice}
            label="Job first choice"
            placeholder="General manager"
          />
          <JobChoice
            setUserChoice={setSecondChoice}
            label="Job second choice"
            placeholder="General manager"
          />
          <JobChoice
            setUserChoice={setThirdChoice}
            label="Job third choice"
            placeholder="General manager"
          />
        </div>
        <h3 className="sm:text-left text-center font-semibold my-4">
          Which kind of job are you interested in
        </h3>
        <div className="flex items-center justify-center sm:w-full w-4/5 mx-auto flex-wrap gap-4">
          {jobCategories.map((category, index) => {
            return (
              <span
                key={index}
                className="text-sm sm:text-md py-1 px-6 cursor-pointer text-orange-500 bg-white rounded-3xl border-2 border-orange-500 hover:bg-orange-500 hover:text-white"
                onClick={handleCategorySelection}
              >
                {category}
              </span>
            );
          })}
        </div>
        <span
          className={`${
            error ? "block" : "hidden"
          } block p-2 text-red-600 bg-red-300 mt-3`}
        >
          {error}
        </span>
        <button
          className="text-slate-50 hover:brightness-90 bg-orange-500 my-5 w-1/2 py-2"
          onClick={handleNext}
        >
          {`${loading ? <LoadSpinner/> : "Submit"}`}
        </button>
      </div>
    </div>
  );
};

export default StepFour;
