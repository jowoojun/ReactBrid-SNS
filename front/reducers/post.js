import shortid from 'shortid';
import produce from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
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

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const loadPostRequestAction = () => ({
  type: LOAD_POSTS_REQUEST,
});

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

// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     nickname: '리라',
//   },
//   Images: [],
//   Comments: [],
// });

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
  case LOAD_POSTS_REQUEST: {
    draft.loadPostLoading = true;
    draft.loadPostDone = false;
    draft.loadPostError = null;
    break;
  }
  case LOAD_POSTS_SUCCESS: {
    draft.loadPostLoading = false;
    draft.loadPostDone = true;
    draft.mainPosts = draft.mainPosts.concat(action.data.data);
    draft.hasMorePosts = draft.mainPosts.length < 60;
    // draft.hasMorePosts = action.data.hasMorePosts
    break;
  }
  case LOAD_POSTS_FAILURE: {
    draft.loadPostLoading = false;
    draft.loadPostError = action.error;
    break;
  }
  case ADD_POST_REQUEST: {
    draft.addPostLoading = true;
    draft.addPostDone = false;
    draft.addPostError = null;
    break;
  }
  case ADD_POST_SUCCESS: {
    draft.mainPosts.unshift(action.data);
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
