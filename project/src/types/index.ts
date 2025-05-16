// Sensor data types
export type SensorType = 'emg' | 'blink';

export interface SensorReading {
  timestamp: number;
  value: number;
}

export interface SensorData {
  readings: SensorReading[];
  current: number;
  min: number;
  max: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'inactive';
}

// Connection status type
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

// AI Assistant types
export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}