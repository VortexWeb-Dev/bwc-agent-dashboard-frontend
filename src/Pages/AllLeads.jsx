import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TabbedReport = ({tabName}) => {

    const navigate = useNavigate();
  // Tab state
  const [activeTab, setActiveTab] = useState('dealClosed');


  // Form state
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    campaign: '',
    code: '',
    name: '',
    mobileNo: ''
  });

  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(tabName);


  // Tab definitions with their counts
  const tabs = [
    { id: 'dealClosed', label: 'Deal Closed', count: 0 },
    { id: 'meetingBooked', label: 'Meeting Booked', count: 0 },
    { id: 'meetingDone', label: 'Meeting Done', count: 0 },
    { id: 'sendMessage', label: 'Send Message', count: 0 },
    { id: 'invalidNumber', label: 'Invalid Number', count: 0 },
    { id: 'neverAnswered', label: 'Never Answered', count: 0 },
    { id: 'callBack', label: 'Call Back', count: 0 }
  ];

  // Mock data for campaigns
  const campaigns = ['Campaign 1', 'Campaign 2', 'Campaign 3'];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      fromDate: '',
      toDate: '',
      campaign: '',
      code: '',
      name: '',
      mobileNo: ''
    });
  };

  // Handle form submit
  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Active Tab:', activeTab);
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => 
                {
                    setActiveTab(tab.id)
                    navigate(`/allleads?tabName=${tab.label.toLowerCase().replace(/\s+/g, '_')}`)

                }}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Filters Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">From Date</label>
          <div className="relative">
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md pr-8"

            />
          </div>
        </div>

        {/* To Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">To Date</label>
          <div className="relative">
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md pr-8"

            />
          </div>
        </div>

        {/* Campaign */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Campaign</label>
          <select
            name="campaign"
            value={formData.campaign}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">--All--</option>
            {campaigns.map(campaign => (
              <option key={campaign} value={campaign}>{campaign}</option>
            ))}
          </select>
        </div>

        {/* Code */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Mobile No */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Mobile No</label>
          <input
            type="number"
            min="0"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Campaign</th>
              <th className="p-3 text-left">Last Contact</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows would be populated based on activeTab and pagination */}
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
          <span>0 of 0</span>
          <div className="flex gap-2">
            <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedReport;