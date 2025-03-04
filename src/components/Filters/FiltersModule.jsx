import { useState } from "react";
import { FilterIcon } from "lucide-react";

export default function Filters({ onSubmit }) {
  const [filterData, setFilterData] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onSubmit(filterData); // Send filter data to Dashboard
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleFilterSubmit}>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 items-center">
        {/* From Date */}
        <div className="relative">
          <div className="text-gray-500 block py-2">From Date</div>
          <input
            type="date"
            name="fromDate"
            value={filterData.fromDate}
            onChange={handleFilterChange}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* To Date */}
        <div className="relative">
          <div className="text-gray-500 block py-2">To Date</div>
          <input
            type="date"
            name="toDate"
            value={filterData.toDate}
            onChange={handleFilterChange}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Apply Button */}
        <div className="relative">
          <div className="text-gray-500 block py-2">Apply</div>
          <button
            className="bg-white border border-gray-300 shadow-sm text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow-md transition duration-200"
            type="submit"
          >
            <div className="flex items-center justify-center">
              <FilterIcon size={20} />
              <p className="pl-1">Filter</p>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
}
