import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { CategoryView } from './components/dashboard/CategoryView';
import { ToolHost } from './components/tools/ToolHost';
import { GlobalSearchModal } from './components/dashboard/GlobalSearchModal';
import { TOOLS, CATEGORIES } from './data/toolsData';
import { ToolDefinition, Category } from './types';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolDefinition | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Synchronize with URL hash for shareable links and browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('tool-')) {
        let toolId = hash.replace('tool-', '');
        if (toolId === 'solar-panel') toolId = 'solar-system';
        const found = TOOLS.find((t) => t.id === toolId);
        if (found) {
          setActiveTool(found);
          setActiveCategoryId(null);
          return;
        }
      } else if (hash.startsWith('cat-')) {
        let catId = hash.replace('cat-', '');
        if (catId === 'solar' || catId === 'motorcycle') catId = 'calculators';
        const found = CATEGORIES.find((c) => c.id === catId);
        if (found) {
          setActiveCategoryId(catId);
          setActiveTool(null);
          return;
        }
      }

      // Default to Dashboard
      if (!hash) {
        setActiveTool(null);
        setActiveCategoryId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut for Global Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectTool = (tool: ToolDefinition) => {
    setActiveTool(tool);
    setActiveCategoryId(null);
    window.location.hash = `tool-${tool.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActiveTool(null);
    window.location.hash = `cat-${categoryId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveTool(null);
    setActiveCategoryId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeCategory = activeCategoryId
    ? CATEGORIES.find((c) => c.id === activeCategoryId) || null
    : null;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar (Desktop Persistent / Mobile Drawer) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTool={activeTool}
        activeCategoryId={activeCategoryId}
        onSelectTool={handleSelectTool}
        onSelectCategory={handleSelectCategory}
        onGoHome={handleGoHome}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300">
        {/* Sticky Top Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectTool={handleSelectTool}
          onGoHome={handleGoHome}
        />

        {/* Primary Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTool ? (
            <ToolHost
              tool={activeTool}
              onBack={handleGoHome}
              onSelectCategory={handleSelectCategory}
            />
          ) : activeCategory ? (
            <CategoryView
              category={activeCategory}
              onSelectTool={handleSelectTool}
              onBack={handleGoHome}
            />
          ) : (
            <Dashboard
              onSelectTool={handleSelectTool}
              onSelectCategory={handleSelectCategory}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-[#070a12] py-8 px-4 lg:px-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">DECStudioHub</span>
              <span>— Your Everyday Digital Toolbox</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>Client-Side Local Architecture</span>
              <span>•</span>
              <button
                onClick={() => {
                  const coffee = TOOLS.find((t) => t.id === 'buy-me-a-coffee');
                  if (coffee) handleSelectTool(coffee);
                }}
                className="text-slate-400 hover:text-white transition underline"
              >
                GCash / PayPal Support
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={handleSelectTool}
      />
    </div>
  );
}
