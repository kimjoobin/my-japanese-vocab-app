/**
 * 텍스트를 음성으로 변환하는 커스텀 훅
 * 일본어 텍스트를 기본값으로 음성 합성을 제공합니다.
 */
const useSpeech = () => {
  /**
   * 텍스트를 음성으로 읽어주는 함수
   * @param text 읽을 텍스트
   * @param lang 언어 코드 (기본값: 'ja-JP')
   */
  const speak = (text: string, lang: string = 'ja-JP'): void => {
    if ('speechSynthesis' in window) {
      // 이미 실행 중인 음성이 있다면 중지
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;  
      utterance.rate = 0.6; // 말하는 속도
      utterance.pitch = 1;  // 음높이

      // 음성 합성 시작
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('이 브라우저는 Speech Synthesis API를 지원하지 않습니다.');
    }
  };

  return { speak };
};

export default useSpeech;