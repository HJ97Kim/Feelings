/* eslint-disable no-undef */
/* eslint-disable no-multi-assign */
export const initialState = {
  mainPosts: [{ // 더미데이터
    id: 1,
    date: '2021-02-12', // 일기 작성날짜 (현재 날짜 아님 선택 날짜)
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
  User: {
    id: 1,
    nickname: '김형진',
  },
  content: data.content,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
