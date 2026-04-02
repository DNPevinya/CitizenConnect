import React from 'react';

export default function AddAuthorityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        
        <div className="bg-[#0041C7] px-6 py-5 flex justify-between items-center">
          <div className="flex items-center text-white">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
            <h3 className="text-lg font-bold">Add New Department</h3>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Authority Name <span className="text-[#EF4444]">*</span></label>
              <input type="text" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] focus:ring-2 focus:ring-[#0041C7] outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Authority Code <span className="text-[#EF4444]">*</span></label>
              <input type="text" placeholder="e.g. PW-2024" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] focus:ring-2 focus:ring-[#0041C7] outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Assign Initial Officers</label>
            <div className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] flex items-center flex-wrap gap-2">
              <span className="flex items-center px-2 py-1 bg-[#F0F5FF] text-[#0041C7] rounded text-[11px] font-bold border border-[#DCE7F9]">Chamara Silva <button className="ml-1 text-[#0041C7] hover:text-[#1E293B]">×</button></span>
              <span className="flex items-center px-2 py-1 bg-[#F0F5FF] text-[#0041C7] rounded text-[11px] font-bold border border-[#DCE7F9]">Ishara Jayasinghe <button className="ml-1 text-[#0041C7] hover:text-[#1E293B]">×</button></span>
              <input type="text" placeholder="Search and add officers..." className="flex-1 min-w-[150px] outline-none text-[13px]" />
            </div>
            <p className="text-[10px] text-[#64748B] mt-1.5">Officers assigned will receive an email notification.</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Department Description <span className="text-[#64748B] font-normal">(Optional)</span></label>
            <textarea rows="3" placeholder="Describe the authority's responsibilities..." className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] focus:ring-2 focus:ring-[#0041C7] outline-none resize-none"></textarea>
          </div>
        </div>

        <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#E2E8F0] flex justify-between items-center">
          <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest">Secure Admin Portal</span>
          <div className="flex space-x-3">
            <button onClick={onClose} className="px-4 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B]">Cancel</button>
            <button className="px-5 py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Add Authority
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}