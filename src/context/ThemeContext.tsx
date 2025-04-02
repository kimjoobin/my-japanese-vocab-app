import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // localStorage에서 다크 모드 설정 불러오기
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // 다크 모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 다크 모드 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // 문서 전체에 다크 모드 클래스 적용
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 커스텀 훅을 통해 ThemeContext 사용하기 쉽게 만들기
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};