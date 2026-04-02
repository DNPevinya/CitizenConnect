import React from 'react';

export default function EditAuthorityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        
        <div className="bg-[#0041C7] px-6 py-5 flex justify-between items-center">
          <div className="flex items-center text-white">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            <h3 className="text-lg font-bold">Edit Department</h3>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Department Name</label>
              <input type="text" defaultValue="Sri Lanka Police" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] font-bold text-[#1E293B] focus:ring-2 focus:ring-[#0041C7] outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 flex justify-between">Department Code <span className="text-[#64748B] font-normal">(ReadOnly)</span></label>
              <input type="text" defaultValue="SLP-02" className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] bg-[#F8FAFC] text-[#64748B] font-mono outline-none" readOnly />
            </div>
          </div>
          
          <div>
            <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Assigned Officers</label>
            <div className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] flex items-center mb-3">
               <svg className="w-4 h-4 text-[#64748B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
               <input type="text" placeholder="Search and add officer by name or ID..." className="flex-1 outline-none text-[13px]" />
            </div>
            
            <div className="space-y-2 border border-[#E2E8F0] rounded-lg p-2 bg-[#F8FAFC]">
               <div className="flex justify-between items-center bg-white p-2 rounded border border-[#E2E8F0]">
                 <div className="flex items-center">
                   <div className="w-8 h-8 bg-slate-200 rounded-full mr-3 text-[10px] flex justify-center items-center font-bold">MT</div>
                   <div>
                     <p className="text-[12px] font-bold text-[#1E293B]">Marcus Thorne</p>
                     <p className="text-[10px] text-[#64748B]">Senior Field Inspector • <span className="text-[#16A34A]">Available</span></p>
                   </div>
                 </div>
                 <button className="text-[#64748B] hover:text-[#EF4444]"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
               </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <label className="block text-[12px] font-bold text-[#1E293B]">Department Status</label>
              <p className="text-[10px] text-[#64748B]">Inactive departments cannot receive new complaints</p>
            </div>
            <div className="flex items-center space-x-2">
               <div className="w-10 h-6 bg-[#0041C7] rounded-full relative cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
               </div>
               <span className="text-[12px] font-bold text-[#1E293B]">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#E2E8F0] flex justify-between items-center">
          <button className="text-[13px] font-bold text-[#EF4444] hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete Department
          </button>
          <div className="flex space-x-3">
            <button onClick={onClose} className="px-4 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B]">Cancel</button>
            <button className="px-5 py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}