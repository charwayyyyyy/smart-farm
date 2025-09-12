import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Add viewport meta tag for better mobile responsiveness
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    return () => {
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 px-4 sm:px-6 md:px-8 overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;