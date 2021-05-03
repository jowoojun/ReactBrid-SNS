import shortid from 'shortid';

export const initialState = {
  mainPosts: [{
    id: 'DNAKSF',
    User: {
      id: 2,
      nickname: '미라리',
    },
    content: '이것은 더미데이터입니다.#해시테그 #익스프레스',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
    Comments: [{
      User: {
        nickname: '하로',
      },
      content: '뭐? 개정판이 나왔다구?',
    }, {
      User: {
        nickname: '세나',
      },
      content: '이 게임 얼른 현질 하고싶어요~',
    }],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '리라',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '루리라',
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_POST_REQUEST: {
    return {
      ...state,
      addPostLoading: true,
      addPostDone: false,
      addPostError: null,
    };
  }
  case ADD_POST_SUCCESS: {
    return {
      ...state,
      mainPosts: [dummyPost(action.data), ...state.mainPosts],
      addPostLoading: false,
      addPostDone: true,
    };
  }
  case ADD_POST_FAILURE: {
    return {
      ...state,
      addPostLoading: false,
      addPostError: action.error,
    };
  }
  case ADD_COMMENT_REQUEST: {
    return {
      ...state,
      addCommentLoading: true,
      addCommentDone: false,
      addCommentError: null,
    };
  }
  case ADD_COMMENT_SUCCESS: {
    const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
    const post = state.mainPosts[postIndex];
    post.Comments = [dummyComment(action.data.content), ...post.Comments];
    const mainPosts = [...state.mainPosts];
    mainPosts[postIndex] = post;
    return {
      ...state,
      mainPosts,
      addCommentLoading: false,
      addCommentDone: true,
    };
  }
  case ADD_COMMENT_FAILURE: {
    return {
      ...state,
      addCommentLoading: false,
      addCommentError: action.error,
    };
  }
  default:
    return {
      ...state,
    };
  }
};
