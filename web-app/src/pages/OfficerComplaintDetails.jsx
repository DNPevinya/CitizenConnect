import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OfficerComplaintDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} // Goes back to previous page
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8FAFC] mr-4 text-[#64748B] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <div className="flex items-center">
              <h1 className="text-xl font-extrabold text-[#1E293B] mr-3">Complaint #CMP-88291</h1>
              <span className="px-2.5 py-1 bg-[#F0F5FF] text-[#0041C7] text-[10px] font-bold rounded-full uppercase tracking-wider">In Progress</span>
            </div>
            <p className="text-[12px] text-[#64748B] mt-0.5">Submitted on Oct 24, 2023 • Urban Infrastructure Dept.</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg shadow-sm transition-colors flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
          Save Changes
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Data & Evidence (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Description Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h3 className="text-[13px] font-bold text-[#1E293B]">Description & Details</h3>
            </div>
            <div className="p-6">
              <h2 className="text-lg font-extrabold text-[#1E293B] mb-3 uppercase">Large Pothole on Main Commute Route</h2>
              <p className="text-[14px] text-[#475569] leading-relaxed mb-6">
                There is a large pothole near the junction of Nawala Road close to the bus stop. It has caused several vehicles to slow down suddenly and is creating traffic congestion during peak hours. The pothole has been present for over two weeks and is increasing in size after recent rains. Immediate attention required before an accident occurs.
              </p>
              
              <div className="grid grid-cols-3 gap-4 bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
                <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Category</p>
                  <p className="text-[13px] font-bold text-[#1E293B]">Road Infrastructure</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Priority</p>
                  <p className="text-[13px] font-bold text-[#EF4444] flex items-center"><span className="mr-1">!</span> High</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Citizen</p>
                  <p className="text-[13px] font-bold text-[#1E293B]">Sachini Dissanayake</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex justify-between items-center">
              <h3 className="text-[13px] font-bold text-[#1E293B]">Location Information</h3>
              <span className="text-[12px] font-mono text-[#0041C7]">6.8901° N, 79.8812° E</span>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/2">
                <div className="flex items-start mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#F0F5FF] text-[#0041C7] flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1E293B]">Nawala Road Junction</h4>
                    <p className="text-[12px] text-[#64748B] mt-0.5">Sri Jayawardenepura Kotte</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Nearby Landmark</p>
                  <p className="text-[13px] font-bold text-[#1E293B]">Close to the main bus stop</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">Zone Status</p>
                  <span className="px-2.5 py-1 bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold rounded uppercase">Maintenance Zone</span>
                </div>
              </div>
              
              {/* Map Mockup */}
              <div className="md:w-1/2 bg-slate-200 relative min-h-[200px]">
                <img src="https://placehold.co/400x300/e2e8f0/94a3b8?text=Map+View" alt="Map" className="w-full h-full object-cover" />
                {/* Custom Map Pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   <div className="w-8 h-8 bg-[#0041C7] rounded-full flex items-center justify-center animate-bounce shadow-lg">
                     <div className="w-3 h-3 bg-white rounded-full"></div>
                   </div>
                   <div className="w-6 h-2 bg-black/20 rounded-full mx-auto mt-1 blur-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence & Attachments */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <h3 className="text-[13px] font-bold text-[#1E293B]">Evidence & Attachments</h3>
            </div>
            <div className="p-6 flex space-x-4">
               {/* Mocking the pothole images from the previous modal */}
               <div className="w-32 h-32 rounded-lg bg-slate-200 overflow-hidden border border-[#E2E8F0]">
                 <img src="https://placehold.co/200x200/475569/FFFFFF?text=Pothole+1" alt="Evidence" className="w-full h-full object-cover" />
               </div>
               <div className="w-32 h-32 rounded-lg bg-slate-200 overflow-hidden border border-[#E2E8F0]">
                 <img src="https://placehold.co/200x200/475569/FFFFFF?text=Pothole+2" alt="Evidence" className="w-full h-full object-cover" />
               </div>
               
               {/* Add More Button */}
               <button className="w-32 h-32 rounded-lg border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center text-[#64748B] hover:text-[#0041C7] hover:border-[#0041C7] hover:bg-[#F0F5FF] transition-all">
                 <svg className="w-6 h-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <span className="text-[10px] font-bold uppercase tracking-wider">Add More</span>
               </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Actions & Timeline (Spans 1 column) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Status Update Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6">
            <h3 className="text-[12px] font-bold text-[#1E293B] uppercase tracking-wider mb-4">Update Case Status</h3>
            <label className="block text-[11px] font-bold text-[#64748B] mb-2">Workflow Stage</label>
            <select className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0041C7] mb-4">
              <option>In Progress</option>
              <option>Pending Material</option>
              <option>Resolved</option>
            </select>
            <button className="w-full py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg transition-colors">
              Apply Transition
            </button>
          </div>

          {/* Add Official Response Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6">
            <h3 className="text-[12px] font-bold text-[#1E293B] uppercase tracking-wider mb-4">Add Official Response</h3>
            
            {/* Custom Tab Switcher */}
            <div className="flex bg-[#F1F5F9] rounded-lg p-1 mb-4">
              <button className="flex-1 bg-white text-[#0041C7] text-[12px] font-bold py-1.5 rounded-md shadow-sm">Public</button>
              <button className="flex-1 text-[#64748B] text-[12px] font-bold py-1.5 rounded-md hover:text-[#1E293B]">Internal Note</button>
            </div>

            <textarea 
              rows="4" 
              placeholder="Type your response to the citizen here. This will be visible on their mobile app..." 
              className="w-full border border-[#E2E8F0] rounded-lg p-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0041C7] resize-none mb-4"
            ></textarea>
            
            <button className="px-5 py-2 bg-[#1E293B] hover:bg-black text-white text-[12px] font-bold rounded-lg transition-colors">
              Post Update
            </button>
          </div>

          {/* Timeline Box */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6">
            <h3 className="text-[12px] font-bold text-[#1E293B] uppercase tracking-wider mb-6">Case Timeline</h3>
            
            <div className="relative border-l-2 border-[#E2E8F0] ml-3 space-y-8">
              
              {/* Event 1 */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#0041C7]"></div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[12px] font-bold text-[#1E293B]">Officer Mark Chen</h4>
                  <span className="text-[10px] font-bold text-[#94A3B8]">2h ago</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Changed status to <span className="font-bold text-[#0041C7]">In Progress</span>. Repair crew dispatched to Nawala Road location.
                </p>
              </div>

              {/* Event 2 - Internal Note */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#F59E0B]"></div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[12px] font-bold text-[#D97706] flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    Internal Note
                  </h4>
                  <span className="text-[10px] font-bold text-[#94A3B8]">5h ago</span>
                </div>
                <div className="bg-[#FFFBEB] border border-[#FDE68A] p-3 rounded-lg mt-2">
                  <p className="text-[11px] text-[#B45309] font-medium leading-relaxed">
                    Traffic police have been notified for heavy machinery support needed at the junction.
                  </p>
                </div>
              </div>

              {/* Event 3 - System Origin */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#E2E8F0] border-4 border-white shadow-sm"></div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[12px] font-bold text-[#64748B]">System</h4>
                  <span className="text-[10px] font-bold text-[#94A3B8]">Oct 24, 09:12 AM</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Complaint registered and routed automatically to Urban Infrastructure Dept.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}