import React from 'react';
import { Power } from 'lucide-react';
import { ConnectionStatus } from '../../types';

interface ConnectButtonProps {
  status: ConnectionStatus;
  onToggle: () => void;
  lastConnected: Date | null;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  status, 
  onToggle,
  lastConnected
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700';
      case 'connecting':
        return 'bg-gradient-to-r from-amber-500 to-orange-600';
      case 'disconnected':
        return 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800';
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'فصل الجهاز';
      case 'connecting':
        return 'جاري الاتصال...';
      case 'disconnected':
        return 'توصيل الجهاز';
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onToggle}
        disabled={status === 'connecting'}
        className={`
          ${getStatusColor()} text-white py-3 px-6 rounded-xl flex items-center justify-center 
          transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
          shadow-lg shadow-purple-900/20 w-full max-w-sm backdrop-blur-sm
          border border-white/10
        `}
      >
        <Power 
          className={`mr-3 ${status === 'connecting' ? 'animate-pulse' : ''}`} 
          size={22} 
        />
        <span className="text-lg font-medium">{getStatusText()}</span>
      </button>
      
      {lastConnected && status === 'connected' && (
        <p className="text-sm text-purple-200 mt-3 flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
          متصل منذ: {lastConnected.toLocaleTimeString()}
        </p>
      )}
      
      {status === 'connecting' && (
        <p className="text-sm text-purple-200 mt-3 flex items-center">
          <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse" />
          جاري إنشاء الاتصال...
        </p>
      )}
    </div>
  );
};

export default ConnectButton;