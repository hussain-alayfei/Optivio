import { useState, useEffect } from 'react';
import { SensorType, SensorData } from '../types';

// Configuration for different sensor types
const sensorConfigs = {
  emg: { 
    min: 0, 
    max: 2.4, 
    unit: 'μA',
    baselineValue: 0.2,
    noiseLevel: 0.05,
    blinkResponseMagnitude: 1.8,
    blinkResponseDuration: 100 // Faster response
  },
  blink: { 
    min: 0, 
    max: 100, 
    unit: '%',
    baselineValue: 0,
    noiseLevel: 0.2,
    blinkMagnitude: 95,
    blinkDuration: 100 // Faster blink
  }
};

// Generate realistic random data
const generateReading = (
  type: SensorType, 
  timestamp: number, 
  prevValue: number, 
  blink: boolean = false
): number => {
  const config = sensorConfigs[type];
  
  // Add random noise
  let newValue = prevValue + (Math.random() * 2 - 1) * config.noiseLevel;
  
  // Apply slight trend back toward baseline
  newValue = newValue + (config.baselineValue - newValue) * 0.4; // Faster return to baseline
  
  // Handle blink-specific behavior
  if (type === 'blink' && blink) {
    newValue = config.blinkMagnitude;
  } else if (type === 'emg' && blink) {
    newValue = config.blinkResponseMagnitude;
  }
  
  return Math.max(config.min, Math.min(config.max, newValue));
};

export function useSensorData(
  type: SensorType, 
  isConnected: boolean,
  lastBlinkTime: number | null
) {
  const config = sensorConfigs[type];
  
  const [data, setData] = useState<SensorData>({
    readings: [],
    current: config.baselineValue,
    min: config.min,
    max: config.max,
    unit: config.unit,
    status: 'inactive'
  });
  
  // Update sensor data more frequently
  useEffect(() => {
    if (!isConnected) {
      setData(prev => ({
        ...prev,
        status: 'inactive'
      }));
      return;
    }
    
    const interval = setInterval(() => {
      const now = Date.now();
      const isBlink = type === 'blink' && Math.random() < 0.1; // Increased blink frequency
      const isBlinkResponse = type === 'emg' && lastBlinkTime && (now - lastBlinkTime < sensorConfigs.emg.blinkResponseDuration);
      
      const newValue = generateReading(
        type, 
        now, 
        data.current, 
        isBlink || isBlinkResponse
      );
      
      setData(prev => {
        const readings = [...prev.readings, { timestamp: now, value: newValue }];
        if (readings.length > 150) readings.shift(); // Keep fewer readings for faster updates
        
        return {
          ...prev,
          readings,
          current: newValue,
          status: 'normal'
        };
      });
      
      if (isBlink && type === 'blink') {
        return now;
      }
    }, 5); // Much faster updates (200 times per second)
    
    return () => clearInterval(interval);
  }, [isConnected, type, data.current, lastBlinkTime]);
  
  return data;
}

export function useBlinkDetection(isConnected: boolean) {
  const [lastBlinkTime, setLastBlinkTime] = useState<number | null>(null);
  
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // Increased blink chance
        setLastBlinkTime(Date.now());
      }
    }, 50); // Much more frequent checks
    
    return () => clearInterval(interval);
  }, [isConnected]);
  
  return lastBlinkTime;
}