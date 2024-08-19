// ----------Version 2------------
import React from 'react';

function JobsInfo({data}) {
  return (
    <div className="overflow-x-scroll p-6 bg-white shadow rounded-lg">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidates</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachJob, index) => {
              const diffTime =  new Date(eachJob.vacancyDuration).getTime() - new Date(eachJob.createdAt).getTime();
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            return(
            <tr className="cursor-pointer hover:bg-orange-100 hover:text-blue-900 mt-4" key={index}>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{index + 1}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{eachJob.employer.companyName}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{eachJob.jobTitle}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{`${eachJob.localGovernment} ${eachJob.state}`}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{eachJob.applications?.length}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{eachJob.minimumQualification}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{eachJob.createdAt}</td>
              <td className="border-2 border-gray-200 text-xs font-medium text-gray-500 px-6 py-4 tracking-wider">{diffDays}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

export default JobsInfo;
