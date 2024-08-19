import { useState } from "react";

function OtherChoices({ choiceImage, title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMore = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="flex items-start gap-6 justify-center mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200 transition-all">
      <img className="w-44 h-40 object-cover" src={choiceImage} alt="choice" />
      <div className="w-48">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p
          className={`transition-all duration-[1000ms] ease-in overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-20'} text-sm`}
        >
          {content}
        </p>
        <button
          className="mt-2 px-3 hover:underline py-2 bg-gray-400 text-white font-semibold"
          onClick={handleMore}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      </div>
    </div>
  );
}

export default OtherChoices;