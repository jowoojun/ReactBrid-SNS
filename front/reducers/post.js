export const initialState = {
  mainPosts: [{
    id: 1,
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
    }]
  }],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '이것은 더미데이터입니다.',
  User: {
    id: 1,
    nickname: '리라',
  },
  Images: [],
  Comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};