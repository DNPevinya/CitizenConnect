import React from 'react';

export default function DetailsModal({ isOpen, onClose, complaintId = "#CMP-88291" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex justify-between items-center bg-white">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-[#0041C7] mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
            <h3 className="text-[#1E293B] text-lg font-extrabold mr-4">Complaint {complaintId}</h3>
            <span className="bg-[#FEF08A] text-[#854D0E] px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
              In Progress
            </span>
          </div>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body - Grid Layout */}
        <div className="p-8 overflow-y-auto bg-[#F8FAFC]">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* LEFT COLUMN: Citizen & Issue (Takes up 3/5 of space) */}
            <div className="md:col-span-3 space-y-6">
              
              {/* Citizen Details Card */}
              <div>
                <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center mb-3">
                  <svg className="w-4 h-4 mr-1.5 text-[#0041C7]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  Citizen Details
                </h4>
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] text-[#64748B] font-semibold mb-1">Full Name</p>
                      <p className="text-[13px] font-bold text-[#1E293B]">Sachini Dissanayake</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#64748B] font-semibold mb-1">Phone Number</p>
                      <p className="text-[13px] font-bold text-[#1E293B]">077-1234567</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748B] font-semibold mb-1">Email Address</p>
                    <p className="text-[13px] font-bold text-[#1E293B]">sachini.d@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Issue Description Card */}
              <div>
                <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center mb-3">
                  <svg className="w-4 h-4 mr-1.5 text-[#0041C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                  Issue Description
                </h4>
                <div className="text-[13px] text-[#475569] leading-relaxed bg-transparent">
                  <p>There is a large pothole near the junction of Nawala Road close to the bus stop. It has caused several vehicles to slow down suddenly and is creating traffic congestion during peak hours. The pothole has been present for over two weeks and is increasing in size after recent rains.</p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Metadata & Evidence (Takes up 2/5 of space) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Internal Metadata Card */}
              <div>
                <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center mb-3">
                  <svg className="w-4 h-4 mr-1.5 text-[#0041C7]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  Internal Metadata
                </h4>
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm">
                  <div className="space-y-3 divide-y divide-[#E2E8F0]">
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-[11px] text-[#64748B] font-semibold">Submitted Date</span>
                      <span className="text-[12px] font-bold text-[#1E293B]">Oct 24, 2023, 09:12 AM</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 pb-2">
                      <span className="text-[11px] text-[#64748B] font-semibold">Assigned Authority</span>
                      <span className="text-[12px] font-bold text-[#1E293B] text-right">Urban<br/>Infrastructure</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 pb-2">
                      <span className="text-[11px] text-[#64748B] font-semibold">Priority Level</span>
                      <span className="text-[12px] font-bold text-[#EF4444] flex items-center">
                        <span className="mr-1">!</span> High
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-[11px] text-[#64748B] font-semibold">Verification ID</span>
                      <span className="text-[12px] font-mono text-[#64748B]">VR-880-9X</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attached Evidence Card */}
              <div>
                <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex items-center mb-3">
                  <svg className="w-4 h-4 mr-1.5 text-[#0041C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  Attached Evidence
                </h4>
                <div className="flex space-x-3">
                  {/* Image Thumbnails - using generic colored blocks for the mockup to ensure they always load */}
                  <div className="w-20 h-20 bg-slate-300 rounded-lg overflow-hidden border border-[#E2E8F0] flex items-center justify-center">
                    <img src="https://placehold.co/100x100/475569/FFFFFF?text=Photo+1" alt="Evidence 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-20 h-20 bg-slate-300 rounded-lg overflow-hidden border border-[#E2E8F0] flex items-center justify-center">
                    <img src="https://placehold.co/100x100/475569/FFFFFF?text=Photo+2" alt="Evidence 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-20 h-20 bg-slate-800 rounded-lg overflow-hidden border border-[#E2E8F0] flex items-center justify-center relative">
                    <img src="https://placehold.co/100x100/1E293B/FFFFFF?text=Map" alt="Location" className="w-full h-full object-cover opacity-50" />
                    <svg className="w-6 h-6 text-[#FF9F43] absolute" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}