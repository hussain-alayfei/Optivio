import React, { useEffect, useState } from 'react';
import { ConnectionStatus } from '../../types';

interface GlassesVisualizationProps {
  connectionStatus: ConnectionStatus;
  lastBlinkTime: number | null;
}

const GlassesVisualization: React.FC<GlassesVisualizationProps> = ({ 
  connectionStatus, 
  lastBlinkTime 
}) => {
  const [leftEyePulse, setLeftEyePulse] = useState(false);
  const [rightEyePulse, setRightEyePulse] = useState(false);
  const [transferPulse, setTransferPulse] = useState(false);
  
  useEffect(() => {
    if (lastBlinkTime && connectionStatus === 'connected') {
      const now = Date.now();
      const timeSinceBlink = now - lastBlinkTime;
      
      if (timeSinceBlink < 300) {
        setRightEyePulse(true);
        
        setTimeout(() => {
          setTransferPulse(true);
          
          setTimeout(() => {
            setLeftEyePulse(true);
            setTransferPulse(false);
            
            setTimeout(() => {
              setRightEyePulse(false);
              setLeftEyePulse(false);
            }, 300);
          }, 150);
        }, 100);
      }
    }
  }, [lastBlinkTime, connectionStatus]);

  return (
    <div className="w-full h-full relative flex items-center justify-center py-12">
      {connectionStatus === 'connecting' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <svg 
        viewBox="0 0 240 80" 
        className={`w-full h-full max-h-[500px] ${connectionStatus === 'disconnected' ? 'opacity-50' : 'opacity-100'}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M40,40 L75,40 C85,40 90,30 100,30 L140,30 C150,30 155,40 165,40 L200,40 C210,40 210,50 200,50 L165,50 C155,50 150,60 140,60 L100,60 C90,60 85,50 75,50 L40,50 C30,50 30,40 40,40 Z"
          fill="none"
          stroke={connectionStatus === 'connected' ? "#7C3AED" : "#4B5563"}
          strokeWidth="3"
          className={connectionStatus === 'connected' ? 'drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]' : ''}
        />
        
        <ellipse
          cx="60"
          cy="45"
          rx="25"
          ry="18"
          fill="none"
          stroke={leftEyePulse ? "#EC4899" : (connectionStatus === 'connected' ? "#7C3AED" : "#4B5563")}
          strokeWidth="3"
          className={leftEyePulse ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]' : (connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]' : '')}
        />
        
        <ellipse
          cx="180"
          cy="45"
          rx="25"
          ry="18"
          fill="none"
          stroke={rightEyePulse ? "#EC4899" : (connectionStatus === 'connected' ? "#7C3AED" : "#4B5563")}
          strokeWidth="3"
          className={rightEyePulse ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]' : (connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]' : '')}
        />
        
        <circle
          cx="45"
          cy="45"
          r="5"
          fill={connectionStatus === 'connected' ? "#10B981" : "#4B5563"}
          className={connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]' : ''}
        />
        
        <circle
          cx="195"
          cy="45"
          r="5"
          fill={connectionStatus === 'connected' ? "#10B981" : "#4B5563"}
          className={connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]' : ''}
        />
        
        <circle
          cx="120"
          cy="30"
          r="4"
          fill={connectionStatus === 'connected' ? "#F59E0B" : "#4B5563"}
          className={connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]' : ''}
        />
        
        <rect
          x="30"
          y="40"
          width="6"
          height="12"
          fill={connectionStatus === 'connected' ? "#3B82F6" : "#4B5563"}
          className={connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]' : ''}
        />
        
        <rect
          x="205"
          y="40"
          width="6"
          height="12"
          fill={connectionStatus === 'connected' ? "#3B82F6" : "#4B5563"}
          className={connectionStatus === 'connected' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]' : ''}
        />
        
        {transferPulse && (
          <path
            d="M100,45 C120,20 140,70 160,45"
            fill="none"
            stroke="#EC4899"
            strokeWidth="3"
            strokeDasharray="12,6"
            className="drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] animate-pulse"
          />
        )}
        
        {connectionStatus === 'connected' && !rightEyePulse && !leftEyePulse && (
          <>
            <line
              x1="170"
              y1="38"
              x2="190"
              y2="38"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeDasharray="3,3"
              className="animate-scan"
            />
            <line
              x1="170"
              y1="45"
              x2="190"
              y2="45"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeDasharray="3,3"
              className="animate-scan-delay"
            />
            <line
              x1="170"
              y1="52"
              x2="190"
              y2="52"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeDasharray="3,3"
              className="animate-scan"
            />
          </>
        )}
      </svg>
      
      <div className="absolute bottom-0 left-0 right-0 text-center text-purple-200 text-base font-medium">
        {connectionStatus === 'disconnected' && "Device disconnected"}
        {connectionStatus === 'connecting' && "Connecting to device..."}
        {connectionStatus === 'connected' && "Device connected and monitoring"}
      </div>
      
      {/* EMG Stimulator Label */}
      <div className="absolute bottom-8 left-1/4 -translate-x-1/2 transform">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
          <div className="relative bg-black/30 backdrop-blur-xl ring-1 ring-violet-500/30 rounded-full px-8 py-4">
            <span className="text-2xl font-medium bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">
              EMG Stimulator
            </span>
          </div>
        </div>
      </div>
      
      {/* IR Blink Detector Label */}
      <div className="absolute bottom-8 right-1/4 translate-x-1/2 transform">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full blur opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
          <div className="relative bg-black/30 backdrop-blur-xl ring-1 ring-indigo-500/30 rounded-full px-8 py-4">
            <span className="text-2xl font-medium bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent">
              IR Blink Detector
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-8 left-1/4 -translate-x-1/2 transform group">
        <div className="bg-gradient-to-r from-pink-600/40 to-purple-600/40 backdrop-blur-lg px-8 py-4 rounded-2xl text-2xl font-semibold text-white border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]">
          <span>العين المتأثرة</span>
        </div>
      </div>
      
      <div className="absolute top-8 right-1/4 translate-x-1/2 transform group">
        <div className="bg-gradient-to-r from-emerald-600/40 to-teal-600/40 backdrop-blur-lg px-8 py-4 rounded-2xl text-2xl font-semibold text-white border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
          <span>العين السليمة</span>
        </div>
      </div>
    </div>
  );
};

export default GlassesVisualization;