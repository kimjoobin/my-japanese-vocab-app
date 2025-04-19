import { ChevronDown, ChevronUp, Star, Volume2 } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { JLPTWordResponseDto } from '../../types/vocabulary';
import useSpeech from '../../hooks/useSpeech';
import ExampleSection from './ExampleSection';

interface WordCardProps {
  item: JLPTWordResponseDto;
  onToggleFavorite?: (wordId: number) => void;
}

const WordCard: React.FC<WordCardProps> = ({ item, onToggleFavorite }) => {
  const { darkMode } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const { speak } = useSpeech();

  const toggleExample = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`mb-3 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      {/* 단어 헤더 섹션 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl">{item.hiragana}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{item.word}</span>
          <span>
            <button className="text-gray-400" onClick={() => speak(item.hiragana)}>
              <Volume2 size={18} />
            </button>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`${item.isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
            onClick={() => onToggleFavorite && onToggleFavorite(item.wordId)}
          >
            <Star size={18} fill={item.isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={toggleExample}
            className="focus:outline-none"
          >
            {expanded ? (
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
      {expanded && item.wordExamples && item.wordExamples.length > 0 && (
        <ExampleSection examples={item.wordExamples} />
      )}
    </div>
  );
}

export default WordCard;