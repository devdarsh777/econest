import React, { useState } from 'react';
import { useEconest } from './context/EconestContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { AddItemModal } from './components/AddItemModal';
import { CookingModal } from './components/CookingModal';
import { ReceiptScanModal } from './components/ReceiptScanModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { ExpiryGuard } from './pages/ExpiryGuard';
import { SmartPantry } from './pages/SmartPantry';
import { ExpenseManager } from './pages/ExpenseManager';
import { WasteGuard } from './pages/WasteGuard';
import { SmartShopping } from './pages/SmartShopping';
import { AIAssistant } from './pages/AIAssistant';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

export const AppContent: React.FC = () => {
  const { activeTab } = useEconest();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'expiry':
        return <ExpiryGuard />;
      case 'pantry':
        return <SmartPantry />;
      case 'expenses':
        return <ExpenseManager />;
      case 'waste':
        return <WasteGuard />;
      case 'shopping':
        return <SmartShopping />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f4fb] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Persistent Left Sidebar */}
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Persistent Header */}
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dynamic Page Container */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <AddItemModal />
      <CookingModal />
      <ReceiptScanModal />
      <ToastContainer />
    </div>
  );
};
