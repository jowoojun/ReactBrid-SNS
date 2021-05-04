import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';

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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20).fill().map(() => ({
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      src: faker.image.image(),
    }],
    Comments: [{
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
  })),
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
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

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
  case ADD_POST_REQUEST: {
    draft.addPostLoading = true;
    draft.addPostDone = false;
    draft.addPostError = null;
    break;
  }
  case ADD_POST_SUCCESS: {
    draft.mainPosts.unshift(dummyPost(action.data));
    draft.addPostLoading = false;
    draft.addPostDone = true;
    break;
  }
  case ADD_POST_FAILURE: {
    draft.addPostLoading = false;
    draft.addPostError = action.error;
    break;
  }
  case REMOVE_POST_REQUEST: {
    draft.removePostLoading = true;
    draft.removePostDone = false;
    draft.removePostError = null;
    break;
  }
  case REMOVE_POST_SUCCESS: {
    draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.postId);
    draft.removePostLoading = false;
    draft.removePostDone = true;
    break;
  }
  case REMOVE_POST_FAILURE: {
    draft.removePostLoading = false;
    draft.removePostError = action.error;
    break;
  }
  case ADD_COMMENT_REQUEST: {
    draft.addCommentLoading = true;
    draft.addCommentDone = false;
    draft.addCommentError = null;
    break;
  }
  case ADD_COMMENT_SUCCESS: {
    const post = draft.mainPosts.find((v) => v.id === action.data.postId);
    post.Comments.unshift(dummyComment(action.data.content));
    draft.addCommentLoading = false;
    draft.addCommentDone = true;
    break;
  }
  case ADD_COMMENT_FAILURE: {
    draft.addCommentLoading = false;
    draft.addCommentError = action.error;
    break;
  }
  default:
    break;
  }
});
