import React, { useState } from 'react';
import { Copy, Check, Smartphone, Laptop, Monitor, Apple } from 'lucide-react';

const ClientCard = ({ title, clients, icon: Icon }: { title: string, clients: string[], icon: any }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-500 hover:shadow-md transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
        <Icon size={20} />
      </div>
      <h3 className="font-semibold text-slate-800">{title}</h3>
    </div>
    <ul className="space-y-2">
      {clients.map((client) => (
        <li key={client} className="text-sm text-slate-600 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          {client}
        </li>
      ))}
    </ul>
  </div>
);

export const Subscription: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState('v2ray');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('links');

  const subscriptionLink = `https://proxyeasy.io/api/v1/client/subscribe?token=abcdef123456&flag=${selectedProtocol}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(subscriptionLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Subscription Center</h2>
        <p className="text-slate-500">Get your connection links for various clients and devices.</p>
      </div>

      {/* Protocol Selector */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200 flex max-w-2xl mx-auto">
        {['v2ray', 'clash', 'surge', 'shadowrocket'].map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProtocol(p)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
              selectedProtocol === p 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-100">
                <button 
                  onClick={() => setActiveTab('links')}
                  className={`flex-1 py-4 text-sm font-medium text-center border-b-2 ${activeTab === 'links' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  Subscription Link
                </button>
                <button 
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 py-4 text-sm font-medium text-center border-b-2 ${activeTab === 'qr' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  QR Code
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'links' ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">Universal Subscription URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={subscriptionLink}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 font-mono focus:outline-none"
                      />
                      <button 
                        onClick={handleCopy}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">
                      Copy this link and import it into your client software.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 py-4">
                     <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <img 
                          src={`https://picsum.photos/200/200?grayscale&blur=2`} 
                          alt="QR Code Placeholder" 
                          className="w-48 h-48 object-cover opacity-80"
                        />
                     </div>
                     <p className="text-sm text-slate-500">Scan with your mobile client app</p>
                  </div>
                )}
              </div>
           </div>

           {/* Client List */}
           <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Supported Clients</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ClientCard 
                    title="Windows" 
                    icon={Monitor} 
                    clients={['v2rayN', 'Clash for Windows', 'Qv2ray']} 
                 />
                 <ClientCard 
                    title="macOS" 
                    icon={Laptop} 
                    clients={['ClashX', 'Surge', 'V2RayU']} 
                 />
                 <ClientCard 
                    title="iOS" 
                    icon={Apple} 
                    clients={['Shadowrocket', 'Quantumult X', 'Stash']} 
                 />
                 <ClientCard 
                    title="Android" 
                    icon={Smartphone} 
                    clients={['v2rayNG', 'Clash for Android', 'Surfboard']} 
                 />
              </div>
           </div>
        </div>

        {/* Right: Guide */}
        <div className="lg:col-span-1">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 sticky top-6">
             <h3 className="font-semibold text-indigo-900 mb-4">Quick Start</h3>
             <ol className="space-y-5">
               <li className="relative pl-6">
                 <span className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                 <h4 className="text-sm font-semibold text-indigo-800">1. Install Client</h4>
                 <p className="text-xs text-indigo-600 mt-1">Download and install the appropriate software for your device from the list.</p>
               </li>
               <li className="relative pl-6">
                 <span className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                 <h4 className="text-sm font-semibold text-indigo-800">2. Import Subscription</h4>
                 <p className="text-xs text-indigo-600 mt-1">Copy the link or scan the QR code within your client app.</p>
               </li>
               <li className="relative pl-6">
                 <span className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                 <h4 className="text-sm font-semibold text-indigo-800">3. Update Subscription</h4>
                 <p className="text-xs text-indigo-600 mt-1">Click update to fetch the latest server node list.</p>
               </li>
               <li className="relative pl-6">
                 <span className="absolute left-0 top-0.5 w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                 <h4 className="text-sm font-semibold text-indigo-800">4. Connect</h4>
                 <p className="text-xs text-indigo-600 mt-1">Select a node (check latency first) and toggle the connection switch.</p>
               </li>
             </ol>
          </div>
        </div>

      </div>
    </div>
  );
};