import React, { useState, useEffect, useRef } from 'react';
import { JLPTWordResponseDto } from '../../types/vocabulary';
import { Search, X, AlertCircle } from 'lucide-react';
import axiosInstance from '../../api';

const SearchComponent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<JLPTWordResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Esc 키로 검색창 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchOpen]);

  // 검색창이 열려있을 때 본문 스크롤 방지
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);
  
  // API로 검색 결과 가져오기
  const fetchSearchResults = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // API 호출
      const response = await axiosInstance.get('/word/search', {
        params: {
          searchText: term.trim()
        }
      });

      console.log('API 응답:', response);
      setSearchResults(response.data);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 검색창 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // 검색창 열 때 입력란에 포커스
      setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
      }, 100);
    } else {
      closeSearch();
    }
  };
  
  // 검색창 닫기
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
    setSearchResults([]);
    
    // 진행 중인 타임아웃 취소
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
  };

  // 검색어 변경 시 API 호출
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // 타이핑 중 디바운싱 적용 (300ms)
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    searchTimeout.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 300);
  };

  // 검색 입력 제출 처리 (모바일에서 검색 버튼 누를 때)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults(searchTerm);
    // 모바일에서 키보드 닫기
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) searchInput.blur();
  };

  return (
    <>
      {/* 검색 버튼 */}
      <button 
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={toggleSearch}
        aria-label="검색"
      >
        <Search size={20} />
      </button>

      {/* 검색창 오버레이 */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex flex-col bg-gray-900 bg-opacity-90">
          {/* 검색창 헤더 */}
          <div className="bg-gray-800 w-full flex items-center h-14 shadow-md">
            <form onSubmit={handleSubmit} className="flex items-center w-full px-4">
              <button 
                type="button"
                className="text-gray-400 flex items-center justify-center"
                onClick={closeSearch}
                aria-label="검색 닫기"
              >
                <X size={20} />
              </button>
              
              <input
                id="searchInput"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="히라가나 또는 의미 검색..."
                className="flex-1 bg-gray-700 text-white p-2 rounded-lg mx-3 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
              
              <button 
                type="submit"
                className="text-blue-400 flex items-center justify-center"
                aria-label="검색 실행"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
          
          {/* 로딩 상태 표시 */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">검색 중...</p>
              </div>
            </div>
          )}
          
          {/* 검색 결과 없음 (가운데 정렬 및 디자인 개선) */}
          {!isLoading && searchTerm.trim() !== '' && searchResults.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md">
                <div className="flex justify-center mb-4">
                  <AlertCircle size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-400 mb-4">
                  "{searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.
                </p>
                <p className="text-sm text-gray-500">
                  다른 검색어를 입력하거나 맞춤법을 확인해보세요.
                </p>
              </div>
            </div>
          )}
          
          {/* 검색 결과가 있을 때 */}
          {!isLoading && searchResults.length > 0 && searchTerm.trim() !== '' && (
            <div className="flex flex-col flex-1">
              {/* 검색 결과 카운트 표시 */}
              <div className="px-4 py-2 border-t border-gray-700 text-sm bg-gray-800 text-gray-400">
                <span className="font-medium">{searchResults.length}개</span>의 결과
              </div>
              
              {/* 검색 결과 목록 */}
              <div className="overflow-y-auto flex-1">
                <div className="p-4">
                  <ul className="space-y-3">
                    {searchResults.map((word) => (
                      <li 
                        key={word.wordId} 
                        className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer shadow-sm"
                        onClick={() => {
                          // 단어 클릭 시 상세 페이지로 이동하거나 다른 동작 수행
                          // navigate(`/word/${word.id}`); 예시: 상세 페이지로 이동
                          closeSearch();
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-white">{word.word || word.hiragana}</p>
                            <p className="text-sm text-gray-400 mt-1">{word.hiragana}</p>
                          </div>
                          <p className="text-blue-300">{word.meaning}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
 
export default SearchComponent;