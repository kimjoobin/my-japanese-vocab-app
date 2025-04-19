import React, { createContext, useContext } from 'react';
import { JLPTWordResponseDto } from '../types/vocabulary';

interface WordsContextType {
  words: JLPTWordResponseDto[];
}

const WordsContext = createContext<WordsContextType>({
  words: []
});

export const useWords = () => useContext(WordsContext);

export default WordsContext;