import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Subtle ambient background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: 0,
          right: 0,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative" style={{ zIndex: 1 }}>
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content area */}
        <main
          className="flex-1 overflow-y-auto"
          style={{
            scrollbarGutter: 'stable',
          }}
        >
          <div
            style={{
              padding: '36px 40px',
              maxWidth: 1280,
              margin: '0 auto',
              width: '100%',
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
