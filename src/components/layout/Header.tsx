import { Home, Moon, Settings, Star, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLocation, useNavigate } from "react-router";

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={`px-4 py-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">일본어 단어장</h1>
        <div className="flex items-center space-x-4">
          {location.pathname !== '/' ? <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Home size={20} />
          </button>
            : <></>
          }

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => navigate('/favorite')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Star size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;