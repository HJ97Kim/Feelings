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
  }, { // 더미데이터
    id: 2,
    date: '2021-02-13', // 일기 작성날짜 (현재 날짜 아님 선택 날짜)
    User: {
      id: 1,
      nickname: '김형진',
    },
    content: '게시글 더미데이터 입니다2.',
  }],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPost = (data) = ({
  type: ADD_POST_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  date: '2021-02-14',
  content: '게시글 더미데이터 입니다3.',
  User: {
    id: 1,
    nickname: '김형진',
  },
};

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
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
