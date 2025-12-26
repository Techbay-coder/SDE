import React from "react";
import { Menu,  LogOut } from "lucide-react";
// Removed unnecessary imports for display-only component
import { useNavigate } from "react-router-dom";

// NOTE: HeaderProps interface and props destructing removed for static display
interface HeaderProps {
  onMenuClick: () => void;
}

// Hardcoded user placeholder data for static display
const user = {
fullname: "Azeez Adigun",
  email: "Azeez.Adigun@example.com",
  role: "owner",
};

// Placeholder helper functions (since they were imported)
// const getInitials = (name: string) => {
//     if (!name) return "U";
//     const parts = name.split(' ');
//     return parts.map(p => p.charAt(0)).join('').toUpperCase().slice(0, 2);
// };

// const getRoleDisplayName = (role: string) => {
//     if (!role) return "User";
//     return role.replace(/_/g, ' ');
// };


const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
 
   const navigate = useNavigate();
   const udStr = sessionStorage.getItem("ud");
   const user = udStr ? JSON.parse(udStr) : null;
 // const user = DUMMY_USER;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          
          {/* Mobile Menu Button - onClick logic removed */}
          <button
             onClick={onMenuClick} 
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-2xl font-extrabold text-gray-900">
              SDE
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications (Optional/Commented out) */}
          {/* <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative">
             <Bell className="w-6 h-6" />
             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> 
          */}

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
              {/* User Avatar */}
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user ? getInitials(user?.fullName) : "U"}
              </div>
              {/* User Name & Role */}
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">
                  {user?.fullName} {/* Changed from user?.name to user?.fullName for consistency */}
                </div>
                <div className="text-xs text-gray-500">
                  {user ? getRoleDisplayName(user?.role) : ""}
                </div>
              </div>
            </button>

            {/* Dropdown Menu - Hover logic retained for display */}
            <div className={`
              absolute right-0 mt-2 w-fit min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50
            `}>
              <div className="py-1">
                {/* User Info in Dropdown */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.fullName}
                  </div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>

                {/* Profile Button (Commented out in original, keeping it commented) */}
                {/* <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                   <User className="w-4 h-4" />
                   <span>Profile</span>
                </button> */}

                {/* Sign Out Button - onClick logic removed */}
                <button
                   onClick={() =>{ sessionStorage.clear(); navigate("/login")}} // Removed dynamic function
                  className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;