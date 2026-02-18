import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Área de contenido con max-width para pantallas ultra-anchas */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
