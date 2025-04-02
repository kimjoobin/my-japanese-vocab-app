import { useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";

const HiraganaSection: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const goHiragana = (page: string) => {
    navigate(page);
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} cursor-pointer hover:shadow-lg transition`}
    >
      <h2 className="text-xl font-bold mb-4">오십음표</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div
          className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}
          onClick={() => goHiragana('/hiragana')}
        >
          <span className="font-bold">히라가나</span>
        </div>
        <div 
          className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}
          onClick={() => goHiragana('/gatakana')}
        >
          <span className="font-bold">가타카나</span>
        </div>
      </div>
    </div>
  );
}

export default HiraganaSection;