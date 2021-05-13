import {
  all, delay, put, fork, takeLatest, call,
} from 'redux-saga/effects';
// import shortid from 'shortid';
// import faker from 'faker';
import axios from 'axios';

import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';
import {
  ADD_POST_TO_ME, REMOVE_POST_OF_ME,
} from '../reducers/user';

// 포스트 불러오기
function loadPostAPI() {
  return axios.get('/posts');
  // return {
  //   hasMorePosts: false,
  //   data: Array(data).fill().map(() => ({
  //     id: shortid.generate(),
  //     User: {
  //       id: shortid.generate(),
  //       nickname: faker.name.findName(),
  //     },
  //     content: faker.lorem.paragraph(),
  //     Images: [{
  //       src: faker.image.image(),
  //     }],
  //     Comments: [{
  //       User: {
  //         id: shortid.generate(),
  //         nickname: faker.name.findName(),
  //       },
  //       content: faker.lorem.sentence(),
  //     }],
  //   })),
  // };
}

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    // const result = loadPostAPI(10);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPost);
}

// 포스트 생성하기
function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 포스트 생성하기
// function removePostAPI(data) {
//   return axios.delete(`/api/post/${data.id}`);
// }

function* removePost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// 포스트 생성하기
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
