import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Server, 
  Share2, 
  Terminal, 
  Settings, 
  Menu, 
  X,
  ShieldCheck,
  LogOut
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, onClick }: { to: string, icon: any, label: string, onClick?: () => void }) => {
  return (
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`
      }
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/users': return 'User Management';
      case '/nodes': return 'Node Status';
      case '/subscription': return 'Subscriptions';
      case '/deploy': return 'Quick Deployment';
      case '/settings': return 'Settings';
      default: return 'ProxyEasy';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 h-full shadow-xl">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-slate-800">
          <ShieldCheck className="text-indigo-500" size={32} />
          <h1 className="text-xl font-bold text-white tracking-tight">ProxyEasy</h1>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1 px-3 py-6 overflow-y-auto">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/users" icon={Users} label="Users" />
          <SidebarItem to="/nodes" icon={Server} label="Nodes" />
          <SidebarItem to="/subscription" icon={Share2} label="Subscriptions" />
          <SidebarItem to="/deploy" icon={Terminal} label="Deploy Guide" />
        </nav>

        <div className="p-3 mt-auto">
          <SidebarItem to="/settings" icon={Settings} label="Settings" />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors mt-1"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMobileMenu} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-indigo-500" size={28} />
            <h1 className="text-xl font-bold text-white">ProxyEasy</h1>
          </div>
          <button onClick={closeMobileMenu} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-3 py-6">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" onClick={closeMobileMenu} />
          <SidebarItem to="/users" icon={Users} label="Users" onClick={closeMobileMenu} />
          <SidebarItem to="/nodes" icon={Server} label="Nodes" onClick={closeMobileMenu} />
          <SidebarItem to="/subscription" icon={Share2} label="Subscriptions" onClick={closeMobileMenu} />
          <SidebarItem to="/deploy" icon={Terminal} label="Deploy Guide" onClick={closeMobileMenu} />
          <SidebarItem to="/settings" icon={Settings} label="Settings" onClick={closeMobileMenu} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleMobileMenu} className="md:hidden text-slate-500 hover:text-indigo-600">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-slate-800">{getPageTitle()}</h2>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-slate-900">{user || 'Admin'}</span>
                <span className="text-xs text-slate-500">{user ? `${user}@proxyeasy.com` : 'admin@proxyeasy.com'}</span>
             </div>
             <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
               {user ? user.substring(0,2).toUpperCase() : 'AU'}
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};