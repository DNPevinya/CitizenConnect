import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddOfficerModal from '../components/AddOfficerModal';

export default function AdminUserManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        <Header breadcrumbs={['Admin', 'User Management']} />

        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          
          {/* Header Section */}
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1E293B]">Officer Management</h2>
              <p className="text-[13px] text-[#64748B] mt-1">Manage department officers, roles, and system access levels.</p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)} 
              className="px-5 py-2.5 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[13px] font-bold rounded-lg shadow-sm transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add New Officer
            </button>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl flex-1 flex flex-col">
            
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex justify-between items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input type="text" placeholder="Search by name, ID, or email..." className="block w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-[13px] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0041C7] text-[#1E293B]" />
              </div>
              
              <div className="flex space-x-3">
                <select className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#1E293B] bg-white focus:outline-none">
                  <option>All Departments</option>
                  <option>Public Works</option>
                  <option>Sanitation</option>
                </select>
                <select className="border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[13px] text-[#1E293B] bg-white focus:outline-none">
                  <option>All Roles</option>
                  <option>Field Officer</option>
                  <option>Supervisor</option>
                </select>
                <button className="px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Officer Detail</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Employee ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Authority</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  
                  {/* Row 1 - Active */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold mr-3">SM</div>
                        <div>
                          <p className="text-[13px] font-bold text-[#1E293B]">Sarah Miller</p>
                          <p className="text-[11px] text-[#64748B]">s.miller@citygov.org</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B] font-mono">#PW-44921</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full border border-blue-100">Public Works</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">2 hours ago</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                         {/* Toggle Switch - ON */}
                         <div className="w-9 h-5 bg-[#28C76F] rounded-full relative cursor-pointer">
                           <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-[3px]"></div>
                         </div>
                         <span className="text-[11px] font-bold text-[#28C76F]">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#0041C7] mr-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="text-[#64748B] hover:text-[#EF4444]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 - Inactive */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors opacity-70">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-[#64748B] flex items-center justify-center text-[11px] font-bold mr-3">RK</div>
                        <div>
                          <p className="text-[13px] font-bold text-[#1E293B]">Robert Knight</p>
                          <p className="text-[11px] text-[#64748B]">r.knight@citygov.org</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B] font-mono">#ST-29930</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-500 text-[11px] font-bold rounded-full border border-orange-100">Sanitation</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">Yesterday,<br/>4:12 PM</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                         {/* Toggle Switch - OFF */}
                         <div className="w-9 h-5 bg-[#E2E8F0] rounded-full relative cursor-pointer">
                           <div className="w-3.5 h-3.5 bg-white rounded-full absolute left-1 top-[3px]"></div>
                         </div>
                         <span className="text-[11px] font-bold text-[#94A3B8]">Inactive</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#0041C7] mr-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="text-[#64748B] hover:text-[#EF4444]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 - Active */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[11px] font-bold mr-3">AL</div>
                        <div>
                          <p className="text-[13px] font-bold text-[#1E293B]">Amanda Lee</p>
                          <p className="text-[11px] text-[#64748B]">a.lee@citygov.org</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B] font-mono">#TR-55210</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-[11px] font-bold rounded-full border border-purple-100">Transportation</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">Oct 24,<br/>2023</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                         <div className="w-9 h-5 bg-[#28C76F] rounded-full relative cursor-pointer">
                           <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-[3px]"></div>
                         </div>
                         <span className="text-[11px] font-bold text-[#28C76F]">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#0041C7] mr-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="text-[#64748B] hover:text-[#EF4444]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 - Active */}
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[11px] font-bold mr-3">DB</div>
                        <div>
                          <p className="text-[13px] font-bold text-[#1E293B]">David Brooks</p>
                          <p className="text-[11px] text-[#64748B]">d.brooks@citygov.org</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B] font-mono">#HS-88320</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[11px] font-bold rounded-full border border-green-100">Health & Safety</span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">Oct 23,<br/>2023</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                         <div className="w-9 h-5 bg-[#28C76F] rounded-full relative cursor-pointer">
                           <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-[3px]"></div>
                         </div>
                         <span className="text-[11px] font-bold text-[#28C76F]">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748B] hover:text-[#0041C7] mr-3">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="text-[#64748B] hover:text-[#EF4444]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <div className="text-[13px] text-[#64748B]">Showing 1 to 5 of 12 officers</div>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#0041C7] text-white font-bold text-[13px]">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-[#64748B] hover:bg-[#F8FAFC] font-bold text-[13px]">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded text-[#64748B] hover:bg-[#F8FAFC] font-bold text-[13px]">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

          </div>
          
          <Footer />

          {/* Add Modal */}
          <AddOfficerModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
          />

        </main>
      </div>
    </div>
  );
}