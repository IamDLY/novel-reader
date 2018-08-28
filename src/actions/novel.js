import { NOVEL_DETAILS } from '../values/api';

// 载入小说详情
export const LOAD_NOVEL_DETAILS = 'LOAD_NOVEL_DETAILS';

export const loadNovelDetails = (novelID) => {
  return dispatch => {
    dispatch({
      type: LOAD_NOVEL_DETAILS
    });

    fetch(`${NOVEL_DETAILS}/${novelID}`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: LOAD_NOVEL_DETAILS,
          status: 'SUCCESS',
          novel: response
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_NOVEL_DETAILS,
          status: 'FAILED',
          error: err
        });
      });
  };
};
