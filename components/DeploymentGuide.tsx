import React, { useState } from 'react';
import { Terminal, Copy, Check, Server, Shield, Zap, Box } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'docker'>('script');

  const scriptCommand = `bash <(curl -Ls https://raw.githubusercontent.com/proxyeasy/install/master/install.sh)`;
  
  const dockerCommands = `git clone https://github.com/proxyeasy/proxyeasy.git
cd ProxyEasy
docker-compose up -d`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">One-Click Deployment</h2>
        <p className="text-lg text-slate-600">Deploy your private proxy server in under 5 minutes.</p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center text-center p-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
            <Server size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">OS Support</h3>
          <p className="text-sm text-slate-500 mt-1">CentOS 7+, Debian 10+, Ubuntu 18.04+</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full mb-3">
            <Zap size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">Fast Setup</h3>
          <p className="text-sm text-slate-500 mt-1">Automated environment detection and Docker setup.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-3">
            <Shield size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">Secure</h3>
          <p className="text-sm text-slate-500 mt-1">Auto-TLS configuration and secure defaults.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
          <button
            onClick={() => setActiveTab('script')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'script' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Terminal size={18} />
            <span>Auto Script</span>
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'docker' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Box size={18} />
            <span>Docker Compose</span>
          </button>
        </div>
      </div>

      {/* Command Box */}
      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-300">
              {activeTab === 'script' ? 'Install Script' : 'Manual Deployment'}
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-slate-400 text-sm mb-4">
            {activeTab === 'script' 
              ? 'Paste the following command into your server\'s SSH terminal:' 
              : 'Run these commands to manually deploy with Docker:'}
          </p>
          <div className="relative group">
            <pre className="block bg-black/50 rounded-lg p-4 pr-12 text-green-400 font-mono text-sm overflow-x-auto">
              {activeTab === 'script' ? scriptCommand : dockerCommands}
            </pre>
            <button 
              onClick={() => handleCopy(activeTab === 'script' ? scriptCommand : dockerCommands)}
              className="absolute right-2 top-2 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-all opacity-0 group-hover:opacity-100"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
         <h3 className="font-bold text-lg text-slate-800">Deployment Steps</h3>
         <div className="border-l-2 border-slate-200 pl-6 space-y-8">
            <div className="relative">
               <span className="absolute -left-[31px] bg-white border-2 border-slate-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">1</span>
               <h4 className="font-medium text-slate-900">Prepare your server</h4>
               <p className="text-sm text-slate-500 mt-1">Ensure you have a fresh VPS with root access. Open ports 80 and 443.</p>
            </div>
            
            <div className="relative">
               <span className="absolute -left-[31px] bg-white border-2 border-slate-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">2</span>
               <h4 className="font-medium text-slate-900">
                 {activeTab === 'script' ? 'Run the installation script' : 'Clone & Start Docker'}
               </h4>
               <p className="text-sm text-slate-500 mt-1">
                 {activeTab === 'script' 
                   ? 'Copy the command above and execute it. The script will install Docker, pull images, and start services automatically.' 
                   : 'Clone the repository and run docker-compose up. Ensure Docker is already installed.'}
               </p>
            </div>

            <div className="relative">
               <span className="absolute -left-[31px] bg-white border-2 border-slate-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">3</span>
               <h4 className="font-medium text-slate-900">Access the Admin Panel</h4>
               <p className="text-sm text-slate-500 mt-1">
                 Navigate to <span className="font-mono bg-slate-100 px-1 rounded">http://your-server-ip:8080</span>. 
                 Default login: <span className="font-mono font-bold">admin / admin123</span>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};