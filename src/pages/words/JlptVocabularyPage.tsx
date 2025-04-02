import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, ChevronLeft, ChevronUp, Star, Volume2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../api';
import SearchBar from '../../components/words/SearchBar';

const JlptVocabularyPage = () => {
  const { darkMode } = useTheme();
  const { level, chapter } = useParams();
  const [wordList, setWordList] = useState({});
  const [expandedExamples, setExpandedExamples] = useState({});
  const navigate = useNavigate();

  const fetchData = async (level: string) => {
    try {
      const response = await axiosInstance.get(`/word/jlpt/${chapter}/${level}`);
      if (response.status === 200) {
        setWordList(response.data);
        console.log(response.data);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExample = (wordId) => {
    setExpandedExamples(prev => ({
      ...prev,
      [wordId]: !prev[wordId]
    }));
  };

  useEffect(() => {
    fetchData(level);
  }, [level]);

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {/* 헤더 부분 */}
      <div className='flex items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700'>
        <ChevronLeft
          size={20}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <h2 className='text-xl font-bold flex-grow text-center'>{level} {chapter}</h2>
        <div className='w-5'></div>
      </div>

      {/* 검색 바 */}
      {/* <div className="px-4 py-3">
        <SearchBar />
      </div> */}

      {/* 단어 목록 */}
      <div className="px-4 pb-4">
        {wordList.length > 0 ? (
          wordList.map((item) => (
            <div
              key={item.wordId}
              className={`mb-3 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
            >
              {/* 단어 헤더 섹션 */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl">{item.hiragana}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.word}</span>
                </div>
                <div className="flex items-center gap-2">
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
};

export default JlptVocabularyPage;