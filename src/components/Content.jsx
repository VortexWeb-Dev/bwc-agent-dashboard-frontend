import { useEffect, useState } from "react";
import { ContentCard } from "./Cards/Card";
import Filters from "./Filters/FiltersModule";

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_COLLECTION_ENDPOINT;
  const [aggregatedData, setAggregatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({ fromDate: "", toDate: "" });

  const categoryMapping = {
    allocated: {
      displayName: "Allocated",
      icon: "CheckCircle",
      color: "#FF5722",
    },
    not_interested: {
      displayName: "Not Interested",
      icon: "ThumbsDown",
      color: "#f44336",
    },
    closed: { displayName: "Deal Closed", icon: "Handshake", color: "#3F51B5" },
    meeting_booked: {
      displayName: "Meeting Booked",
      icon: "Calendar",
      color: "#FF9800",
    },
    meeting_done: {
      displayName: "Meeting Done",
      icon: "CheckSquare",
      color: "#9C27B0",
    },
    no_answer: { displayName: "No Answer", icon: "X", color: "#E91E63" },
    invalid_number: {
      displayName: "Invalid Number",
      icon: "AlertTriangle",
      color: "#795548",
    },
    never_answered: {
      displayName: "Never Answered",
      icon: "Phone",
      color: "#607D8B",
    },
    call_back: {
      displayName: "Call Back",
      icon: "RefreshCw",
      color: "#8BC34A",
    },
  };

  const fetchData = async () => {
    console.log("Fetching data...");
    
    setLoading(true);
    try {
      let url = `${apiUrl}/agents`;
      if (filterData.fromDate && filterData.toDate) {
        url += `?datefrom=${filterData.fromDate}&dateto=${filterData.toDate}`;
      }
      console.log("Fetching data from:", url);
      
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data fetched:", data);
      

      const sums = {};
      Object.values(data).forEach((entity) => {
        Object.entries(entity).forEach(([key, value]) => {
          if (key !== "name") {
            sums[key] = (sums[key] || 0) + value;
          }
        });
      });

      setAggregatedData(sums);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (filterValues) => {
    setFilterData(filterValues);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filterData.fromDate && filterData.toDate) {
      fetchData();
    }
  }, [filterData]);

  return (
    <div className="p-4">
      {/* Filter Component */}
      <Filters onSubmit={handleFilterSubmit} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          : Object.entries(categoryMapping).map(([key, category]) => (
              <ContentCard
                key={key}
                icon={category.icon}
                numberValue={aggregatedData[key] || 0}
                contentName={category.displayName}
                color={category.color}
              />
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
