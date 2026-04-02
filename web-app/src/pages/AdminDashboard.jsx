import React from 'react';
import Sidebar from '../components/Sidebar'; 
import Footer from '../components/Footer'; 
import Header from '../components/Header'; 

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* USE THE NEW REUSABLE HEADER HERE */}
        <Header title="Administrator Dashboard" />

        {/* DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#0041C7]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Overall</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#1E293B] mb-1">1,240</h3>
              <p className="text-[11px] font-medium text-[#64748B]">Total Complaints Filed</p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Urgent</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#EF4444] mb-1">450</h3>
              <p className="text-[11px] font-medium text-[#64748B] mb-2">Pending Complaints</p>
              <p className="text-[10px] text-[#EF4444] font-bold flex items-center"><span className="mr-1">!</span> Needs immediate attention</p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#FF9F43]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                </div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#FF9F43] mb-1">320</h3>
              <p className="text-[11px] font-medium text-[#64748B]">Processing/In Review</p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#28C76F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Success</span>
              </div>
              <h3 className="text-3xl font-extrabold text-[#28C76F] mb-1">470</h3>
              <p className="text-[11px] font-medium text-[#64748B]">Resolved Issues</p>
            </div>
          </div>

          {/* CHARTS CARD */}
          <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E2E8F0] mb-8 max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-lg font-bold text-[#1E293B]">Complaints by Responsible Authority</h3>
                <p className="text-[13px] text-[#64748B] mt-1">Distribution of cases across key government sectors</p>
              </div>
              <button className="text-[11px] font-bold text-[#1E293B] bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2 rounded-lg flex items-center">
                Last 30 Days
                <svg className="w-3 h-3 ml-2 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            <div className="space-y-5">
              <div className="w-full">
                <div className="flex justify-between text-[13px] font-bold text-[#1E293B] mb-2">
                  <span>Infrastructure</span>
                  <span>425 Cases</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2.5">
                  <div className="bg-[#0041C7] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-[13px] font-bold text-[#1E293B] mb-2">
                  <span>Waste Management</span>
                  <span>310 Cases</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2.5">
                  <div className="bg-[#0160C9] h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-[13px] font-bold text-[#1E293B] mb-2">
                  <span>Water Services</span>
                  <span>215 Cases</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2.5">
                  <div className="bg-[#0D85D8] h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-[13px] font-bold text-[#1E293B] mb-2">
                  <span>Electricity</span>
                  <span>180 Cases</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2.5">
                  <div className="bg-[#1CA3DE] h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-[13px] font-bold text-[#1E293B] mb-2">
                  <span>Public Health</span>
                  <span>110 Cases</span>
                </div>
                <div className="w-full bg-[#F8FAFC] rounded-full h-2.5">
                  <div className="bg-[#1CA3DE] h-2.5 rounded-full opacity-60" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button className="text-[13px] font-bold text-[#0041C7] hover:underline flex items-center justify-end w-full">
                View Full Analytics <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#E2E8F0] mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#1E293B]">Recent High-Priority Complaints</h3>
              <button className="text-[13px] font-bold text-[#0041C7] hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="pb-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ID</th>
                    <th className="pb-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Citizen</th>
                    <th className="pb-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Category</th>
                    <th className="pb-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Subject</th>
                    <th className="pb-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  <tr>
                    <td className="py-4 text-[13px] font-medium text-[#64748B]">#CMP-9821</td>
                    <td className="py-4 text-[13px] font-bold text-[#1E293B]">Shantha Ranasighne</td>
                    <td className="py-4 text-[13px] text-[#64748B]">Urban Infrastructure</td>
                    <td className="py-4 text-[13px] text-[#64748B]">Broken street light on Main St.</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-bold rounded uppercase">Pending</span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#1E293B] mr-3"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[13px] font-medium text-[#64748B]">#CMP-9819</td>
                    <td className="py-4 text-[13px] font-bold text-[#1E293B]">Janaka Nayanakkara</td>
                    <td className="py-4 text-[13px] text-[#64748B]">Public Health</td>
                    <td className="py-4 text-[13px] text-[#64748B]">Water contamination report</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 bg-[#FF9F43]/10 text-[#FF9F43] text-[10px] font-bold rounded uppercase">In Progress</span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#1E293B] mr-3"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[13px] font-medium text-[#64748B]">#CMP-9815</td>
                    <td className="py-4 text-[13px] font-bold text-[#1E293B]">Kavinda Perera</td>
                    <td className="py-4 text-[13px] text-[#64748B]">Water Services</td>
                    <td className="py-4 text-[13px] text-[#64748B]">Request for facility maintenance</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 bg-[#28C76F]/10 text-[#28C76F] text-[10px] font-bold rounded uppercase">Resolved</span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#1E293B] mr-3"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                      <button className="text-[#64748B] hover:text-[#1E293B]"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <Footer />

        </main>
      </div>
    </div>
  );
}