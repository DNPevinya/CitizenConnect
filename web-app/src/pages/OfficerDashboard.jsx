import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 1. THIS IS YOUR MASTER DATABASE MOCKUP
const allComplaintsInSystem = [
  { id: '#CMP-88291', citizen: 'Sachini Dissanayake', type: 'Road Pothole Repair', status: 'Overdue', date: 'Oct 24, 2023', department: 'Urban Infrastructure' },
  { id: '#CMP-8915', citizen: 'Janaka Nayanakkara', type: 'Street Light Malfunction', status: 'In Progress', date: 'Oct 25, 2023', department: 'Urban Infrastructure' },
  { id: '#CMP-8921', citizen: 'David Miller', type: 'Waste Collection Delay', status: 'New', date: 'Oct 26, 2023', department: 'Sanitation' }, // Different Dept!
  { id: '#CMP-8928', citizen: 'Elena Rodriguez', type: 'Water Pipe Leakage', status: 'Pending Action', date: 'Oct 26, 2023', department: 'Water Board' }, // Different Dept!
  { id: '#CMP-8933', citizen: 'Arthur Morgan', type: 'Tree Obstruction', status: 'On Hold', date: 'Oct 27, 2023', department: 'Urban Infrastructure' },
];

export default function OfficerDashboard() {
  const navigate = useNavigate();

  // 2. THIS IS THE FILTERING LOGIC
  // We simulate that the logged-in user belongs to "Urban Infrastructure"
  const currentOfficerDepartment = 'Urban Infrastructure';
  
  // We filter the master array so this page ONLY holds their department's tickets
  const myDepartmentComplaints = allComplaintsInSystem.filter(
    (complaint) => complaint.department === currentOfficerDepartment
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar role="officer" />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header title={`${currentOfficerDepartment} Dashboard`} />

        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          
          {/* KPI CARDS (Unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm relative">
              <span className="absolute top-6 right-6 text-[11px] font-bold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">+12%</span>
              <div className="w-10 h-10 rounded bg-[#F0F5FF] text-[#0041C7] flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              </div>
              <p className="text-[11px] font-bold text-[#64748B] mb-1">Assigned to My Dept</p>
              {/* Dynamically count the tickets */}
              <h3 className="text-3xl font-extrabold text-[#1E293B]">{myDepartmentComplaints.length}</h3>
            </div>
            {/* ... other two KPI cards remain the same ... */}
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl flex-1 flex flex-col shadow-sm">
            <div className="px-6 py-5 border-b border-[#E2E8F0] flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-[#1E293B]">Recent Department Complaints</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Complaint ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Citizen Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Date Received</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#64748B] uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  
                  {/* 3. DYNAMICALLY RENDER ONLY THE FILTERED TICKETS */}
                  {myDepartmentComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4 text-[13px] font-bold text-[#0041C7]">{complaint.id}</td>
                      <td className="px-6 py-4 text-[13px] font-bold text-[#1E293B]">{complaint.citizen}</td>
                      <td className="px-6 py-4 text-[13px] text-[#64748B]">{complaint.type}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[13px] text-[#64748B]">{complaint.date}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => navigate('/officer/complaint-details')} 
                          className="p-1.5 text-[#0041C7] bg-[#F0F5FF] rounded hover:bg-[#DCE7F9] transition-colors inline-flex"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              
              {/* Notice how the Sanitation and Water Board tickets don't appear in this table! */}
              {myDepartmentComplaints.length === 0 && (
                <div className="p-8 text-center text-[#64748B] text-[13px]">
                  No complaints currently assigned to {currentOfficerDepartment}.
                </div>
              )}

            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}