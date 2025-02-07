import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from './Pagination';
// import { mockTasks } from '../mockData/data';

const TableComponent = () => {
  // const [currentTab, setCurrentTab] = useState('today');

  const mockTasks = []
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);


  const totalItems = mockTasks.length;

  return (
    <div className="p-4 space-y-4">
      <h1 className='text-3xl '>Today's Tasks</h1>
      {/* Tabs */}

      {/* <div className="flex gap-4 border-b">
        <button 
          onClick={() => setCurrentTab('today')}
          className={`px-4 py-2 ${currentTab === 'today' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Today Tasks
        </button>
        <button 
          onClick={() => setCurrentTab('completed')}
          className={`px-4 py-2 ${currentTab === 'completed' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Completed Tasks
        </button>
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-300 border-0 rounded-4xl py-2">
            <tr>
              <th className="px-4 py-2 text-left border-b">Code</th>
              <th className="px-4 py-2 text-left border-b">Date</th>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Mobile</th>
              <th className="px-4 py-2 text-left border-b">Campaign</th>
              <th className="px-4 py-2 text-left border-b">Followup Date</th>
              <th className="px-4 py-2 text-left border-b">Action</th>
            </tr>
          </thead>
          <tbody>

            { 
            mockTasks.length >0 ?
            (mockTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row.code}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.mobile}</td>
                <td className="px-4 py-2">{row.campaign}</td>
                <td className="px-4 py-2">{row.followupDate}</td>
                <td className="px-4 py-2">
                <img src="whatsapp.png" alt="" className='h-6 w-6 cursor-pointer' />
                </td>
              </tr>
            ))
            ):
            <tr>
              <td colSpan={7} className='text-center mt-4 text-xl text-red-800'>No tasks found</td>
            </tr>
            }
          </tbody>
        </table>

      </div>

      {/* Pagination */}
      <Pagination itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalItems} />
      
      {/* Agents Report Section */}
      <div className="mt-8 h-80">
        <h2 className="text-xl font-semibold mb-4">Agents Report</h2>
      </div>
    </div>
  );
};

export default TableComponent;