import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReassignModal from '../components/ReassignModal';
import DetailsModal from '../components/DetailsModal';

export default function AdminComplaints() {
  // --- STATE FOR MODALS ---
  
  // Reassign Modal State
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [reassignId, setReassignId] = useState('');

  // Details Modal State
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsId, setDetailsId] = useState('');

  // --- HELPER FUNCTIONS ---
  
  const openReassign = (id) => {
    setReassignId(id);
    setIsReassignOpen(true);
  };

  const openDetails = (id) => {
    setDetailsId(id);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* HEADER COMPONENT */}
        <Header breadcrumbs={['Admin', 'All Complaints']} />

        {/* MAIN BODY */}
        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          
          {/* STAT CARDS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2E8F0] flex items-center">
              <div className="w-12 h-12 rounded bg-[#F0F5FF] flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-[#0041C7]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#64748B] mb-0.5">Total Complaints</p>
                <h3 className="text-2xl font-extrabold text-[#1E293B]">1,284</h3>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2E8F0] flex items-center">
              <div className="w-12 h-12 rounded bg-[#FFFBEB] flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-[#FF9F43]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#64748B] mb-0.5">Pending Assignment</p>
                <h3 className="text-2xl font-extrabold text-[#1E293B]">42</h3>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2E8F0] flex items-center">
              <div className="w-12 h-12 rounded bg-[#FEF2F2] flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#64748B] mb-0.5">Overdue Response</p>
                <h3 className="text-2xl font-extrabold text-[#1E293B]">15</h3>
              </div>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" placeholder="Search Subject or ID..." className="block w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-[13px] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0041C7] text-[#1E293B]" />
            </div>
            
            <select className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#1E293B] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0041C7]">
              <option>All Categories</option>
              <option>Urban Infrastructure</option>
              <option>Public Health</option>
            </select>

            <select className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#1E293B] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0041C7]">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Urgent</option>
            </select>

            <input type="date" className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#64748B] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#0041C7]" />

            <button className="text-[13px] font-semibold text-[#64748B] hover:text-[#1E293B] px-4 py-2.5">Clear Filters</button>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <span className="text-[11px] font-bold text-[#64748B]">Showing 1-10 of 1,284 results</span>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Date Submitted</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  
                  {/* Row 1 - Pending */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-5 text-[13px] font-bold text-[#0041C7]">
                      <a href="#">#CMP-8902</a>
                    </td>
                    <td className="px-6 py-5 text-[13px] font-bold text-[#1E293B]">Pothole reported on 5th Avenue ne...</td>
                    <td className="px-6 py-5">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[#E2E8F0]">Urban Infrastructure</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-[#FF9F43]/15 text-[#D97706] px-2.5 py-1.5 rounded-full text-[11px] font-bold">Pending</span>
                    </td>
                    <td className="px-6 py-5 text-[13px] text-[#64748B]">Oct 24,<br/>2023</td>
                    <td className="px-6 py-5 text-right flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => openReassign('#CMP-8902')} 
                        className="text-[12px] font-bold text-[#0041C7] hover:underline"
                      >
                        Reassign
                      </button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
                    </td>
                  </tr>

                  {/* Row 2 - Resolved */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-5 text-[13px] font-bold text-[#0041C7]">
                      <a href="#">#CMP-8899</a>
                    </td>
                    <td className="px-6 py-5 text-[13px] font-bold text-[#1E293B]">Garbage collection missed for 3 co...</td>
                    <td className="px-6 py-5">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[#E2E8F0]">Urban Infrastructure</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-[#28C76F]/15 text-[#15803D] px-2.5 py-1.5 rounded-full text-[11px] font-bold">Resolved</span>
                    </td>
                    <td className="px-6 py-5 text-[13px] text-[#64748B]">Oct 23,<br/>2023</td>
                    <td className="px-6 py-5 text-right flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => openDetails('#CMP-8899')} 
                        className="text-[12px] font-bold text-[#64748B] hover:text-[#1E293B]"
                      >
                        Details
                      </button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
                    </td>
                  </tr>

                  {/* Row 3 - Urgent */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-5 text-[13px] font-bold text-[#0041C7]">
                      <a href="#">#CMP-8890</a>
                    </td>
                    <td className="px-6 py-5 text-[13px] font-bold text-[#1E293B]">Street light flickering on Oak Stre...</td>
                    <td className="px-6 py-5">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[#E2E8F0]">Urban Infrastructure</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-[#EF4444]/15 text-[#B91C1C] px-2.5 py-1.5 rounded-full text-[11px] font-bold">Urgent</span>
                    </td>
                    <td className="px-6 py-5 text-[13px] text-[#64748B]">Oct 22,<br/>2023</td>
                    <td className="px-6 py-5 text-right flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => openReassign('#CMP-8890')} 
                        className="text-[12px] font-bold text-[#0041C7] hover:underline"
                      >
                        Reassign
                      </button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
                    </td>
                  </tr>

                  {/* Row 4 - In Progress */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-5 text-[13px] font-bold text-[#0041C7]">
                      <a href="#">#CMP-8884</a>
                    </td>
                    <td className="px-6 py-5 text-[13px] font-bold text-[#1E293B]">Illegal parking blocking emergenc...</td>
                    <td className="px-6 py-5">
                      <span className="bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[#E2E8F0]">SL Police</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="bg-[#0D85D8]/15 text-[#0041C7] px-2.5 py-1.5 rounded-full text-[11px] font-bold">In Progress</span>
                    </td>
                    <td className="px-6 py-5 text-[13px] text-[#64748B]">Oct 21,<br/>2023</td>
                    <td className="px-6 py-5 text-right flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => openReassign('#CMP-8884')} 
                        className="text-[12px] font-bold text-[#0041C7] hover:underline"
                      >
                        Reassign
                      </button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg></button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center text-[13px] text-[#64748B]">
                Rows per page: 
                <select className="ml-2 bg-transparent font-bold text-[#1E293B] focus:outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0041C7] text-white font-bold text-[13px]">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-[#64748B] hover:bg-[#F8FAFC] font-bold text-[13px]">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-[#64748B] hover:bg-[#F8FAFC] font-bold text-[13px]">3</button>
                <span className="px-1 text-[#64748B]">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded text-[#64748B] hover:bg-[#F8FAFC] font-bold text-[13px]">128</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* FOOTER */}
          <Footer />

          {/* MODALS */}
          <ReassignModal 
            isOpen={isReassignOpen} 
            onClose={() => setIsReassignOpen(false)} 
            complaintId={reassignId} 
          />
          
          <DetailsModal 
            isOpen={isDetailsOpen} 
            onClose={() => setIsDetailsOpen(false)} 
            complaintId={detailsId} 
          />

        </main>
      </div>
    </div>
  );
}