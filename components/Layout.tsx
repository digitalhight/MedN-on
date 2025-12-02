import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, Stethoscope, Settings, Activity } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
      active 
        ? 'bg-neon/10 text-neon border-l-4 border-neon shadow-neon' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'text-neon' : 'group-hover:text-neon transition-colors'} />
    <span className="font-medium tracking-wide">{label}</span>
  </Link>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-dark-bg text-text-main overflow-hidden font-sans selection:bg-neon selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-card border-r border-white/5 flex-shrink-0 hidden md:flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-neon flex items-center justify-center shadow-neon">
            <Activity className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            Med<span className="text-neon">Néon</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarItem to="/" icon={LayoutDashboard} label="Tableau de bord" active={location.pathname === '/'} />
          <SidebarItem to="/patients" icon={Users} label="Patients" active={location.pathname === '/patients'} />
          <SidebarItem to="/appointments" icon={Calendar} label="Rendez-vous" active={location.pathname === '/appointments'} />
          <SidebarItem to="/records" icon={FileText} label="Dossiers Médicaux" active={location.pathname === '/records'} />
          <SidebarItem to="/doctors" icon={Stethoscope} label="Médecins" active={location.pathname === '/doctors'} />
        </nav>

        <div className="p-4 border-t border-white/5">
           <SidebarItem to="/settings" icon={Settings} label="Paramètres" active={location.pathname === '/settings'} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon/10 rounded-full blur-[128px] pointer-events-none" />
        
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/10 flex items-center px-4 bg-dark-card/80 backdrop-blur-md sticky top-0 z-30 justify-between">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-neon flex items-center justify-center">
              <Activity className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg">MedNéon</span>
           </div>
           {/* Mobile menu would go here */}
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;