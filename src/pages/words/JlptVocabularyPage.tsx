import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from '../../api';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/words/PageHeader';
import VocabularyList from '../../components/words/VocabularyList';

const JlptVocabularyPage = () => {
  const { level, chapter } = useParams();
  const [wordList, setWordList] = useState([]);

  const fetchData = async (level: string) => {
    try {
      const response = await axiosInstance.get(`/word/jlpt/${chapter}/${level}`);
      if (response.status === 200) {
        setWordList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 즐겨찾기 토글 핸들러
  const handleToggleFavorite = (wordId: number) => {
    const updatedWords = wordList.map(word => 
      word.wordId === wordId ? { ...word, favorite: !word.favorite } : word
    );
    setWordList(updatedWords);
    // API를 통한 즐겨찾기 업데이트 로직이 필요하다면 여기에 구현
  };

  useEffect(() => {
    fetchData(level);
  }, [level, chapter]);

  return (
    <PageLayout
      headerComponent={<PageHeader title={`${level} ${chapter}`} />}
    >
      <div className="px-4 py-3">
      </div>
      <VocabularyList 
        wordList={wordList} 
        onToggleFavorite={handleToggleFavorite} 
      />
    </PageLayout>
  );
};

export default JlptVocabularyPage;