import { useEffect, useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/words/PageHeader';
import VocabularyList from '../../components/words/VocabularyList';
import { JLPTWordResponseDto } from '../../types/vocabulary';

const AllTodayWordPage = () => {
  const [todayWords, setTodayWords] = useState<JLPTWordResponseDto[]>([]);

  useEffect(() => {
    const allTodayWord = localStorage.getItem('todayWords');

    if (allTodayWord) {
      setTodayWords(JSON.parse(allTodayWord) as JLPTWordResponseDto[]);
    }
  }, []);

  const handleToggleFavorite = (wordId: number) => {
    // 즐겨찾기 토글 로직 구현
    const updatedWords = todayWords.map(word => 
      word.wordId === wordId ? { ...word, favorite: !word.isFavorite } : word
    );
    setTodayWords(updatedWords);
    localStorage.setItem('todayWords', JSON.stringify(updatedWords));
  };

  return (
    <PageLayout
      headerComponent={<PageHeader title="오늘의 단어"/>}
    >
      <div className="px-4 py-3">
        {/* 필요한 경우 검색바 추가 */}
      </div>
      <VocabularyList 
        wordList={todayWords} 
        onToggleFavorite={handleToggleFavorite} 
      />

    </PageLayout>
  );
}

export default AllTodayWordPage;
