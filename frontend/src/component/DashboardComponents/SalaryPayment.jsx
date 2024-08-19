// ------------Version 2------------

import React, { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import PaymentHandler from '../PaymentHandler';
import MessageModal from '../Modals/Mesage';

function SalaryPayment() {
  const [messageToggle, setMessageToggle] = useState(false);
  
  PaymentHandler();

  const handleMessage = () => {
    setMessageToggle(!messageToggle);
  };

  return (
    <div className="p-6 w-full bg-white overflow-scroll rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Employer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount Due</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">More</th>
          </tr>
        </thead>
        <tbody>
          {['Paid', 'Pending', 'Paid', 'Paid'].map((eachCandidate, index) => {
            const statusClass = eachCandidate === 'Paid' 
              ? 'bg-green-500 text-white' 
              : eachCandidate === 'Pending' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-400 text-white';
            
            return (
              <tr className="hover:bg-blue-50 hover:text-blue-900 mt-4" key={index}>
                <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{index + 1}</td>
                <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">Golden Gate Ltd</td>
                <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">Shina Rambo</td>
                <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">N150,000</td>
                <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">N100,000</td>
                <td className={`border-t border-gray-200 text-xs font-medium px-6 py-4 tracking-wider ${statusClass}`}>{eachCandidate}</td>
                <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">
                  {eachCandidate === 'Pending' 
                    ? <PaymentHandler amount='100000' email='galapagous09@gmail.com'/> 
                    : <button onClick={handleMessage} className='cursor-pointer px-4 bg-green-500 text-white inline py-2 rounded-sm'>Message</button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {messageToggle && <MessageModal toggle={handleMessage} />}
    </div>
  );
}

export default SalaryPayment;
