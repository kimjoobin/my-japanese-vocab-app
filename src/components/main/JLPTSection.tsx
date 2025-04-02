import { useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";


const JPLTSection: React.FC = () => {
  const {darkMode} = useTheme();
  const navigate = useNavigate();
  
  const goJLPT = (level: string) => {
    navigate(`/jlpt/chapter/${level}`);
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} cursor-pointer hover:shadow-lg transition`}
    >
      <h2 className="text-xl font-bold mb-4">JLPT 단어</h2>
      <div className="grid gap-4">
        {['N5', 'N4', 'N3', 'N2', 'N1'].map((level) => (
          // <div
          //   key={level}
          //   className={`flex items-center justify-center h-16 rounded-lg ${level === 'N5'
          //     ? `${darkMode ? 'bg-blue-700' : 'bg-blue-500'} text-white`
          //     : `${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`
          //     }`}
          // >
          <div
            key={level}
            className={`p-4 flex items-center justify-center rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            onClick={() => goJLPT(level)}
          >
            <span className="font-bold">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JPLTSection;