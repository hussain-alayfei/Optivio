import React, { useState } from 'react';
import Layout from './components/Layout';
import SensorDashboard from './components/dashboard/SensorDashboard';
import AIAssistant from './components/assistant/AIAssistant';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assistant'>('dashboard');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' ? (
        <SensorDashboard />
      ) : (
        <AIAssistant />
      )}
    </Layout>
  );
}

export default App;