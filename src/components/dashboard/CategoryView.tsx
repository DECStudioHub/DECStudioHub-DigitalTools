import React, { useState } from 'react';
import { Category, ToolDefinition } from '../../types';
import { TOOLS } from '../../data/toolsData';
import { IconRenderer } from '../common/IconRenderer';
import { ArrowLeft, ArrowRight, Sparkles, Calculator, Bike, Sun, Layers } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onSelectTool: (tool: ToolDefinition) => void;
  onBack: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  onSelectTool,
  onBack,
}) => {
  const [calcFilter, setCalcFilter] = useState<'all' | 'general' | 'motorcycle' | 'solar'>('all');

  const categoryTools = TOOLS.filter((t) => t.categoryId === category.id);

  const generalTools = categoryTools.filter((t) => t.subCategory === 'general');
  const motorcycleTools = categoryTools.filter((t) => t.subCategory === 'motorcycle');
  const solarTools = categoryTools.filter((t) => t.subCategory === 'solar');

  const renderToolCard = (tool: ToolDefinition) => (
    <button
      key={tool.id}
      onClick={() => onSelectTool(tool)}
      className="p-5 rounded-2xl bg-[#111827] hover:bg-[#131d31] border border-slate-800 hover:border-blue-500/40 text-left transition duration-200 group flex flex-col justify-between space-y-4"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
            <IconRenderer icon={tool.icon} className="w-5 h-5" />
          </div>
          {tool.popular && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Sparkles className="w-2.5 h-2.5" />
              POPULAR
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          {tool.shortDescription || tool.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800/70">
        <div className="flex items-center gap-1 flex-wrap">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-[#0b0f19] border border-slate-800 text-[10px] font-mono text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-400 font-medium">
          <span>Open Tool</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Category Header */}
      <div className="border-b border-slate-800 pb-5 space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/5">
            <IconRenderer icon={category.icon} className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {category.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs">
                {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Subsection Filter Pills for Calculators */}
        {category.id === 'calculators' && (
          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
            <button
              onClick={() => setCalcFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                calcFilter === 'all'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-[#111827] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All Calculators ({categoryTools.length})
            </button>
            <button
              onClick={() => setCalcFilter('general')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                calcFilter === 'general'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-[#111827] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              General ({generalTools.length})
            </button>
            <button
              onClick={() => setCalcFilter('motorcycle')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                calcFilter === 'motorcycle'
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-[#111827] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              Motorcycle ({motorcycleTools.length})
            </button>
            <button
              onClick={() => setCalcFilter('solar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                calcFilter === 'solar'
                  ? 'bg-yellow-600 text-white shadow'
                  : 'bg-[#111827] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Solar & Electrical ({solarTools.length})
            </button>
          </div>
        )}
      </div>

      {/* If category is Calculators, render organized visually into subsections */}
      {category.id === 'calculators' ? (
        <div className="space-y-10">
          {/* GENERAL SECTION */}
          {(calcFilter === 'all' || calcFilter === 'general') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    General Calculators
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {generalTools.length} tools
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generalTools.map(renderToolCard)}
              </div>
            </div>
          )}

          {/* MOTORCYCLE SECTION */}
          {(calcFilter === 'all' || calcFilter === 'motorcycle') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                    <Bike className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    Motorcycle Calculators
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {motorcycleTools.length} tools
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {motorcycleTools.map(renderToolCard)}
              </div>
            </div>
          )}

          {/* SOLAR & ELECTRICAL SECTION */}
          {(calcFilter === 'all' || calcFilter === 'solar') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-yellow-500/10 rounded-lg text-yellow-400 border border-yellow-500/20">
                    <Sun className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    Solar & Electrical Calculators
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {solarTools.length} tools
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {solarTools.map(renderToolCard)}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Standard single grid for other categories (IT, Units, Image, etc.) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map(renderToolCard)}
        </div>
      )}
    </div>
  );
};
