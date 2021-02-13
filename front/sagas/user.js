import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data); // call: 동기 함수호출 fork: 비동기 함수호출 back 없기때문에 일단 주석처리
    yield delay(1000);
    yield put({ // put === dispatch
      type: 'LOG_IN_SUCCESS',
      data: action.data,
      // data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn); // log_in_request action 대기하다가 들어오면은 login() 실행
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
  ]);
}