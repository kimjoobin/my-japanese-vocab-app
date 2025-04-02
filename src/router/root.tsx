import { createBrowserRouter } from "react-router";
import HiraganaPage from "../pages/gojuonzu/HiraganaPage";
import GatakanaPage from "../pages/gojuonzu/GatakanaPage";
import Main from "../pages/main/Main";
import HomePage from "../pages/main/HomePage";
import JlptVocabularyPage from "../pages/words/JlptVocabularyPage";
import WordInputPage from "../pages/words/WordInputPage";
import JlptVocabularyChapterPage from "../pages/words/JlptVocabularyChapterPage";
import FavoriteWordPage from "../pages/favorite/FavoriteWordPage";
import AllTodayWordPage from "../pages/words/AllTodayWordPage";

export const root = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    children: [
      {
        index: true,  // 기본 라우트로 설정
        element: <HomePage />
      },
      {
        path: 'hiragana',
        element: <HiraganaPage/>
      },
      {
        path: 'gatakana',
        element: <GatakanaPage/>
      },
      {
        path: 'jlpt/:level/:chapter',
        element: <JlptVocabularyPage/>
      },
      {
        path: 'jlpt/chapter/:level',
        element: <JlptVocabularyChapterPage/>
      },
      {
        path: 'favorite',
        element: <FavoriteWordPage/>
      },
      {
        path: 'today/words',
        element: <AllTodayWordPage/>
      },
      {
        path: 'word',
        element: <WordInputPage/>
      }
    ]
  },
  
]);