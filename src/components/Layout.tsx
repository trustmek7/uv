import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const ROUTES_WITHOUT_FOOTER = ['/login', '/registro', '/checkout'];

export function Layout() {
  const { pathname, search } = useLocation();
  const showFooter = !ROUTES_WITHOUT_FOOTER.includes(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, search]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#0B1F3A', color: 'white', border: 'none', borderRadius: '2px' },
        }}
      />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
