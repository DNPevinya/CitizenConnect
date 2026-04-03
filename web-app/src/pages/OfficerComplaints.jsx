import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OfficerComplaints() {
  const navigate = useNavigate();
  const currentOfficerDepartment = 'Urban Infrastructure';

  // Master List Mockup
  const allComplaintsInSystem = [
    { id: '#CMP-88291', citizen: 'Sachini Dissanayake', type: 'Road Pothole Repair', priority: 'High', status: 'Overdue', date: 'Oct 24, 2023', department: 'Urban Infrastructure' },
    { id: '#CMP-8915', citizen: 'Janaka Nayanakkara', type: 'Street Light Malfunction', priority: 'Medium', status: 'In Progress', date: 'Oct 25, 2023', department: 'Urban Infrastructure' },
    { id: '#CMP-8933', citizen: 'Arthur Morgan', type: 'Tree Obstruction', priority: 'Low', status: 'On Hold', date: 'Oct 27, 2023', department: 'Urban Infrastructure' },
    { id: '#CMP-8940', citizen: 'Nimal Perera', type: 'Broken Pavement', priority: 'Medium', status: 'Pending', date: 'Oct 28, 2023', department: 'Urban Infrastructure' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* SECURE SIDEBAR */}
      <Sidebar role="officer" />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header breadcrumbs={['Department Workbox', 'All Assigned Complaints']} />

        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-[#1E293B]">Assigned Workbox</h2>
            <p className="text-[13px] text-[#64748B] mt-1">Manage and resolve all tickets assigned to {currentOfficerDepartment}.</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl flex-1 flex flex-col shadow-sm">
            
            {/* Filter Bar */}
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
              <div className="relative w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input type="text" placeholder="Search by ID or Citizen..." className="block w-full pl-9 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0041C7] text-[#1E293B]" />
              </div>
              <div className="flex space-x-3">
                <select className="border border-[#E2E8F0] rounded-lg px-4 py-2 text-[13px] text-[#1E293B] bg-white focus:outline-none">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-white">
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Complaint ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Citizen / Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  
                  {allComplaintsInSystem.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4 text-[13px] font-bold text-[#0041C7]">{complaint.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-[13px] font-bold text-[#1E293B]">{complaint.citizen}</p>
                        <p className="text-[11px] text-[#64748B]">{complaint.type}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[12px] font-bold ${complaint.priority === 'High' ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => navigate('/officer/complaint-details')} 
                          className="px-4 py-2 bg-[#0041C7] hover:bg-[#0033A0] text-white text-[12px] font-bold rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}

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