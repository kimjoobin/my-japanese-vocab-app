import { Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const SearchBar = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`flex items-center px-3 py-2 mb-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <Search size={18} className='text-gray-500' />
      <input
        type='text'
        placeholder='단어 검색...'
        className={`ml-2 w-full bg-transparent outline-node ${darkMode ? 'text-white' : 'text-gray-800'}`}
      />
    </div>
  );
}

export default SearchBar;