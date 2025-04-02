import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { initSpeechSynthesis, speakJapanese } from '../../utils/speechUtils';

// 히라가나와 로마자 발음 매핑
const pronunciationMap: Record<string, string> = {
  'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
  'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
  'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
  'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
  'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
  'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
  'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
  'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
  'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
  'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n'
};

const GatakanaPage = () => {
  const katakanaChart = [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', '', 'ユ', '', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', '', 'ヲ', '', 'ン']
  ];
  const { darkMode } = useTheme();
  const [speechReday, setSpeechReady] = useState(false);

  useEffect(() => {
    const loadVoices = async () => {
      const ready = await initSpeechSynthesis();
      setSpeechReady(ready)
    }
    loadVoices();
  }, []);

  const playAudio = (char: string) => {
    if (!char || !speechReday) return;
    speakJapanese(char);
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">카타카나 오십음표</h1>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-5 gap-4">
            {katakanaChart.flat().map((char, index) => (
              char ? (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg ${darkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => char && playAudio(char)}
                  aria-label={char ? `카타카나 ${pronunciationMap[char] || ''}` : undefined}
                >
                  {char && (
                    <div className="relative flex flex-col items-center">
                      <span>{char}</span>
                      {pronunciationMap[char] && (
                        <span className="text-xs mt-1 opacity-70">{pronunciationMap[char]}</span>
                      )}
                    </div>
                  )}
                </div>
              ) : <div key={index} className="aspect-square" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GatakanaPage;