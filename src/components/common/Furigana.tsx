// src/components/common/SimpleFurigana.tsx
import React, { useMemo } from 'react';

interface FuriganaProps {
  kanji: string;
  hiragana: string;
}

/**
 * 간단한 후리가나 컴포넌트 - 기본 ruby 태그 활용
 */
const SimpleFurigana: React.FC<FuriganaProps> = ({ kanji, hiragana }) => {
  // 텍스트가 없는 경우 처리
  if (!kanji || !hiragana) return <span>{kanji || hiragana || ''}</span>;

  // 한자와 히라가나 매핑 결과를 메모이제이션
  const rubyElements = useMemo(() => {
    return generateRubyElements(kanji, hiragana);
  }, [kanji, hiragana]);

  return <div className="furigana-text">{rubyElements}</div>;
};

/**
 * 한자 범위 확인 (Unicode CJK 통합 한자 범위 사용)
 */
const isKanjiChar = (char: string): boolean => {
  if (!char || char.length === 0) return false;
  
  const code = char.charCodeAt(0);
  
  // CJK 통합 한자: U+4E00 ~ U+9FFF
  const isCjkUnified = code >= 0x4e00 && code <= 0x9fff;
  
  // CJK 호환 한자: U+F900 ~ U+FAFF
  const isCjkCompat = code >= 0xf900 && code <= 0xfaff;
  
  // 일반적인 구두점이나 기호는 한자가 아님
  const isPunctuation = ['、', '。', '「', '」', '『', '』', '（', '）', 
                        '・', '！', '？', '…', '　', ' ', ':', '・'].includes(char);
  
  return (isCjkUnified || isCjkCompat) && !isPunctuation;
};

/**
 * 히라가나 범위 확인
 */
const isHiraganaChar = (char: string): boolean => {
  if (!char || char.length === 0) return false;
  
  const code = char.charCodeAt(0);
  
  // 히라가나: U+3040 ~ U+309F
  return (code >= 0x3040 && code <= 0x309f) || char === 'ー'; // 장음 포함
};

/**
 * 후리가나 루비 요소 생성 함수
 */
const generateRubyElements = (kanji: string, hiragana: string): JSX.Element[] => {
  const elements: JSX.Element[] = [];
  
  // 글자 단위로 분리
  const kanjiChars = [...kanji];
  const hiraganaChars = [...hiragana];
  
  let k = 0; // 한자 인덱스
  let h = 0; // 히라가나 인덱스
  
  while (k < kanjiChars.length && h < hiraganaChars.length) {
    // 일치하는 문자 처리 (히라가나, 카타카나, 기호 등) - 그대로 표시
    if (kanjiChars[k] === hiraganaChars[h]) {
      elements.push(
        <span key={`plain-${k}`}>{kanjiChars[k]}</span>
      );
      k++;
      h++;
      continue;
    }
    
    // 한자 처리
    if (isKanjiChar(kanjiChars[k])) {
      // 연속된 한자 찾기
      let kanjiStart = k;
      let hiraganaStart = h;
      
      // 한자 그룹 찾기
      while (k < kanjiChars.length && isKanjiChar(kanjiChars[k])) {
        k++;
      }
      
      // 해당 한자 그룹의 히라가나 찾기
      while (h < hiraganaChars.length && 
            (isHiraganaChar(hiraganaChars[h]) || hiraganaChars[h] === 'ー') && 
            (h === hiraganaStart || k >= kanjiChars.length || hiraganaChars[h] !== kanjiChars[k])) {
        h++;
      }
      
      // 한자와 히라가나 매핑 요소 생성
      const kanjiText = kanjiChars.slice(kanjiStart, k).join('');
      const hiraganaText = hiraganaChars.slice(hiraganaStart, h).join('');
      
      elements.push(
        <ruby key={`ruby-${kanjiStart}`}>
          {kanjiText}<rt>{hiraganaText}</rt>
        </ruby>
      );
    } else {
      // 일반 문자 처리
      elements.push(
        <span key={`plain-${k}`}>{kanjiChars[k]}</span>
      );
      k++;
      
      // 히라가나 인덱스도 진행
      if (h < hiraganaChars.length && !isKanjiChar(hiraganaChars[h])) {
        h++;
      }
    }
  }
  
  // 남은 문자 처리
  while (k < kanjiChars.length) {
    elements.push(
      <span key={`plain-${k}`}>{kanjiChars[k]}</span>
    );
    k++;
  }
  
  return elements;
};

export default SimpleFurigana;