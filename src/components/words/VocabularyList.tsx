import React from 'react';
import WordCard from './WordCard';
import { JLPTWordResponseDto } from '../../types/vocabulary';

interface VocabularyListProps {
  wordList: JLPTWordResponseDto[];
  onToggleFavorite?: (wordId: number) => void;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ wordList, onToggleFavorite }) => {
  return (
    <div className="px-4 pb-4">
      {wordList && wordList.length > 0 ? (
        wordList.map((item) => (
          <WordCard 
            key={item.wordId} 
            item={item} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
 
export default VocabularyList;