import React, { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface PageLayoutProps {
  children: ReactNode;
  headerComponent: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, headerComponent }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {headerComponent}
      {children}
    </div>
  );
}

export default PageLayout;