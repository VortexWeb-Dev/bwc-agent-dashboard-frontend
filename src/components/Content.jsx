import { mockData } from '../mockData/data';
import { ContentCard } from './Cards/Card';

const Dashboard = () => {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {mockData.map((item, index) => (
            <ContentCard
              key={index}
              icon={item.icon}
              numberValue={item.numberValue}
              contentName={item.contentName}
              color={item.color}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;