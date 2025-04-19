/**
 * JLPT 레벨 열거형
 */
export enum LevelEnum {
  N1 = 'N1',
  N2 = 'N2',
  N3 = 'N3',
  N4 = 'N4',
  N5 = 'N5'
}

/**
 * 단어 예제 DTO 인터페이스
 */
export interface WordExampleDto {
  exampleKanji: string;
  exampleHiragana: string;
  exampleKoTranslate: string;
}

/**
 * JLPT 단어 응답 DTO 인터페이스
 */
export interface JLPTWordResponseDto {
  wordId: number;
  chapter: string;
  word: string;
  hiragana: string;
  meaning: string;
  isFavorite: boolean;
  jlptLevel: LevelEnum;
  wordExamples: WordExampleDto[];
}