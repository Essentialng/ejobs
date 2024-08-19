import React from 'react';

function InterviewsReport({ data }) {
  return (
    <div className="w-full overflow-x-auto webkit-scrollbar:w-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Candidate</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Interview Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Interview Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Remark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachInterview, index) => (
            <tr className="cursor-pointer hover:bg-blue-50 hover:text-blue-900 mt-4" key={index}>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{index + 1}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.application.companyId.companyName}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{`${eachInterview.application.applicant[0]?.firstName} ${eachInterview.application.applicant[0]?.lastName}`}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.application.position}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.typeOfInterview}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.interviewLocation}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.interviewDate}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.interviewTime}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.status}</td>
              <td className="border-t border-gray-200 text-xs font-medium text-gray-600 px-6 py-4 tracking-wider">{eachInterview.interviewResponse || 'Null'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewsReport;
