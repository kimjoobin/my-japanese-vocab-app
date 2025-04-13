import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, ChevronLeft, ChevronUp, Star, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const AllTodayWordPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [todayWord, setTodayWord] = useState([]);
  const [expandedExamples, setExpandedExamples] = useState({});

  useEffect(() => {
    const allTodayWord = localStorage.getItem('todayWords');
    
    if (allTodayWord) {
      setTodayWord(JSON.parse(allTodayWord));
    }
  }, []);

  const fetchLevelHeader = (level: string) => {
    let levelHeader = '';
    switch (level) {
      case 'N5':
        levelHeader = 'bg-green-500';
        return levelHeader;
      case 'N4':
        levelHeader = 'bg-blue-500'
        return levelHeader;
      case 'N3':
        levelHeader = 'bg-violet-500';
        return levelHeader;
      case 'N2':
        levelHeader = 'bg-yellow-500';
        return levelHeader;
      case 'N1':
        levelHeader = 'bg-red-500';
        return levelHeader;
      default:
        levelHeader = 'bg-gray-500';
        return;
    }
    return levelHeader;
  };

  const toggleExample = (wordId) => {
    setExpandedExamples(prev => ({
      ...prev,
      [wordId]: !prev[wordId]
    }));
  };

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className='flex items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700'>
        <ChevronLeft
          size={20}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <h2 className='text-xl font-bold flex-grow text-center'>오늘의 단어</h2>
        <div className='w-5'></div>
      </div>

      <div className="px-4 py-3">
      </div>

      {/* 단어 목록 */}
      <div className="px-4 pb-4">
        {todayWord.length > 0 ? (
          todayWord.map((item) => (
            <div
              key={item.wordId}
              className={`mb-3 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {/* 단어 헤더 섹션 */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl">{item.hiragana}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.word}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-lg ${fetchLevelHeader(item.jlptLevel)}`}>{item.jlptLevel}</span>
                  <button
                    className={`${item.favorite ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    <Star size={18} fill={item.favorite ? "currentColor" : "none"} />
                  </button>
                  <button className="text-gray-400">
                    <Volume2 size={18} />
                  </button>
                  <button
                    onClick={() => toggleExample(item.wordId)}
                    className="focus:outline-none"
                  >
                    {expandedExamples[item.wordId] ? (
                      <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* 단어 뜻 섹션 */}
              <div className="px-4 pb-3">
                <p className="text-base">{item.meaning}</p>
              </div>

              {/* 예제문 섹션 */}
              {expandedExamples[item.wordId] && item.wordExamples && item.wordExamples.length > 0 && (
                <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-100'
                  }`}>
                  <h4 className="font-medium text-sm mb-2">예제</h4>
                  {item.wordExamples.map((example, exIndex) => (
                    <div
                      key={exIndex}
                      className={`mb-3 ${exIndex > 0 ? 'pt-2 border-t border-gray-200 dark:border-gray-700' : ''}`}
                    >
                      {/* 텍스트가 넘칠 경우 텍스트 줄임 처리 */}
                      <div className="overflow-x-auto pb-1 hide-scrollbar">
                        <p className="font-medium text-sm">{example.exampleKanji}</p>
                      </div>
                      <div className="overflow-x-auto pb-1 hide-scrollbar">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{example.exampleHiragana}</p>
                      </div>
                      <div className="overflow-x-auto pb-1 hide-scrollbar">
                        <p className="text-sm">{example.exampleKoTranslate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default AllTodayWordPage;
