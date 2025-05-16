import { ReactNode } from 'react';

export type TabType = 'dashboard' | 'assistant';

export interface LayoutProps {
  children: ReactNode;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}