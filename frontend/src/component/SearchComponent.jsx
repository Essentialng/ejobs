// --------------Design two--------------------
import { Link } from 'react-router-dom';

function SearchComponent({ handleSearch, handleChange }) {
  return (
    <div className="w-full text-sm">
      <form className="flex flex-wrap sm:w-fit w-full mx-auto sm:my-8 my-4 items-center border-2 border-slate-200 justify-center rounded-lg shadow-md">
        <div className="px-4 py-4 bg-gray-100 w-full text-center rounded-t-lg">
          <h3 className="text-lg font-bold text-gray-700">FIND A JOB</h3>
        </div>
        <div className="bg-gray-50 px-4 py-4 w-full flex items-center justify-center flex-wrap gap-4 rounded-b-lg">
          <input 
            onChange={handleChange} 
            name='jobTitle' 
            className='px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition' 
            type="text" 
            placeholder='Job function' 
          />
          <input 
            onChange={handleChange} 
            name='industry' 
            className='px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition' 
            type="text" 
            placeholder='Any Industry' 
          />
          <input 
            onChange={handleChange} 
            name='state' 
            className='px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition' 
            type="text" 
            placeholder='Location: Ikeja, Lagos' 
          />
          <input 
            onChange={handleChange} 
            name='workType' 
            className='px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition' 
            type="text" 
            placeholder='Type: Hybrid' 
          />
          <button 
            onClick={handleSearch} 
            className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;
