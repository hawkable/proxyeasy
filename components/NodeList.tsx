import React from 'react';
import { mockNodes } from '../services/mockData';
import { Globe, Signal, Activity, AlertCircle } from 'lucide-react';

export const NodeList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockNodes.map((node) => (
        <div key={node.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${node.status === 'Offline' ? 'bg-slate-100 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{node.name}</h3>
                <p className="text-xs text-slate-500">{node.region} • {node.type}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              node.status === 'Online' ? 'bg-green-100 text-green-700' : 
              node.status === 'High Load' ? 'bg-orange-100 text-orange-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {node.status}
            </span>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                    <Activity size={16} />
                    <span>Server Load</span>
                </div>
                <span className={`font-medium ${node.load > 80 ? 'text-orange-600' : 'text-slate-900'}`}>{node.load}%</span>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${node.load > 90 ? 'bg-red-500' : node.load > 70 ? 'bg-orange-500' : 'bg-indigo-500'}`}
                  style={{ width: `${node.load}%` }}
                ></div>
             </div>

             <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-slate-600">
                    <Signal size={16} />
                    <span>Latency</span>
                </div>
                {node.status === 'Offline' ? (
                   <span className="text-xs text-slate-400">Timeout</span>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className={`font-medium ${node.latency < 100 ? 'text-green-600' : node.latency < 200 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {node.latency}ms
                        </span>
                    </div>
                )}
             </div>
             
             <div className="bg-slate-50 rounded-lg p-2 text-xs text-slate-500 font-mono truncate">
                {node.address}:{node.port}
             </div>
          </div>
        </div>
      ))}
      
      {/* Add New Node Card */}
      <button className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all group min-h-[250px]">
         <div className="p-4 rounded-full bg-slate-100 group-hover:bg-indigo-100 mb-4 transition-colors">
            <Globe size={32} />
         </div>
         <span className="font-medium">Add New Node</span>
         <span className="text-xs mt-2 text-center max-w-[200px]">Configure a new proxy server to expand your network.</span>
      </button>
    </div>
  );
};