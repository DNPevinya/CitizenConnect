import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminAnalytics() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <Header breadcrumbs={['Admin', 'Reports & Analytics']} />

        {/* MAIN BODY */}
        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          
          {/* PAGE TITLE & EXPORT BUTTONS */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1E293B]">Statistical Insights</h2>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#1E293B] text-[13px] font-bold rounded-lg shadow-sm hover:bg-[#F8FAFC] transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Export CSV
              </button>
              <button className="px-4 py-2 bg-[#0041C7] text-white text-[13px] font-bold rounded-lg shadow-sm hover:bg-[#0033A0] transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Export PDF
              </button>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-6 flex justify-between items-center shadow-sm">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 border-r border-[#E2E8F0] pr-4">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <select className="text-[13px] font-bold text-[#1E293B] bg-transparent focus:outline-none outline-none">
                  <option>Last 30 Days</option>
                  <option>This Quarter</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 border-r border-[#E2E8F0] pr-4">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <select className="text-[13px] font-bold text-[#1E293B] bg-transparent focus:outline-none outline-none">
                  <option>All Authorities</option>
                  <option>Public Works</option>
                  <option>Police</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <select className="text-[13px] font-bold text-[#1E293B] bg-transparent focus:outline-none outline-none">
                  <option>All Priorities</option>
                  <option>High Priority</option>
                  <option>Standard</option>
                </select>
              </div>
            </div>
            <button className="text-[12px] font-bold text-[#0041C7] hover:underline flex items-center pr-2">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Reset Filters
            </button>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm relative">
               <span className="absolute top-5 right-5 flex items-center text-[10px] font-bold text-[#16A34A]"><svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> 12%</span>
               <div className="w-8 h-8 rounded bg-blue-50 text-[#0041C7] flex items-center justify-center mb-3">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <p className="text-[11px] font-bold text-[#64748B] mb-1">Avg. Resolution Time</p>
               <h3 className="text-2xl font-extrabold text-[#1E293B]">4.2 Days</h3>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm relative">
               <span className="absolute top-5 right-5 flex items-center text-[10px] font-bold text-[#16A34A]"><svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> 3.5%</span>
               <div className="w-8 h-8 rounded bg-blue-50 text-[#0041C7] flex items-center justify-center mb-3">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <p className="text-[11px] font-bold text-[#64748B] mb-1">Completion Rate</p>
               <h3 className="text-2xl font-extrabold text-[#1E293B]">94.2%</h3>
               <p className="text-[9px] text-[#94A3B8] mt-1">80% global benchmark</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm relative">
               <span className="absolute top-5 right-5 flex items-center text-[10px] font-bold text-[#EF4444]"><svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> 8%</span>
               <div className="w-8 h-8 rounded bg-orange-50 text-[#F59E0B] flex items-center justify-center mb-3">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
               </div>
               <p className="text-[11px] font-bold text-[#64748B] mb-1">Active Complaints</p>
               <h3 className="text-2xl font-extrabold text-[#1E293B]">1,240</h3>
               <p className="text-[9px] text-[#94A3B8] mt-1">124 pending actions</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm relative">
               <span className="absolute top-5 right-5 flex items-center text-[10px] font-bold text-[#16A34A]"><svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> 5.1%</span>
               <div className="w-8 h-8 rounded bg-purple-50 text-[#8B5CF6] flex items-center justify-center mb-3">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <p className="text-[11px] font-bold text-[#64748B] mb-1">Citizen Satisfaction</p>
               <h3 className="text-2xl font-extrabold text-[#1E293B]">4.8 / 5.0</h3>
               <p className="text-[9px] text-[#94A3B8] mt-1">Based on 2,500 reviews</p>
            </div>
          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Chart 1: Volume Trends (Mocked with CSS Flexbox) */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[14px] font-bold text-[#1E293B]">Complaint Volume Trends</h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Monthly breakdown of received vs resolved tickets</p>
                </div>
                <div className="flex items-center space-x-3 text-[10px] font-bold text-[#64748B]">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#0041C7] mr-1.5"></span> Received</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#DCE7F9] mr-1.5"></span> Resolved</span>
                </div>
              </div>

              {/* Bar Chart Mockup */}
              <div className="flex-1 flex items-end justify-between px-2 pt-10 pb-4 h-64 border-b border-[#E2E8F0] relative">
                
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pb-4 pointer-events-none">
                  <div className="border-t border-slate-100 w-full h-0"></div>
                  <div className="border-t border-slate-100 w-full h-0"></div>
                  <div className="border-t border-slate-100 w-full h-0"></div>
                  <div className="border-t border-slate-100 w-full h-0"></div>
                </div>

                {/* Bars */}
                <div className="w-8 relative flex items-end justify-center z-10 group">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '40%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '30%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">Jan</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '55%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '45%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">Feb</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '75%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '60%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">Mar</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '65%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '50%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">Apr</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '85%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '80%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">May</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '95%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '10%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#0041C7]">Jun</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '60%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '0%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">Jul</span>
                </div>
                <div className="w-8 relative flex items-end justify-center z-10">
                  <div className="absolute bottom-0 w-full bg-[#DCE7F9] rounded-t-sm" style={{ height: '50%' }}></div>
                  <div className="absolute bottom-0 w-full bg-[#0041C7] rounded-t-sm" style={{ height: '0%' }}></div>
                  <span className="absolute -bottom-6 text-[10px] font-bold text-[#64748B]">Aug</span>
                </div>
              </div>
            </div>

            {/* Chart 2: Complaints by District */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[14px] font-bold text-[#1E293B]">Complaints by District</h3>
                <button className="text-[11px] font-bold text-[#0041C7] hover:underline">View All Districts</button>
              </div>

              <div className="space-y-5">
                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold text-[#1E293B] mb-1.5">
                    <span>Colombo</span>
                    <span>4,210</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div className="bg-[#0041C7] h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold text-[#1E293B] mb-1.5">
                    <span>Gampaha</span>
                    <span>2,845</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div className="bg-[#0041C7] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold text-[#1E293B] mb-1.5">
                    <span>Kandy</span>
                    <span>1,920</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div className="bg-[#0041C7] h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold text-[#1E293B] mb-1.5">
                    <span>Galle</span>
                    <span>1,150</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div className="bg-[#0041C7] h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-between text-[11px] font-bold text-[#1E293B] mb-1.5">
                    <span>Kurunegala</span>
                    <span>890</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] rounded-full h-2">
                    <div className="bg-[#0041C7] h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* TABLE SECTION */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl flex flex-col shadow-sm mb-8">
            <div className="px-6 py-5 border-b border-[#E2E8F0] flex justify-between items-center">
              <h3 className="text-[14px] font-bold text-[#1E293B]">Recent Authority Milestones</h3>
              <button className="text-[11px] font-bold text-[#0041C7] tracking-wider uppercase hover:underline">View Full Table</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Authority</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Tickets Handled</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Performance Index</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">Public Infrastructure</td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">432</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-[#F8FAFC] rounded-full h-2 mr-3 border border-[#E2E8F0]">
                          <div className="bg-[#16A34A] h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-[12px] font-bold text-[#16A34A]">92% Excellent</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold rounded uppercase tracking-wider">Stable</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">Sanitation & Health</td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">215</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-[#F8FAFC] rounded-full h-2 mr-3 border border-[#E2E8F0]">
                          <div className="bg-[#0041C7] h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-[12px] font-bold text-[#0041C7]">78% Above Average</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#F0F5FF] text-[#0041C7] text-[10px] font-bold rounded uppercase tracking-wider">Optimizing</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">Urban Development</td>
                    <td className="px-6 py-4 text-[13px] text-[#64748B]">568</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-[#F8FAFC] rounded-full h-2 mr-3 border border-[#E2E8F0]">
                          <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-[12px] font-bold text-[#F59E0B]">45% Warning</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-orange-50 text-[#F59E0B] text-[10px] font-bold rounded uppercase tracking-wider">Delayed</span>
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