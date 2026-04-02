import React, { useState } from 'react';

export default function ReassignModal({ isOpen, onClose, complaintId = "#CMP-88219-24" }) {
  const [targetAuthority, setTargetAuthority] = useState('');
  const [targetOfficer, setTargetOfficer] = useState('');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#0041C7] px-6 py-5 flex justify-between items-start">
          <div>
            <h3 className="text-white text-lg font-bold">Reassign Complaint</h3>
            <p className="text-blue-100 text-xs font-medium mt-1">COMPLAINT ID: {complaintId}</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          
          {/* Current Assignment */}
          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center mb-3">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
              Current Assignment
            </h4>
            
            <div className="flex gap-4">
              <div className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
                <p className="text-[10px] text-[#64748B] font-semibold mb-1.5">Current Authority</p>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-[#0041C7]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00-.504-.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-[13px] font-bold text-[#1E293B]">Kaduwela Municipal Council</span>
                </div>
              </div>

              <div className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
                <p className="text-[10px] text-[#64748B] font-semibold mb-1.5">Current Officer</p>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center mr-2 text-[#64748B] font-bold text-[10px]">
                    NP
                  </div>
                  <span className="text-[13px] font-bold text-[#1E293B]">Mr. Nuwan Perera</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#E2E8F0] mb-6" />

          {/* New Assignment */}
          <div>
            <h4 className="text-[10px] font-bold text-[#0041C7] uppercase tracking-wider flex items-center mb-4">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              New Assignment
            </h4>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Target Authority <span className="text-[#EF4444]">*</span></label>
                <select 
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#0041C7]"
                  value={targetAuthority}
                  onChange={(e) => setTargetAuthority(e.target.value)}
                >
                  <option value="" disabled>Select Authority</option>
                  <option value="colombo">Colombo Municipal Council</option>
                  <option value="kandy">Kandy Municipal Council</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Target Officer <span className="text-[#EF4444]">*</span></label>
                <select 
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#0041C7]"
                  value={targetOfficer}
                  onChange={(e) => setTargetOfficer(e.target.value)}
                >
                  <option value="" disabled>Select Officer</option>
                  <option value="1">Unassigned (Department Pool)</option>
                  <option value="2">Ms. Silva</option>
                </select>
              </div>
            </div>

            {/* Added: Reason for Reassignment */}
            <div className="mb-2">
              <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5">Reason for Reassignment <span className="text-[#EF4444]">*</span></label>
              <textarea 
                rows="2"
                placeholder="Briefly explain why this complaint is being moved..."
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#0041C7] resize-none"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            
            {/* Added: Notification Toggle */}
            <div className="flex items-center mt-3">
              <input type="checkbox" id="notify" className="w-3.5 h-3.5 text-[#0041C7] border-[#E2E8F0] rounded focus:ring-[#0041C7]" defaultChecked />
              <label htmlFor="notify" className="ml-2 text-[11px] font-semibold text-[#64748B]">Notify target officer immediately via priority email</label>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#E2E8F0] flex justify-end items-center gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#1E293B] transition-colors"
          >
            Cancel
          </button>
          <button 
            className="px-5 py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg shadow-sm transition-colors flex items-center disabled:opacity-50"
            disabled={!targetAuthority || !targetOfficer || !reason}
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Confirm Reassignment
          </button>
        </div>

      </div>
    </div>
  );
}