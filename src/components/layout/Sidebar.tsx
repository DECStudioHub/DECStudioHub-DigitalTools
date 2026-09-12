import React, { useState } from 'react';
import { CATEGORIES, TOOLS } from '../../data/toolsData';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { ToolDefinition } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  X,
  Coffee,
  MessageSquare,
  Globe,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTool: ToolDefinition | null;
  activeCategoryId: string | null;
  onSelectTool: (tool: ToolDefinition) => void;
  onSelectCategory: (categoryId: string) => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTool,
  activeCategoryId,
  onSelectTool,
  onSelectCategory,
  onGoHome,
}) => {
  // Expanded categories in sidebar
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    it: false,
    calculators: true,
    units: false,
    image: false,
    donation: false,
  });

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const renderToolLink = (tool: ToolDefinition) => {
    const isSelected = activeTool?.id === tool.id;

    return (
      <button
        key={tool.id}
        onClick={() => {
          onSelectTool(tool);
          onClose();
        }}
        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-left truncate ${
          isSelected
            ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <IconRenderer icon={tool.icon} className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{tool.name}</span>
        </div>
        {tool.popular && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#090d16] border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onGoHome();
              onClose();
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow">
              DEC
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight">
                DECStudioHub
              </span>
              <span className="block text-[10px] text-slate-400">Digital Toolbox</span>
            </div>
          </button>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {/* Home / Dashboard button */}
          <button
            onClick={() => {
              onGoHome();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              !activeTool && !activeCategoryId
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard & Overview</span>
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Categorized Tools
          </div>

          {/* Categories Accordion */}
          {CATEGORIES.map((category) => {
            const isExpanded = !!expandedCategories[category.id];
            const catTools = TOOLS.filter((t) => t.categoryId === category.id);
            const isCategoryActive = activeCategoryId === category.id && !activeTool;

            return (
              <div key={category.id} className="space-y-0.5">
                <div
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition group ${
                    isCategoryActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <button
                    onClick={() => {
                      onSelectCategory(category.id);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 flex-1 text-left truncate"
                  >
                    <IconRenderer
                      icon={category.icon}
                      className="w-4 h-4 text-blue-400 group-hover:scale-110 transition"
                    />
                    <span className="truncate">{category.name}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {catTools.length}
                    </span>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-slate-400 hover:text-white rounded"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sub-tools list */}
                {isExpanded && (
                  <div className="pl-6 pr-1 py-0.5 space-y-0.5 border-l border-slate-800/80 ml-4 my-1">
                    {category.id === 'calculators' ? (
                      <div className="space-y-2.5">
                        {/* General */}
                        <div>
                          <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block px-2.5 py-1">
                            General
                          </span>
                          <div className="space-y-0.5">
                            {catTools.filter((t) => t.subCategory === 'general').map(renderToolLink)}
                          </div>
                        </div>

                        {/* Motorcycle */}
                        <div>
                          <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block px-2.5 py-1">
                            Motorcycle
                          </span>
                          <div className="space-y-0.5">
                            {catTools.filter((t) => t.subCategory === 'motorcycle').map(renderToolLink)}
                          </div>
                        </div>

                        {/* Solar & Electrical */}
                        <div>
                          <span className="text-[10px] font-semibold text-yellow-400 uppercase tracking-wider block px-2.5 py-1">
                            Solar & Electrical
                          </span>
                          <div className="space-y-0.5">
                            {catTools.filter((t) => t.subCategory === 'solar').map(renderToolLink)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      catTools.map(renderToolLink)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Support Section */}
        <div className="p-3 border-t border-slate-800 bg-[#070b13] space-y-2">
          <div className="px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Support
          </div>

          {/* 💬 Suggestion / Feedback Button/Link */}
          <a
            href="https://www.facebook.com/tuxcustodio"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#111827] hover:bg-[#162137] border border-slate-800 hover:border-blue-500/50 text-left transition group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block group-hover:text-blue-300 transition truncate">
                  💬 Suggestion / Feedback
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  Please message us on our Facebook Page.
                </span>
              </div>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1" />
          </a>

          {/* ☕ Buy Me a Coffee */}
          <button
            onClick={() => {
              const donationTool = TOOLS.find((t) => t.id === 'buy-me-a-coffee');
              if (donationTool) onSelectTool(donationTool);
              onClose();
            }}
            className="w-full p-2.5 rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 hover:border-rose-500/40 text-left transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
                <Coffee className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block group-hover:text-rose-300 transition truncate">
                  ☕ Buy Me a Coffee
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  GCash / PayPal Support
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white transition">→</span>
          </button>

          {/* 🌐 Follow DECStudioHub */}
          <div className="rounded-xl bg-[#0f1523] border border-slate-800/80 p-2 space-y-1.5">
            <div className="flex items-center gap-1.5 px-1 text-[11px] font-semibold text-slate-300">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>🌐 Follow DECStudioHub</span>
            </div>
            <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-800/60">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${s.name}: ${s.handle}`}
                  className="p-1.5 rounded-lg bg-[#151c2d] hover:bg-slate-700 text-slate-400 hover:text-white transition flex items-center justify-center flex-1"
                >
                  <IconRenderer icon={s.icon} className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
