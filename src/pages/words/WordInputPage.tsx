import React, { useEffect, useState } from 'react';

const WordInputPage = () => {
  // 초기 상태
  const [levels, setLevels] = useState([
    { id: 0, name: '' }
  ]);
  const [categories, setCategories] = useState([
    { id: 0, name: ''}
  ]);
  const [formData, setFormData] = useState({
    japanese: '',
    hiragana: '',
    levelId: '',
    categoryId: '',
    meanings: [{ meaning: '', exampleJa: '', exampleKo: '', meaningOrder: 1 }]
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  // 레벨과 카테고리 데이터 가져오기 (API 구현 전 임시 데이터)
  useEffect(() => {
    // 실제로는 API에서 가져오는 코드로 대체
    setLevels([
      { id: 1, name: 'N5' },
      { id: 2, name: 'N4' },
      { id: 3, name: 'N3' },
      { id: 4, name: 'N2' },
      { id: 5, name: 'N1' }
    ]);

    setCategories([
      { id: 1, name: '명사' },
      { id: 2, name: '동사' },
      { id: 3, name: '형용사' },
      { id: 4, name: '부사' },
      { id: 5, name: '대명사'}
    ]);
  }, []);

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 의미 필드 변경 핸들러
  const handleMeaningChange = (index: number, field: string, value: string) => {
    const newMeanings = [...formData.meanings];
    newMeanings[index] = { ...newMeanings[index], [field]: value };
    setFormData({ ...formData, meanings: newMeanings });
  };

  // 의미 항목 추가
  const addMeaning = () => {
    setFormData({
      ...formData,
      meanings: [
        ...formData.meanings,
        {
          meaning: '',
          exampleJa: '',
          exampleKo: '',
          meaningOrder: formData.meanings.length + 1
        }
      ]
    });
  };

  // 의미 항목 삭제
  const removeMeaning = (index: number) => {
    if (formData.meanings.length > 1) {
      const newMeanings = formData.meanings.filter((_, i) => i !== index);
      // 의미 순서 재정렬
      const reorderedMeanings = newMeanings.map((item, i) => ({
        ...item,
        meaningOrder: i + 1
      }));
      setFormData({ ...formData, meanings: reorderedMeanings });
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기본 유효성 검사
    if (!formData.japanese.trim() || !formData.hiragana.trim()) {
      setMessage({ text: '일본어 단어와 히라가나를 입력해주세요.', type: 'error' });
      return;
    }

    if (!formData.levelId || !formData.categoryId) {
      setMessage({ text: '레벨과 카테고리를 선택해주세요.', type: 'error' });
      return;
    }

    const hasEmptyMeaning = formData.meanings.some(m => !m.meaning.trim());
    if (hasEmptyMeaning) {
      setMessage({ text: '모든 의미 항목을 채워주세요.', type: 'error' });
      return;
    }

    try {
      // 실제로는 API 엔드포인트로 POST 요청
      // const response = await axios.post('/api/words', formData);

      // API 구현 전 콘솔에 출력
      console.log('제출된 데이터:', formData);

      setMessage({ text: '단어가 성공적으로 저장되었습니다!', type: 'success' });

      // 폼 초기화
      setFormData({
        japanese: '',
        hiragana: '',
        levelId: '',
        categoryId: '',
        meanings: [{ meaning: '', exampleJa: '', exampleKo: '', meaningOrder: 1 }]
      });

    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      setMessage({ text: '저장 중 오류가 발생했습니다.', type: 'error' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-200">일본어 단어 입력</h2>

      {message.text && (
        <div className={`p-3 mb-4 rounded ${message.type === 'success'
          ? 'bg-green-100 text-green-800 border border-green-200'
          : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label htmlFor="japanese" className="block font-medium text-gray-700 mb-1">일본어 단어</label>
            <input
              type="text"
              id="japanese"
              name="japanese"
              value={formData.japanese}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hiragana" className="block font-medium text-gray-700 mb-1">히라가나</label>
            <input
              type="text"
              id="hiragana"
              name="hiragana"
              value={formData.hiragana}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="mb-4">
            <label htmlFor="levelId" className="block font-medium text-gray-700 mb-1">레벨</label>
            <select
              id="levelId"
              name="levelId"
              value={formData.levelId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">레벨 선택</option>
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="categoryId" className="block font-medium text-gray-700 mb-1">카테고리</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">카테고리 선택</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">의미</h3>

        {formData.meanings.map((meaning, index) => (
          <div key={index} className="bg-white p-4 rounded-md border border-gray-200 mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-medium text-gray-800">의미 #{index + 1}</h4>
              {formData.meanings.length > 1 && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  onClick={() => removeMeaning(index)}
                >
                  삭제
                </button>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor={`meaning-${index}`} className="block font-medium text-gray-700 mb-1">한국어 의미</label>
              <input
                type="text"
                id={`meaning-${index}`}
                value={meaning.meaning}
                onChange={(e) => handleMeaningChange(index, 'meaning', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={`exampleJa-${index}`} className="block font-medium text-gray-700 mb-1">일본어 예문</label>
              <textarea
                id={`exampleJa-${index}`}
                value={meaning.exampleJa}
                onChange={(e) => handleMeaningChange(index, 'exampleJa', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-20"
              />
            </div>

            <div className="mb-2">
              <label htmlFor={`exampleKo-${index}`} className="block font-medium text-gray-700 mb-1">한국어 예문</label>
              <textarea
                id={`exampleKo-${index}`}
                value={meaning.exampleKo}
                onChange={(e) => handleMeaningChange(index, 'exampleKo', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-20"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={addMeaning}
        >
          의미 추가
        </button>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          단어 저장
        </button>
      </form>
    </div>
  );
}

export default WordInputPage;