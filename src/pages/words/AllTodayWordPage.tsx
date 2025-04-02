import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

const AllTodayWordPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [todayWord, setTodayWord] = useState([]);

  useEffect(() => {
    const allTodayWord = localStorage.getItem('todayWords');
    if (allTodayWord) {
      setTodayWord(JSON.parse(allTodayWord));
    }
  }, []);

  return (
    <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className='flex items-center mb-4'>
        <ChevronLeft
          size={25}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <h2 className='text-xl font-bold flex-grow text-center'>오늘의 단어</h2>
        <div className='w-5'></div>
      </div>

      <div className='space-y-3'>
        {todayWord.map((item, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
          >
            <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <Star size={20} />
            </button>
            <div className="p-2">
              <div className="flex items-center gap-2">
                <p className="font-bold text-2xl">{item.hiragana}</p>
                <p className="text-base text-gray-500 dark:text-gray-400">{item.word}</p>
              </div>
              <p className="mt-1 text-base">{item.meaning}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AllTodayWordPage;
