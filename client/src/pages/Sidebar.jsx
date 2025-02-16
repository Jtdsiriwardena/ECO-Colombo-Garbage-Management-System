
import { NavLink } from "react-router-dom";
import { 
  ClipboardList, 
  UsersRound, 
  LayoutDashboard, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar w-64 h-full bg-gradient-to-b from-green-800 to-green-900 text-white fixed top-0 left-0 shadow-2xl z-50">
      <div className="p-6 border-b border-green-700">
        <h1 className="text-2xl font-bold text-center text-white uppercase tracking-wider">
          ECO Colombo
        </h1>
      </div>
      
      <ul className="space-y-2 p-4">
        {[
          { 
            to: "/analytics", 
            icon: LayoutDashboard, 
            label: "Dashboard" 
          },
          { 
            to: "/complaints", 
            icon: ClipboardList, 
            label: "Complaints" 
          },
          { 
            to: "/manage-area-managers", 
            icon: UsersRound, 
            label: "Area Managers" 
          },
          { 
            to: "/settings", 
            icon: Settings, 
            label: "Settings" 
          }
        ].map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => `
                flex items-center p-3 rounded-lg 
                transition-all duration-300 
                ${isActive 
                  ? 'bg-green-600 text-white font-semibold' 
                  : 'hover:bg-green-700 hover:translate-x-1 text-green-200'
                }
              `}
            >
              <Icon className="mr-3" size={20} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Sidebar;
