import produce from 'immer';

export const initialState = {
  mainPosts: [{ // 더미데이터
    id: 1,
    date: '2021-02-12', // 일기 작성날짜 (현재 날짜 아님 선택 날짜)
    feeling: 'soso', // 기분상태
    User: {
      id: 1,
      nickname: '김형진',
    },
    content: '게시글 더미데이터 입니다.',
  }],
  addPostLoading: false, // 게시글 작성 시도중
  addPostDone: false, // 게시글 작성 성공
  addPostError: null, // 게시글 작성 실패
  removePostLoading: false, // 게시글 삭제 시도중
  removePostDone: false, // 게시글 삭제 성공
  removePostError: null, // 게시글 삭제 실패
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

const dummyPost = (data) => ({
  id: data.id,
  date: data.date, // 확인해야함
  feeling: data.feeling,
  User: {
    id: 1,
    nickname: '김형진',
  },
  content: data.content,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
