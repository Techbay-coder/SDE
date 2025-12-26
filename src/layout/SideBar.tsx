import React from 'react';
import { NavLink } from 'react-router-dom';
import {
 
  Users, 
  
  Activity,
 
//   X
} from 'lucide-react';

// NOTE: UserRole type is removed as auth logic is commented out
// type UserRole = 'RM' | 'TRADE_TEAM' | 'TREASURY' | 'SGC' | 'AUDITOR';

// --- Placeholder for Auth/Props ---
// The original props and auth logic are removed for a static display.
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  // roles: UserRole[]; // Removed roles for static display
}

// NOTE: Using the original nav items, roles removed.
const navItems: NavItem[] = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { name: 'New Request', href: '/request/new', icon: Plus },
//   { name: 'My Requests', href: '/requests', icon: FileText },
//   { name: 'Trade Review', href: '/trade-review', icon: CheckSquare },
//   { name: 'Treasury Review', href: '/treasury-review', icon: DollarSign },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Audit Logs', href: '/audit-logs', icon: Activity },
];


// Placeholder CSS for the purple gradient effect on the profile and active link
// You will need to define this in your main CSS file (e.g., index.css or global.css)
// Example: .gradient-primary { background-image: linear-gradient(to right, #4c51bf, #7f9cf5); }

// The component is now a static display component without props.
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  
  // Hardcoded placeholder user data for display
//   const user = {
//     fullName: 'Azeez Adigun',
//     role: 'owner',
//   };
    const udStr = sessionStorage.getItem("ud");
  const user = udStr ? JSON.parse(udStr) : null;
  // Hardcoded NavItems (no filtering)
   
  const displayedNavItems = navItems; 

  return (
    <>
      {/* The mobile overlay and open/close logic is removed.
        The sidebar is now permanently displayed.
      */}
            {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - **Purple Background Applied** */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-54 h-screen bg-[#8A2266] shadow-2xl transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-6 p-6  ">
          <div className="flex items-center ">
            {/* Logo area */}
            <div className="w-16 h-20 rounded-lg flex items-center justify-center ">
              <img src="/src/assets/Wema_white.png" alt="Wema Logo" className="w-28 h-14 mb-8 ml-16 " />
            </div>
            {/* Text color changed to white */}
            {/* <div className="text-2xl font-semibold text-white mb-8 ">SDE</div> */}
          </div>
          
          
          <button onClick={onClose} 
         className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
         {/* <X className="w-5 h-5" /> */}
          </button> 

        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {displayedNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                 onClick={onClose} 
                className={({ isActive }) =>
                  // Text color changed for visibility and active background updated
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#8A2266] text-white shadow-md' // Active state: darker purple background
                      : 'text-gray-100 hover:bg-[#bd3799] hover:text-white' // Inactive state: light text, hover darkens
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4  ">
          <div className="flex items-center space-x-3">
            {/* Avatar color remains a purple gradient, text is white */}
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {/* Text colors changed to white/light purple */}
              <div className="text-sm font-medium capitalize text-white truncate">
                {user?.fullName}
              </div>
              <div className="text-xs text-white truncate">
                {user?.role.replace('_', ' ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;