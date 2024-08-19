import { useState } from "react";

function OtherChoices({ choiceImage, title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMore = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="flex items-start gap-6 justify-center mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <img className="w-44 h-40 object-cover" src={choiceImage} alt="choice" />
      <div className="w-48">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-20'} text-sm`}
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


// ---version-2---------
// import { useState } from "react";

// function OtherChoices({ choiceImage, title, content }) {
//   const [expanded, setExpanded] = useState(false);

//   const toggleContent = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className="flex items-start gap-6 justify-center mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
//       <img className="w-44 h-40 object-cover rounded-md" src={choiceImage} alt="choice" />
//       <div className="w-full">
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//         <p
//           className={`transition-all duration-300 text-sm ${expanded ? 'h-auto' : 'h-20 overflow-hidden'} text-gray-600`}
//         >
//           {content}
//         </p>
//         <button
//           className="mt-2 px-4 py-2 text-sm font-semibold bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
//           onClick={toggleContent}
//         >
//           {expanded ? 'See Less' : 'See More'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OtherChoices;
