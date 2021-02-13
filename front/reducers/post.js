export const initialState = {
  mainPosts: [{ // 더미데이터
    id: 1,
    date: '2021-02-12', // 일기 작성날짜 (현재 날짜 아님 선택 날짜)
    User: {
      id: 1,
      nickname: '김형진',
    },
    content: '게시글 더미데이터 입니다.'
  }, { // 더미데이터
    id: 2,
    date: '2021-02-13', // 일기 작성날짜 (현재 날짜 아님 선택 날짜)
    User: {
      id: 1,
      nickname: '김형진',
    },
    content: '게시글 더미데이터 입니다2.'
  }],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;