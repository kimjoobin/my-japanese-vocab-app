import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { initSpeechSynthesis, speakJapanese } from '../../utils/speechUtils';

const hiraganaChart = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '', 'ゆ', '', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', '', 'を', '', 'ん']
];

// 히라가나와 로마자 발음 매핑
const pronunciationMap: Record<string, string> = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n'
};

const HiraganaPage = () => {
  const { darkMode } = useTheme();
  const [speechReady, setSpeechReady] = useState(false);

  // 음성 합성 초기화
  useEffect(() => {
    const loadVoices = async () => {
      const ready = await initSpeechSynthesis();
      setSpeechReady(ready);
    };

    loadVoices();
  }, []);

  // 클릭한 문자의 발음
  const playAudio = (char: string) => {
    if (!char || !speechReady) return;
    speakJapanese(char);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">히라가나 오십음표</h1>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-5 gap-4">
            {hiraganaChart.flat().map((char, index) => (
              char ? (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-lg ${darkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  onClick={() => char && playAudio(char)}
                  aria-label={char ? `히라가나 ${pronunciationMap[char] || ''}` : undefined}
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
              ) :
                <div key={index} className="aspect-square" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HiraganaPage;