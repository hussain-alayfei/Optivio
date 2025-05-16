import React from 'react';
import GlassesVisualization from './GlassesVisualization';
import ConnectButton from './ConnectButton';
import SensorCard from './SensorCard';
import { useConnection } from '../../hooks/useConnection';
import { useSensorData, useBlinkDetection } from '../../hooks/useSensorData';

const SensorDashboard: React.FC = () => {
  const { status, lastConnected, toggleConnection } = useConnection();
  const lastBlinkTime = useBlinkDetection(status === 'connected');
  
  const emgData = useSensorData('emg', status === 'connected', lastBlinkTime);
  const blinkData = useSensorData('blink', status === 'connected', lastBlinkTime);
  
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-violet-950/50 to-purple-950/50 backdrop-blur-sm rounded-2xl p-10 md:p-12 h-[700px] flex flex-col border border-violet-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex-1">
          <GlassesVisualization 
            connectionStatus={status} 
            lastBlinkTime={lastBlinkTime}
          />
        </div>
        
        <div className="mt-16">
          <ConnectButton
            status={status}
            onToggle={toggleConnection}
            lastConnected={lastConnected}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <SensorCard type="emg" data={emgData} />
        <SensorCard type="blink" data={blinkData} />
      </div>
    </div>
  );
};

export default SensorDashboard;