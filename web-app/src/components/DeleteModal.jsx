import React from 'react';

export default function DeleteModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center border border-[#E2E8F0]">
        
        <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">Delete Authority?</h3>
        <p className="text-[13px] text-[#64748B] mb-6 leading-relaxed">
          This action <span className="font-bold text-[#1E293B]">cannot be undone</span>. All currently assigned complaints must be reassigned before the department can be removed.
        </p>

        <div className="text-left mb-6">
          <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">Select Authority for Reassignment</label>
          <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#EF4444]">
            <option>Choose an authority...</option>
            <option>Colombo Municipal Council</option>
          </select>
          <p className="text-[10px] text-[#94A3B8] mt-1.5">* All pending complaints will be moved automatically.</p>
        </div>

        <div className="flex space-x-3 mb-2">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#E2E8F0] text-[#64748B] text-[13px] font-bold rounded-lg hover:bg-[#F8FAFC]">Cancel</button>
          <button className="flex-1 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white text-[13px] font-bold rounded-lg flex items-center justify-center">
             <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
             Confirm Delete
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
           <span className="flex items-center justify-center text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">
             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
             Authorized Administrator Action Only
           </span>
        </div>

      </div>
    </div>
  );
}