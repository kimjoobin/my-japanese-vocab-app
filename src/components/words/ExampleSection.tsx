import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Volume2 } from 'lucide-react';
import Furigana from '../common/Furigana';
import { WordExampleDto } from '../../types/vocabulary';
import useSpeech from '../../hooks/useSpeech';

// CSS 스타일 import (index.tsx 또는 App.tsx에서 import 해도 됨)
import '../../styles/furigana.css';

interface ExampleSectionProps {
  examples: WordExampleDto[];
}

const ExampleSection: React.FC<ExampleSectionProps> = ({ examples }) => {
  const { darkMode } = useTheme();
  const { speak } = useSpeech();

  return (
    <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-100'}`}>
      <h4 className="font-medium text-sm mb-2">예제</h4>
      {examples.map((example, exIndex) => (
        <div
          key={exIndex}
          className={`mb-3 ${exIndex > 0 ? 'pt-2 border-t border-gray-200 dark:border-gray-700' : ''}`}
        >
          {/* 텍스트가 넘칠 경우 텍스트 줄임 처리 */}
          <div className="overflow-x-auto pb-2 hide-scrollbar">
            {/* Furigana 컴포넌트가 있는 경우 사용, 없으면 일반 텍스트로 표시 */}
            <Furigana
                kanji={example.exampleKanji}
                hiragana={example.exampleHiragana}
              />
          </div>

          <div className="overflow-x-auto pb-1 hide-scrollbar">
            <p className="text-sm text-gray-700 dark:text-gray-300">{example.exampleKoTranslate}</p>
          </div>

          {/* 음성 버튼 */}
          <div className="flex justify-end">
            <button
              className="text-gray-500 dark:text-gray-400 p-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => speak(example.exampleHiragana)}
              aria-label="텍스트 음성으로 듣기"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExampleSection;