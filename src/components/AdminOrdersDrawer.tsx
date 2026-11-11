import React from 'react';
import { OrderRequest } from '../types';
import { X, ExternalLink, Phone, Mail, Building, Trash2, CheckCircle2 } from 'lucide-react';

interface AdminOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRequest[];
  onUpdateStatus: (orderId: string, newStatus: OrderRequest['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onResetDemoData: () => void;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateStatus,
  onDeleteOrder,
  onResetDemoData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl border-l border-neutral-200 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <span>Agency Client Portal</span>
              <span className="text-xs bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded-full">
                {orders.length} Requests
              </span>
            </h3>
            <p className="text-xs text-neutral-500">
              Manage incoming Google Maps optimization inquiries & client orders
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between text-xs">
          <span className="text-neutral-600 font-medium">
            Saved to local state
          </span>
          <button
            onClick={onResetDemoData}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
          >
            Load Sample Client Inquiries
          </button>
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <p className="text-xs text-neutral-500">No client orders received yet.</p>
              <button
                onClick={onResetDemoData}
                className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold"
              >
                Populate Sample Orders
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-neutral-200 bg-white shadow-2xs space-y-3 hover:border-neutral-300 transition-colors"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {order.id}
                    </span>
                    <span className="text-xs font-extrabold text-neutral-900">
                      {order.businessName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-neutral-900 tabular-nums">
                      ₹{order.totalPrice}
                    </span>
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                      title="Delete order"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <a href={`tel:${order.phone}`} className="hover:text-blue-600 font-mono font-medium">
                        {order.phone}
                      </a>
                      <span className="text-neutral-400">({order.contactName})</span>
                    </div>
                    {order.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="truncate">{order.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-neutral-500">
                      Category: <span className="font-medium text-neutral-800">{order.category}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      State: <span className="font-medium capitalize text-neutral-800">{order.profileState}</span> · Method: <span className="font-semibold uppercase text-neutral-700">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Address / Link */}
                {order.mapsUrlOrAddress && (
                  <div className="p-2 rounded-lg bg-neutral-50 text-[11px] text-neutral-600 flex items-center justify-between gap-2">
                    <span className="truncate">📍 {order.mapsUrlOrAddress}</span>
                    {order.mapsUrlOrAddress.startsWith('http') && (
                      <a
                        href={order.mapsUrlOrAddress}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}

                {order.notes && (
                  <div className="text-[11px] text-neutral-500 italic">
                    Note: "{order.notes}"
                  </div>
                )}

                {/* Status selector */}
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-500">
                    Status Workflow:
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value as any)}
                    className="px-2.5 py-1 rounded-md border border-neutral-300 text-xs font-semibold text-neutral-800 bg-white"
                  >
                    <option value="Received">Received</option>
                    <option value="Manager Access Pending">Manager Access Pending</option>
                    <option value="In Optimization">In Optimization</option>
                    <option value="Report Generated">Report Generated</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>MapRank Pro Agency Operations</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800"
          >
            Close View
          </button>
        </div>

      </div>
    </div>
  );
};
