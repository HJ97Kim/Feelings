import produce from 'immer';

export const initialState = {
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false, // 유저 정보 가져오기 성공
  loadMyInfoError: null, // 유저 정보 가져오기 실패
  logInLoading: false, // 로그인 시도중
  logInDone: false, // 로그인 성공
  logInError: null, // 로그인 실패
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false, // 로그아웃 성공
  logOutError: null, // 로그아웃 실패
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false, // 회원가입 성공
  signUpError: null, // 회원가입 실패
  uploadImageLoading: false, // 프로필 사진 업로드 시도중
  uploadImageDone: false, // 프로필 사진 업로드 성공
  uploadImageError: null, // 프로필 사진 업로드 실패
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false, // 닉네임 변경 성공
  changeNicknameError: null, // 닉네임 변경 실패
  changeProfileImgLoading: false, // 프로필 이미지 변경 시도중
  changeProfileImgDone: false, // 프로필 이미지 변경 성공
  changeProfileImgError: null, // 프로필 이미지 변경 실패
  me: null,
  signUpData: {},
  loginData: {},
  profileImagePaths: [], // 프로필 이미지 저장경로
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const CHANGE_PROFILE_IMG_REQUEST = 'CHANGE_PROFILE_IMG_REQUEST';
export const CHANGE_PROFILE_IMG_SUCCESS = 'CHANGE_PROFILE_IMG_SUCCESS';
export const CHANGE_PROFILE_IMG_FAILURE = 'CHANGE_PROFILE_IMG_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      draft.signUpDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = true;
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = action.data;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      draft.profileImagePaths = [];
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case UPLOAD_IMAGE_REQUEST:
      draft.uploadImageLoading = true;
      draft.uploadImageDone = false;
      draft.uploadImageError = null;
      break;
    case UPLOAD_IMAGE_SUCCESS:
      draft.profileImagePaths = action.data;
      draft.uploadImageLoading = false;
      draft.uploadImageDone = true;
      break;
    case UPLOAD_IMAGE_FAILURE:
      draft.uploadImageLoading = false;
      draft.uploadImageError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameError = null;
      draft.changeNicknameDone = false;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.me.nickname = action.data.nickname;
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case CHANGE_PROFILE_IMG_REQUEST:
      draft.changeProfileImgLoading = true;
      draft.changeProfileImgError = null;
      draft.changeProfileImgDone = false;
      break;
    case CHANGE_PROFILE_IMG_SUCCESS:
      draft.me.img = action.data.img;
      draft.changeProfileImgLoading = false;
      draft.changeProfileImgDone = true;
      break;
    case CHANGE_PROFILE_IMG_FAILURE:
      draft.changeProfileImgLoading = false;
      draft.changeProfileImgError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;
