import { Star } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../api";
import { useNavigate } from "react-router";

const TodayWord: React.FC = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [todayWord, setTodayWord] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/word/today');
      if (response.data) {
        setTodayWord(response.data[0]);
        localStorage.setItem('todayWords', JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goAllTodayWord = () => {
    navigate('/today/words');
  };

  return (
    <div className={`mt-8 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">오늘의 학습 단어</h2>
        <button
          className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          onClick={goAllTodayWord}
        >
          더보기
        </button>
      </div>
      <div className="space-y-3">
        <div
          className={`relative p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
        >
          <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
            <Star size={20} />
          </button>
          <div className="p-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{todayWord.hiragana}</p>
              <p className="text-base text-gray-500 dark:text-gray-400">{todayWord.word}</p>
            </div>
            <p className="mt-1 text-base">{todayWord.meaning}</p>
          </div>
        </div>
        {/* {todayWord.map((item, index) => (
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
        ))} */}
      </div>
    </div>
  );
}

export default TodayWord;