import React from 'react';

export default function AddOfficerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#0041C7] px-6 py-5 flex justify-between items-center">
          <div className="flex items-center text-white">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <h3 className="text-lg font-bold">Add New Officer</h3>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Full Name</label>
            <input type="text" placeholder="e.g. John Doe" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] focus:ring-2 focus:ring-[#0041C7] outline-none placeholder-[#94A3B8]" />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Work Email</label>
            <input type="email" placeholder="example@gmail.com" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] focus:ring-2 focus:ring-[#0041C7] outline-none placeholder-[#94A3B8]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Department</label>
              <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] focus:ring-2 focus:ring-[#0041C7] outline-none bg-white">
                <option value="" disabled selected>Select Authority</option>
                <option value="public-works">Public Works</option>
                <option value="sanitation">Sanitation</option>
                <option value="transportation">Transportation</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Employee ID</label>
              <input type="text" placeholder="ID-00000" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] focus:ring-2 focus:ring-[#0041C7] outline-none placeholder-[#94A3B8]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-5 border-t border-[#E2E8F0] flex justify-end items-center space-x-4">
          <button onClick={onClose} className="text-[13px] font-bold text-[#64748B] hover:text-[#1E293B]">Cancel</button>
          <button className="px-5 py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg shadow-sm transition-colors">
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}