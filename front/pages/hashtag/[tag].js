import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HASHTAG_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import AppLayout from '../../src/AppLayout';
import PostCard from '../../src/PostCard';

const Hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const {
    mainPosts, hasMorePosts, loadPostLoading,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    function onScroll() {
      const screen = document.documentElement;
      if (window.scrollY + screen.clientHeight > screen.scrollHeight - 1000) {
        if (hasMorePosts && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_HASHTAG_POST_REQUEST,
            data: {
              tag,
              lastId,
              limit: 10,
            },
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);

  return (
    <AppLayout>
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HASHTAG_POST_REQUEST,
    data: {
      limit: 10,
      tag: context.params.tag,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Hashtag;
