import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../api';

const JlptVocabularyChapterPage = () => {
  const { darkMode } = useTheme();
  const { level } = useParams();
  const navigate = useNavigate();
  const [chapterList, setChapterList] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    fetchData(level);
  }, [level])

  const fetchData = async (level: string) => {
    try {
      const response = await axiosInstance.get(`/word/chapter/${level}`);
      if (response.data) {
        setWordCount(response.data.totalWords)
        setChapterList(response.data.chapter);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

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

  return (
    <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* 레벨 정보 */}
      <div className={`mb-4 p-3 rounded-lg ${fetchLevelHeader(level)} text-white`}>
        <div className="mb-1 flex justify-between items-center">
          <h3 className="text-lg font-bold">{level} 단어</h3>
          <p className='text-lg font-bold'>{wordCount}개</p>
        </div>
      </div>

      {/* chapter 목록 */}
      <div className='space-y-3'>
        {chapterList.map((item) => (
          <div 
            key={item}
            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center `}
            onClick={() => navigate(`/jlpt/${level}/${item}`)}
          >
            <span className='font-bold'>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JlptVocabularyChapterPage;