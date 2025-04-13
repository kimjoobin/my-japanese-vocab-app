import React from 'react';
import * as wanakana from 'wanakana';

// 후리가나 컴포넌트
const Furigana = ({ kanji, hiragana }) => {
  // 텍스트가 없는 경우 처리
  if (!kanji || !hiragana) return <span>{kanji || hiragana || ''}</span>;

  // 한자와 히라가나 텍스트 처리를 위한 함수
  const generateRubyElements = () => {
    // 한자만 있는 부분 추출 (정확한 알고리즘이 필요할 수 있음)
    const kanjiChars = kanji.split('');
    const hiraganaChars = hiragana.split('');
    
    // 결과 JSX 요소 배열
    const elements = [];
    
    // 현재 위치 추적
    let kanjiIndex = 0;
    let hiraganaIndex = 0;
    
    // 현재 처리 중인 후리가나 텍스트
    let currentHiragana = '';
    let currentKanji = '';
    
    // 문자열 분석
    while (kanjiIndex < kanjiChars.length && hiraganaIndex < hiraganaChars.length) {
      const k = kanjiChars[kanjiIndex];
      const h = hiraganaChars[hiraganaIndex];
      
      // 같은 문자인 경우 (히라가나, 특수문자 등) - 그대로 추가
      if (k === h) {
        // 이전에 모은 한자/히라가나가 있으면 처리
        if (currentKanji) {
          elements.push(
            <ruby key={`ruby-${elements.length}`}>
              {currentKanji}<rt>{currentHiragana}</rt>
            </ruby>
          );
          currentKanji = '';
          currentHiragana = '';
        }
        
        elements.push(<span key={`char-${elements.length}`}>{k}</span>);
        kanjiIndex++;
        hiraganaIndex++;
        continue;
      }
      
      // 한자 문자인지 확인 (간단한 검사)
      const isKanji = !wanakana.isHiragana(k) && !wanakana.isKatakana(k) && 
                     k !== ' ' && k !== '　' && 
                     !['、', '。', '「', '」', '？', '！', '…'].includes(k);
      
      if (isKanji) {
        // 한자 수집
        currentKanji += k;
        kanjiIndex++;
        
        // 해당 한자의 히라가나 읽기 수집
        // (이 부분은 실제 구현에서 더 정교한 알고리즘이 필요)
        while (hiraganaIndex < hiraganaChars.length && 
               wanakana.isHiragana(hiraganaChars[hiraganaIndex]) &&
               !['、', '。', '「', '」', '？', '！', '…'].includes(hiraganaChars[hiraganaIndex])) {
          currentHiragana += hiraganaChars[hiraganaIndex];
          hiraganaIndex++;
        }
      } else {
        // 비한자 처리
        if (currentKanji) {
          elements.push(
            <ruby key={`ruby-${elements.length}`}>
              {currentKanji}<rt>{currentHiragana}</rt>
            </ruby>
          );
          currentKanji = '';
          currentHiragana = '';
        }
        
        elements.push(<span key={`char-${elements.length}`}>{k}</span>);
        kanjiIndex++;
      }
    }
    
    // 남은 한자/히라가나 처리
    if (currentKanji) {
      elements.push(
        <ruby key={`ruby-${elements.length}`}>
          {currentKanji}<rt>{currentHiragana}</rt>
        </ruby>
      );
    }
    
    // 남은 문자들 처리
    while (kanjiIndex < kanjiChars.length) {
      elements.push(<span key={`char-${kanjiIndex}`}>{kanjiChars[kanjiIndex]}</span>);
      kanjiIndex++;
    }
    
    return elements;
  };
  
  // 후리가나 요소 생성
  const rubyElements = generateRubyElements();
  
  return <div className="furigana-text">{rubyElements}</div>;
};

export default Furigana;