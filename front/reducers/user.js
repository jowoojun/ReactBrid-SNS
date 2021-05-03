export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

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

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

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

const dummyUser = (data) => ({
  ...data,
  id: 1,
  nickname: '리라리',
  Posts: [],
  Followings: [{ nickname: '잇섭' }, { nickname: '스티브' }],
  Followers: [{ nickname: '철수' }, { nickname: '영희' }, { nickname: '맹구' }, { nickname: '순희' }],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case LOG_IN_REQUEST:
    return {
      ...state,
      logInLoading: true,
      logInError: null,
      logInDone: false,
    };
  case LOG_IN_SUCCESS:
    return {
      ...state,
      logInLoading: false,
      me: dummyUser(action.data),
      logInDone: true,
    };
  case LOG_IN_FAILURE:
    return {
      ...state,
      logInLoading: false,
      logInError: action.error,
    };
  case LOG_OUT_REQUEST:
    return {
      ...state,
      logOutLoading: true,
      logOutError: null,
      logOutDone: false,
    };
  case LOG_OUT_SUCCESS:
    return {
      ...state,
      logOutLoading: false,
      logOutDone: true,
      me: null,
    };
  case LOG_OUT_FAILURE:
    return {
      ...state,
      logOutLoading: false,
      logOutError: action.error,
    };
  case SIGN_UP_REQUEST:
    return {
      ...state,
      signUpLoading: true,
      signUpError: null,
      signUpDone: false,
    };
  case SIGN_UP_SUCCESS:
    return {
      ...state,
      signUpLoading: false,
      signUpDone: true,
    };
  case SIGN_UP_FAILURE:
    return {
      ...state,
      signUpLoading: false,
      signUpError: action.error,
    };
  case ADD_POST_TO_ME:
    return {
      ...state,
      me: {
        ...state.me,
        Posts: [{ id: action.data }, ...state.me.Posts],
      },
    };
  case REMOVE_POST_OF_ME:
    return {
      ...state,
      me: {
        ...state.me,
        Posts: state.me.Posts.filter((v) => v.id !== action.data.postId),
      },
    };
  default:
    return {
      ...state,
    };
  }
};

export default reducer;
