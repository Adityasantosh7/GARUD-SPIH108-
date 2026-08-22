import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-navy-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-navy-700 flex items-center gap-3.5 max-w-md">
        <div className="w-8 h-8 rounded-xl bg-sportsGreen/20 text-sportsGreen flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs sm:text-sm font-medium">
          <p className="font-bold text-white">{message.title || 'Success'}</p>
          <p className="text-slate-300 text-xs mt-0.5">{message.description}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
