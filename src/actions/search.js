import { NOVEL_SEARCH } from '../values/api';

// 改变搜索关键词类型
export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';

export const changeKeyword = keyword => {
  return {
    type: CHANGE_KEYWORD,
    keyword
  };
};

// 搜索小说
export const SEARCH_NOVEL = 'SEARCH_NOVEL';

export const searchNovel = keyword => {
  return dispatch => {
    dispatch({
      type: SEARCH_NOVEL
    });

    fetch(`${NOVEL_SEARCH}?query=${keyword}&start=0&limit=10`)
      .then(response => response.json())
      .then(response => {
        if (!response.ok) {
          throw new Error('接口出错');
        }

        dispatch({
          type: SEARCH_NOVEL,
          status: 'SUCCESS',
          novelList: response.books.map(book => {
            return Object.assign({}, book, {
              shortIntro: book.shortIntro.length > 30 ? book.shortIntro.substring(0, 30) + ' ...' : book.shortIntro
            });
          })
        });
      })
      .catch(err => {
        dispatch({
          type: SEARCH_NOVEL,
          status: 'FAILED',
          error: err
        });
      });
  };
};

// 清空搜索
export const CLEAN_SEARCH = 'CLEAN_SEARCH';

export const cleanSearch = () => {
  return {
    type: CLEAN_SEARCH
  }
};