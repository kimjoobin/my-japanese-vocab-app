import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import SearchBar from '../../components/words/SearchBar';

const FavoriteWordPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className='flex items-center mb-4'>
        <ChevronLeft
          size={25}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />

        <h2 className='text-xl font-bold flex-grow text-center'>즐겨찾기</h2>
        <div className='w-5'></div> {/* 균형을 맞추기 위한 빈 공간 */}
      </div>

      {/* 즐겨찾기 단어 목록 */}
      <>
        <SearchBar/>
        <div className='space-y-3'>

        </div>
      </>
    </div>
  );
}

export default FavoriteWordPage;