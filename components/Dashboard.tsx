import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Cpu, HardDrive, Activity, Network, Users } from 'lucide-react';
import { mockSystemStats, mockTrafficData } from '../services/mockData';

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }: { title: string, value: string, subtext: string, icon: any, colorClass: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="CPU Usage" 
          value={`${mockSystemStats.cpu}%`} 
          subtext="4 Cores Active"
          icon={Cpu}
          colorClass="bg-blue-500 text-blue-500"
        />
        <StatCard 
          title="Memory Usage" 
          value={`${mockSystemStats.memory}%`} 
          subtext="2.4GB / 4GB Used"
          icon={Activity}
          colorClass="bg-purple-500 text-purple-500"
        />
        <StatCard 
          title="Disk Space" 
          value={`${mockSystemStats.disk}%`} 
          subtext="45GB / 100GB Used"
          icon={HardDrive}
          colorClass="bg-orange-500 text-orange-500"
        />
        <StatCard 
          title="Network Traffic" 
          value="1.2 TB" 
          subtext={`In: ${mockSystemStats.networkIn}Mbps / Out: ${mockSystemStats.networkOut}Mbps`}
          icon={Network}
          colorClass="bg-green-500 text-green-500"
        />
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Traffic Overview (24h)</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-slate-500">Download</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-400"></span>
                <span className="text-slate-500">Upload</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrafficData}>
                <defs>
                  <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} MB`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="download" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorDownload)" name="Download" />
                <Area type="monotone" dataKey="upload" stroke="#2dd4bf" strokeWidth={2} fillOpacity={1} fill="url(#colorUpload)" name="Upload" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">System Status</h3>
          
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">System Uptime</span>
                <span className="font-medium text-slate-900">{mockSystemStats.uptime}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-full"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Service Status (Xray)</span>
                <span className="font-medium text-green-600">Running</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-slate-400">Last check: Just now</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <span className="text-slate-500">Active Connections</span>
                </div>
                <span className="font-medium text-indigo-600">{mockSystemStats.connections}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
               <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Activity</h4>
               <ul className="space-y-3">
                 <li className="flex items-center justify-between text-xs">
                   <span className="text-slate-500">User 'alice' logged in</span>
                   <span className="text-slate-400">2m ago</span>
                 </li>
                 <li className="flex items-center justify-between text-xs">
                   <span className="text-slate-500">Node SG-01 high load</span>
                   <span className="text-orange-500">15m ago</span>
                 </li>
                 <li className="flex items-center justify-between text-xs">
                   <span className="text-slate-500">Backup completed</span>
                   <span className="text-slate-400">1h ago</span>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};