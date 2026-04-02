import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-2 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#94A3B8] font-medium w-full">
      <div>
        &copy; 2026 National Governance Digital Division All rights reserved.
      </div>
      <div className="mt-2 md:mt-0 flex space-x-2">
        <a href="#" className="hover:text-[#64748B] transition-colors">Privacy Policy</a>
        <span>|</span>
        <a href="#" className="hover:text-[#64748B] transition-colors">Terms of Conditions</a>
      </div>
    </footer>
  );
}