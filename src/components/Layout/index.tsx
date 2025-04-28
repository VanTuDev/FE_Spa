import React from 'react';
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 bg-[#f9f9f9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 