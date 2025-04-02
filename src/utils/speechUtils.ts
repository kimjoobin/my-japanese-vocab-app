// src/utils/speechUtils.ts

// 브라우저에서 사용 가능한 일본어 음성을 찾아 반환
const findJapaneseVoice = (): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(voice => voice.lang.includes('ja')) || null;
};

// 모음 늘이기 (특히 o 발음 강화)
const stretchVowel = (text: string): string => {
  if (text.length !== 1) return text;
  
  // 'お', 'オ' 모음은 더 길게 늘이기
  if (text === 'お' || text === 'オ') {
    return text + 'ーー'; // 더블 장음 기호
  }
  
  // 모음인 경우 늘이기
  if (['あ', 'い', 'う', 'え', 'ア', 'イ', 'ウ', 'エ'].includes(text)) {
    return text + 'ー';
  }
  
  // o 발음이 들어간 문자는 더 길게 늘이기
  if (text.match(/[こそとのほもよろをごぞどぼぽ]/)) {
    return text + 'ーー'; // 더블 장음 기호 사용
  }
  if (text.match(/[コソトノホモヨロヲゴゾドボポ]/)) {
    return text + 'ーー'; // 더블 장음 기호 사용
  }
  
  // 그 외 발음 늘이기
  if (text.match(/[かさたなはまやらわがざだばぱ]/)) return text + 'ー'; // 'a' 모음
  if (text.match(/[きしちにひみりぎじぢびぴ]/)) return text + 'ー'; // 'i' 모음
  if (text.match(/[くすつぬふむゆるぐずづぶぷ]/)) return text + 'ー'; // 'u' 모음
  if (text.match(/[けせてねへめれげぜでべぺ]/)) return text + 'ー'; // 'e' 모음
  
  // 가타카나
  if (text.match(/[カサタナハマヤラワガザダバパ]/)) return text + 'ー'; // 'a' 모음
  if (text.match(/[キシチニヒミリギジヂビピ]/)) return text + 'ー'; // 'i' 모음
  if (text.match(/[クスツヌフムユルグズヅブプ]/)) return text + 'ー'; // 'u' 모음
  if (text.match(/[ケセテネヘメレゲゼデベペ]/)) return text + 'ー'; // 'e' 모음
  
  // 특수 케이스: ん, ン
  if (text === 'ん' || text === 'ン') return text + 'ー';
  
  return text;
};

// 음성 발음 함수 - 발음 개선
export const speakJapanese = (text: string): void => {
  // 브라우저가 Speech API를 지원하는지 확인
  if (!('speechSynthesis' in window)) {
    console.error('이 브라우저는 음성 합성을 지원하지 않습니다.');
    return;
  }

  // 이미 말하고 있다면 중지
  window.speechSynthesis.cancel();
  
  // 발음을 늘이기
  const stretchedText = stretchVowel(text);
  
  // 새 음성 인스턴스 생성
  const utterance = new SpeechSynthesisUtterance(stretchedText);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.5; // 더 느리게 설정 (기본값은 1)
  utterance.pitch = 1.0; // 기본 음높이
  utterance.volume = 1.0; // 최대 볼륨 (0.0 ~ 1.0)
  
  // 일본어 음성이 있으면 설정
  const japaneseVoice = findJapaneseVoice();
  if (japaneseVoice) {
    utterance.voice = japaneseVoice;
  }
  
  // 말하기 시작
  window.speechSynthesis.speak(utterance);
};

// 브라우저에 음성이 로드되기를 기다리는 함수
export const initSpeechSynthesis = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.error('이 브라우저는 음성 합성을 지원하지 않습니다.');
      resolve(false);
      return;
    }
    
    // 이미 음성이 로드되어 있는 경우
    if (window.speechSynthesis.getVoices().length > 0) {
      resolve(true);
      return;
    }
    
    // 음성이 로드될 때까지 대기
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(true);
    };
  });
};