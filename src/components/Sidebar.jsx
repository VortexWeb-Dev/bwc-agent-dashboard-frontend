import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      id: 'dashboard', 
      title: 'Agent Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      id: 'leads',
      title: 'Agent Leads', 
      icon: Users,
      dropdownItems: [
        { id: 'all_leads', title: 'ALL Leads' },
        { id: 'interested', title: 'Interested' },
        { id: 'not_interested', title: 'Not Interested' },
        { id: 'no_answer', title: 'No Answer' },
        { id: 'others', title: 'Others' },
        { id: 'scheduled_leads', title: 'Scheduled Leads' },
        { id: 'notes', title: 'Notes' }
      ]
    }
  ];

  const handleDropdownItemClick = (contentName) => {
    navigate(`/allleads?tabName=${contentName.toLowerCase().replace(/\s+/g, '_')}`);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[999] p-2 rounded-lg bg-gray-800 text-white md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 bottom-0 
        h-screen w-64 min-h-screen 
        bg-gray-800 text-white 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-700">
          <div className="text-xl font-bold mb-1 mt-8">BWC CRM</div>
          {/* <div className="text-sm text-gray-400">Sami Ullah</div> */}
          <div className="text-xs text-gray-500">AGENT</div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                    if (item.dropdownItems) {
                      toggleDropdown();
                    } else if (item.id === "dashboard") {
                      navigate("/home");
                    }
                  }}
                  className={`
                    flex items-center px-6 py-3 
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-gray-300 text-gray-800' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 ${isActive ? 'text-gray-800' : 'text-gray-300'}`}
                  />
                  <span className="flex-1">{item.title}</span>
                  {item.dropdownItems && (
                    isDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                  )}
                </a>
                
                {item.dropdownItems && isDropdownOpen && (
                  <div className="bg-gray-700">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.id}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDropdownItemClick(dropdownItem.title);
                        }}
                        className="
                          flex items-center pl-14 py-2
                          text-gray-300 hover:bg-gray-600 hover:text-white
                          transition-colors duration-200
                        "
                      >
                        {dropdownItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;