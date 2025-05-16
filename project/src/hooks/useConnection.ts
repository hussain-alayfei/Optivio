import { useState, useEffect, useCallback } from 'react';
import { ConnectionStatus } from '../types';

export function useConnection() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [lastConnected, setLastConnected] = useState<Date | null>(null);

  const connect = useCallback(() => {
    setStatus('connecting');
    
    // Faster connection simulation
    const timeout = setTimeout(() => {
      setStatus('connected');
      setLastConnected(new Date());
    }, 800); // Reduced from 2000ms to 800ms
    
    return () => clearTimeout(timeout);
  }, []);
  
  const disconnect = useCallback(() => {
    setStatus('disconnected');
  }, []);
  
  const toggleConnection = useCallback(() => {
    if (status === 'disconnected') {
      connect();
    } else if (status === 'connected') {
      disconnect();
    }
  }, [status, connect, disconnect]);
  
  return {
    status,
    lastConnected,
    connect,
    disconnect,
    toggleConnection,
    isConnecting: status === 'connecting',
    isConnected: status === 'connected',
    isDisconnected: status === 'disconnected'
  };
}