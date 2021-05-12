import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = 'http://localhost:3080/api';
// 쿠키도 같이 전달하고 싶으면 true로 해야함. 쿠키 사용시 true 안하면 401에러가 뜸.
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
