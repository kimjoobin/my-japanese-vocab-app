import React from 'react';
import HiraganaSection from '../../components/main/HiraganaSection';
import JPLTSection from '../../components/main/JLPTSection';
import TodayWord from '../../components/main/TodayWord';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Home Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 히라가나/가타카나 영역 */}
        <HiraganaSection />

        {/* JLPT 단어 영역 */}
        <JPLTSection />
      </div>

      {/* Today's Words */}
      <TodayWord />
    </>
  );
}

export default HomePage;