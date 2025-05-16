import React from 'react';
import { Activity, Eye } from 'lucide-react';
import { SensorType, SensorData } from '../../types';

interface SensorCardProps {
  type: SensorType;
  data: SensorData;
}

const SensorCard: React.FC<SensorCardProps> = ({ type, data }) => {
  const getConfig = () => {
    switch (type) {
      case 'emg':
        return {
          title: 'EMG Stimulator',
          icon: <Activity className="h-6 w-6" />,
          description: 'Muscle Activity Monitor',
          color: 'from-violet-800 via-purple-800 to-violet-800',
          unit: 'μA',
          valueClass: data.current > 1.2 ? 'animate-pulse text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]' : ''
        };
      case 'blink':
        return {
          title: 'IR Blink Detector',
          icon: <Eye className="h-6 w-6" />,
          description: 'Eye Movement Detection',
          color: 'from-purple-800 via-violet-800 to-purple-800',
          unit: '%',
          valueClass: ''
        };
    }
  };
  
  const config = getConfig();
  
  const renderChart = () => {
    if (data.readings.length === 0 || data.status === 'inactive') {
      return (
        <div className="h-40 flex items-center justify-center">
          <p className="text-violet-300/50">No Data Available</p>
        </div>
      );
    }
    
    const chartData = data.readings.slice(-100);
    const min = data.min;
    const max = data.max;
    const range = max - min;
    
    const points = chartData.map((reading, index) => {
      const x = (index / (chartData.length - 1)) * 100;
      const normalizedValue = (reading.value - min) / range;
      const y = 100 - (normalizedValue * 80);
      return `${x},${y}`;
    }).join(' ');
    
    // Only show glow effect for EMG when active
    const isActive = type === 'emg' && data.current > 1.2;
    
    return (
      <div className="h-40 w-full relative">
        {/* Glow effect only for EMG */}
        {isActive && (
          <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-xl animate-pulse" />
        )}
        
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(139,92,246,0.1)" strokeWidth="0.5" />
          
          <polyline
            fill="none"
            stroke={isActive ? "#EF4444" : "#8B5CF6"}
            strokeWidth="2"
            points={points}
            className={`drop-shadow-[0_0_3px_${isActive ? "rgba(239,68,68,0.8)" : "rgba(139,92,246,0.5)"}]`}
          />
          
          <polyline
            fill="url(#gradient)"
            fillOpacity="0.2"
            stroke="none"
            points={`0,100 ${points} 100,100`}
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isActive ? "#EF4444" : "#8B5CF6"} stopOpacity="0.7" />
              <stop offset="100%" stopColor={isActive ? "#EF4444" : "#8B5CF6"} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };
  
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${config.color} p-0.5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transform hover:scale-[1.02] transition-transform duration-300`}>
      <div className="rounded-xl bg-gradient-to-br from-violet-950/50 to-purple-950/50 backdrop-blur-sm p-8 h-full flex flex-col border border-violet-500/10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 rounded-xl p-3 shadow-inner">
              {config.icon}
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-violet-100 mb-2">{config.title}</h3>
              <p className="text-base text-violet-300">{config.description}</p>
            </div>
          </div>
        </div>
        
        {renderChart()}
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-violet-300 mb-1">Range</span>
            <span className="text-lg text-violet-200">{data.min} - {data.max} {config.unit}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-violet-300 mb-1">Current</span>
            <span className={`text-3xl font-medium text-violet-100 ${config.valueClass}`}>
              {data.status !== 'inactive' ? `${data.current.toFixed(1)} ${config.unit}` : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;