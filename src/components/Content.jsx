import { useNavigate} from 'react-router-dom';

import { useEffect, useState } from 'react';
import { ContentCard } from './Cards/Card';
import {
  CheckCircle,
  Heart,

  ThumbsDown,
  Handshake,
  Calendar,
  CheckSquare,
  Mail,
  X,
  AlertTriangle,
  Phone,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_COLLECTION_ENDPOINT;
  const [aggregatedData, setAggregatedData] = useState({});

  // Comprehensive mapping of all properties for each category
  const categoryMapping = {
    'allocated': {
      displayName: 'Allocated',
      icon: "CheckCircle",
      color: '#FF5722'
    },
    'interested': {
      displayName: 'Interested',
      icon: "Heart",
      color: '#4CAF50'
    },
    'not_interested': {
      displayName: 'Not Interested',
      icon: "ThumbsDown",
      color: '#f44336'
    },

    'closed': {
      displayName: 'Deal Closed',
      icon: "Handshake",
      color: '#3F51B5'

    },
    'meeting_booked': {
      displayName: 'Meeting Booked',
      icon: "Calendar",
      color: '#FF9800'

    },
    'meeting_done': {
      displayName: 'Meeting Done',
        icon: "CheckSquare",
      color: '#9C27B0'

    },
    'send_message': {
      displayName: 'Send Message',
        icon: "Mail",
      color: '#00BCD4'

    },
    'no_answer': {
      displayName: 'No Answer',
      icon: "X",
      color: '#E91E63'

    },
    'invalid_number': {
      displayName: 'Invalid Number',
      icon: "AlertTriangle",
      color: '#795548'

    },
    'never_answered': {
      displayName: 'Never Answered',
      icon: "Phone",
      color: '#607D8B'

    },
    'call_back': {
      displayName: 'Call Back',
      icon: "RefreshCw",
      color: '#8BC34A'

    },
    'late_followup': {
      displayName: 'Late Followup',
      icon: "ArrowLeft",
      color: '#FF5722'

    },
    'today_followup': {
      displayName: 'Today Followup',
      icon: "Calendar",
      color: '#4CAF50'

    },
    'future_followup': {
      displayName: 'Future Followup',
      icon: "ArrowRight",
      color: '#f44336'

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Calculate sums for each category
        const sums = {};
        Object.values(data).forEach(entity => {
          Object.entries(entity).forEach(([key, value]) => {
            // Skip the 'name' field as it's not a numeric value
            if (key !== 'name') {
              sums[key] = (sums[key] || 0) + value;
            }
          });
        });
        
        setAggregatedData(sums);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {Object.entries(categoryMapping).map(([key, category]) => (
         
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