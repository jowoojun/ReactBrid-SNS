import produce from 'immer';

export const initialState = {
  loadUserLoading: false, // 사용자 정보 갱신 시도중
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

// 사용자 정보 갱신
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// 팔로우
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
// 언팔로우
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loadUserRequestAction = () => ({
  type: LOAD_USER_REQUEST,
});

export const signUpRequestAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const followRequestAction = (data) => ({
  type: FOLLOW_REQUEST,
  data,
});

export const unfollowRequestAction = (data) => ({
  type: UNFOLLOW_REQUEST,
  data,
});

// const dummyUser = (data) => ({
//   ...data,
//   id: 1,
//   nickname: '리라리',
//   Posts: [],
//   Followings: [{ id: 'OPSF', nickname: '잇섭' }, { id: 'TEFD', nickname: '스티브' }],
//   Followers: [
//     { id: 'OSK2', nickname: '철수' }, { id: 'BVVD', nickname: '영희' },
//     { id: 'GDAE', nickname: '맹구' }, { id: 'YRHF', nickname: '순희' }],
// });

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
  case LOAD_USER_REQUEST: {
    draft.loadUserLoading = true;
    draft.loadUserError = null;
    draft.loadUserDone = false;
    break;
  }
  case LOAD_USER_SUCCESS: {
    draft.loadUserLoading = false;
    draft.me = action.data;
    draft.loadUserDone = true;
    break;
  }
  case LOAD_USER_FAILURE: {
    draft.loadUserLoading = false;
    draft.loadUserError = action.error;
    break;
  }
  case LOG_IN_REQUEST: {
    draft.logInLoading = true;
    draft.logInError = null;
    draft.logInDone = false;
    break;
  }
  case LOG_IN_SUCCESS: {
    draft.logInLoading = false;
    draft.me = action.data;
    draft.logInDone = true;
    break;
  }
  case LOG_IN_FAILURE: {
    draft.logInLoading = false;
    draft.logInError = action.error;
    break;
  }
  case LOG_OUT_REQUEST: {
    draft.logOutLoading = true;
    draft.logOutError = null;
    draft.logOutDone = false;
    break;
  }
  case LOG_OUT_SUCCESS: {
    draft.logOutLoading = false;
    draft.logOutDone = true;
    draft.me = null;
    break;
  }
  case LOG_OUT_FAILURE: {
    draft.logOutLoading = false;
    draft.logOutError = action.error;
    break;
  }
  case SIGN_UP_REQUEST: {
    draft.signUpLoading = true;
    draft.signUpError = null;
    draft.signUpDone = false;
    break;
  }
  case SIGN_UP_SUCCESS: {
    draft.signUpLoading = false;
    draft.signUpDone = true;
    break;
  }
  case SIGN_UP_FAILURE: {
    draft.signUpLoading = false;
    draft.signUpError = action.error;
    break;
  }
  case FOLLOW_REQUEST: {
    draft.followLoading = true;
    draft.followError = null;
    draft.followDone = false;
    break;
  }
  case FOLLOW_SUCCESS: {
    draft.followLoading = false;
    draft.followDone = true;
    draft.me.Followings.push(action.data);
    break;
  }
  case FOLLOW_FAILURE: {
    draft.followLoading = false;
    draft.followError = action.error;
    break;
  }
  case UNFOLLOW_REQUEST: {
    draft.unfollowLoading = true;
    draft.unfollowError = null;
    draft.unfollowDone = false;
    break;
  }
  case UNFOLLOW_SUCCESS: {
    draft.unfollowLoading = false;
    draft.unfollowDone = true;
    const userIndex = draft.me.Followings.findIndex((v) => v.id === action.data.id);
    draft.me.Followings.splice(userIndex, 1);
    break;
  }
  case UNFOLLOW_FAILURE: {
    draft.unfollowLoading = false;
    draft.unfollowError = action.error;
    break;
  }
  case ADD_POST_TO_ME: {
    draft.me.Posts.unshift({ id: action.data });
    break;
  }
  case REMOVE_POST_OF_ME: {
    draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data.postId);
    break;
  }
  default:
    break;
  }
});
