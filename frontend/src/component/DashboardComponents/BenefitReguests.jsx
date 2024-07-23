// ---------Version2------------
import React, { useState } from 'react';
import MessageModal from '../Modals/Mesage';
import PaymentHandler from '../PaymentHandler';

function BenefitRequests() {
  const [showMessage, setShowMessage] = useState(false);

  const HandleMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-fit">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 w-full">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount requested</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reason for request</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {['paid', 'pending', 'paid', 'denied'].map((eachCandidate, index) => (
            <tr key={index} className={`border-t ${eachCandidate === 'pending' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">{index + 1}</td>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">Shina Rambo</td>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">N400,000</td>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">N50,000</td>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">Medical expense</td>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">
                <span className='flex w-full items-center justify-center'>{eachCandidate}</span>
              </td>
              <td className="border-gray-200 text-xs font-medium text-gray-600 px-6 py-4">
                {eachCandidate === 'pending' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <PaymentHandler />
                    <button
                      className="bg-red-500 px-4 py-2 text-white rounded-sm"
                      onClick={() => { alert('Decline'); }}
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={HandleMessage}
                    className="px-4 py-2 bg-green-500 text-white rounded-sm"
                  >
                    Message
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMessage && <MessageModal toggle={HandleMessage} />}
    </div>
  );
}

export default BenefitRequests;
