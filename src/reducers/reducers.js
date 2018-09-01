import { combineReducers } from 'redux';

import {
  CHANGE_KEYWORD,
  SEARCH_NOVEL,
  CLEAN_SEARCH,
  LOAD_NOVEL_DETAILS,
  LOAD_NOVEL_DATA,
  LOAD_CHAPTER_CONTENT,
  TOGGLE_NATIVE_NOVEL
} from '../actions/actions';


const SearchInitState = {
  keyword: '',
  novelList: []
};

const search = (state = SearchInitState, action) => {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    
    case SEARCH_NOVEL:
      switch (action.status) {
        case 'SUCCESS':
          return Object.assign({}, state, {
            novelList: action.novelList
          });
        case 'FAILED':
          return state;
        default:
          return state;
      }

    case CLEAN_SEARCH:
      return SearchInitState;
    
    default:
      return state;
  }
};

const NovelInitState = {
  currentNovel: {},
  nativeList: []
};

const novel = (state = NovelInitState, action) => {
  switch (action.type) {
    case LOAD_NOVEL_DETAILS:
      switch (action.status) {
        case 'SUCCESS':
          return Object.assign({}, state, {
            currentNovel: action.novel
          });
        default:
          return state;
      }
    
    case TOGGLE_NATIVE_NOVEL:
      return handleToggleNativeNovel(state, action);

    default:
      return state;
  }
};

const handleToggleNativeNovel = (state, action) => {
  const novelIndex = state.nativeList.findIndex(item => action.novel._id === item._id);

  if (novelIndex !== -1) {
    let newNativeList = state.nativeList;

    newNativeList.splice(novelIndex, 1);

    return {
      ...state,
      nativeList: newNativeList
    };
  }

  return {
    ...state,
    nativeList: [
      ...state.nativeList,
      action.novel
    ]
  };  
};

const ReadInitState = {
  currentNovel: {},
  content: '',
  currentChapterIndex: 0,
  chapters: [],
  novelSourceList: []
};

const read = (state = ReadInitState, action) => {
  switch (action.type) {
    case LOAD_NOVEL_DATA:
      switch (action.status) {
        case 'PENDING':
          switch (action.progress) {
            case 'LOAD_CHAPTER_FINISH':
              return Object.assign({}, state, {
                chapters: action.chapters
              });
            
            default:
              return state;
          }

        case 'SUCCESS':
          return Object.assign({}, state, {
            content: action.content
          });

        default:
          return state;
      }
    
    case LOAD_CHAPTER_CONTENT:
      switch (action.status) {
        case 'SUCCESS':
          return Object.assign({}, state, {
            content: action.content,
            currentChapterIndex: action.chapterIndex
          });

        default:
          return state;
      }

    default:
      return state;
  }
};

export const NovelApp = combineReducers({
  search,
  novel,
  read
});