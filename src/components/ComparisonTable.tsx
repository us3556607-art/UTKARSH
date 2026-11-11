import React from 'react';
import { COMPARISON_DATA } from '../data/packages';
import { Check, Minus, Info } from 'lucide-react';

interface ComparisonTableProps {
  onSelectPackage: (pkgId: 'basic' | 'standard' | 'advanced') => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectPackage }) => {
  const renderCellContent = (val: string) => {
    if (val === '✓') {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 font-bold">
          <Check className="w-4 h-4" />
        </span>
      );
    }
    if (val === '—') {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 text-neutral-300">
          <Minus className="w-4 h-4" />
        </span>
      );
    }
    return <span className="font-semibold text-neutral-800 text-xs tabular-nums">{val}</span>;
  };

  return (
    <section id="comparison" className="py-16 lg:py-24 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
            Side-By-Side Breakdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Compare All Package Deliverables
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Every task is done manually by an experienced local SEO specialist to ensure Google policy compliance.
          </p>
        </div>

        {/* Desktop & Tablet Table */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-neutral-700 w-2/5">
                  Deliverable / Feature
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold text-neutral-900 w-1/5">
                  <div className="text-neutral-500 font-medium">Basic</div>
                  <div className="text-sm font-extrabold text-neutral-900 tabular-nums">₹399</div>
                  <div className="text-[11px] text-neutral-500 font-normal">1–2 days</div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold text-blue-700 w-1/5 bg-blue-50/60 border-x border-blue-200">
                  <div className="text-blue-600 font-semibold flex items-center justify-center gap-1">
                    Standard
                    <span className="text-[9px] bg-blue-600 text-white px-1 rounded font-bold">Best Value</span>
                  </div>
                  <div className="text-sm font-extrabold text-blue-900 tabular-nums">₹599</div>
                  <div className="text-[11px] text-blue-700 font-normal">2–3 days</div>
                </th>
                <th className="py-4 px-4 text-center text-xs font-bold text-neutral-900 w-1/5">
                  <div className="text-neutral-500 font-medium">Advanced</div>
                  <div className="text-sm font-extrabold text-neutral-900 tabular-nums">₹999</div>
                  <div className="text-[11px] text-neutral-500 font-normal">3–5 days</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs text-neutral-700">
              {COMPARISON_DATA.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={`hover:bg-neutral-50/80 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/30'
                  }`}
                >
                  <td className="py-3.5 px-6 font-medium text-neutral-900">
                    <div className="flex items-center gap-2">
                      <span>{row.feature}</span>
                      {row.tooltip && (
                        <span className="text-neutral-400 hover:text-neutral-600 cursor-help" title={row.tooltip}>
                          <Info className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {renderCellContent(row.basic)}
                  </td>
                  <td className="py-3.5 px-4 text-center bg-blue-50/20 border-x border-blue-100 font-medium">
                    {renderCellContent(row.standard)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {renderCellContent(row.advanced)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-neutral-200 bg-neutral-50/60">
                <td className="py-4 px-6 text-xs text-neutral-500 font-medium">
                  One-time pricing per profile location
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onSelectPackage('basic')}
                    className="py-2 px-3 text-xs font-bold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors shadow-2xs w-full"
                  >
                    Select Basic
                  </button>
                </td>
                <td className="py-4 px-4 text-center bg-blue-50/40 border-x border-blue-200">
                  <button
                    onClick={() => onSelectPackage('standard')}
                    className="py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs w-full"
                  >
                    Select Standard
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onSelectPackage('advanced')}
                    className="py-2 px-3 text-xs font-bold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors shadow-2xs w-full"
                  >
                    Select Advanced
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};
