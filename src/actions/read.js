import { NOVEL_SOURCE, NOVEL_CHAPTER } from '../values/api';

// 获取小说内容
export const LOAD_NOVEL_DATA = 'LOAD_NOVEL_CONTENT';

export const loadNovelData = (novelID, chapterIndex = 0) => {
  return dispatch => {
    dispatch({
      type: LOAD_NOVEL_DATA
    });

    // 获取书源信息
    fetch(`${NOVEL_SOURCE}?view=summary&book=${novelID}`)
      .then(response => response.json())
      .then(response => {
        // 过滤掉优质书源和笔趣阁书源
        let sourceList = Array.from(response).filter(item => item.name !== '优质书源' && item.name !== '笔趣阁');
        
        dispatch({
          type: LOAD_NOVEL_DATA,
          status: 'PENDING',
          progress: 'LOAD_SOURCE_FINISH',
          novelSourceList: sourceList
        });

        // 获取第一书源的章节信息
        return fetch(`${NOVEL_SOURCE}/${sourceList[0]._id}?view=chapters`);
      })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: LOAD_NOVEL_DATA,
          status: 'PENDING',
          progress: 'LOAD_CHAPTER_FINISH',
          chapters: response.chapters
        });

        // 获取指定章节内容
        return fetch(`${NOVEL_CHAPTER}/${encodeURIComponent(response.chapters[chapterIndex].link)}?k=2124b73d7e2e1945&t=1468223717`);
      })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          dispatch({
            type: LOAD_NOVEL_DATA,
            status: 'SUCCESS',
            content: (response.chapter.body + '').replace(/\n/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;')
          });
        } else {
          dispatch({
            type: LOAD_NOVEL_DATA,
            status: 'FAILED',
            error: new Error('接口出错')
          });
        }
      })
      .catch(err => {
        dispatch({
          type: LOAD_NOVEL_DATA,
          status: 'FAILED',
          error: err
        });
      });
  };
};

export const LOAD_CHAPTER_CONTENT = 'LOAD_CHAPTER_CONTENT';

export const loadChapterContent = (chapterIndex, chapterLink) => {
  return dispatch => {
    dispatch({
      type: LOAD_CHAPTER_CONTENT
    });

    fetch(`${NOVEL_CHAPTER}/${encodeURIComponent(chapterLink)}?k=2124b73d7e2e1945&t=1468223717`)
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          dispatch({
            type: LOAD_CHAPTER_CONTENT,
            status: 'SUCCESS',
            chapterIndex: chapterIndex,
            content: (response.chapter.body + '').replace(/\n/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;')
          });
        }
      })
      .catch(err => {
        dispatch({
          type: LOAD_CHAPTER_CONTENT,
          status: 'FAILED',
          error: err
        });
      });
  };
};