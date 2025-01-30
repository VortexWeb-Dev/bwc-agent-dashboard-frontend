import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TableComponent = () => {
  const [currentTab, setCurrentTab] = useState('today');
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data
  const mockData = [
    { code: 'ABC123', date: '2024-01-30', name: 'John Doe', mobile: '1234567890', campaign: 'Summer Sale', followupDate: '2024-02-01' },
    // Add more mock data as needed
  ];

  const totalItems = mockData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderAgentReport = () => {
    switch(currentTab) {
      case 'today':
        return <div className="p-4">Today's Tasks Report</div>;
      case 'completed':
        return <div className="p-4">Completed Tasks Report</div>;
      default:
        return <div className="p-4">Select a tab to view report</div>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
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
      </div>

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
            {mockData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row.code}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.mobile}</td>
                <td className="px-4 py-2">{row.campaign}</td>
                <td className="px-4 py-2">{row.followupDate}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select 
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 25, 50, 100].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span>{currentPage * itemsPerPage - itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Agents Report Section */}
      <div className="mt-8 h-80">
        <h2 className="text-xl font-semibold mb-4">Agents Report</h2>
        {renderAgentReport()}
      </div>
    </div>
  );
};

export default TableComponent;