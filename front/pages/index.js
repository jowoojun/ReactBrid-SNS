import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../src/PostForm';
import PostCard from '../src/PostCard';
import AppLayout from '../src/AppLayout';

import { loadPostRequestAction } from '../reducers/post';
import { loadUserRequestAction } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadUserRequestAction());
    dispatch(loadPostRequestAction());
  }, []);

  useEffect(() => {
    function onScroll() {
      const screen = document.documentElement;
      if (window.scrollY + screen.clientHeight > screen.scrollHeight - 1000) {
        if (hasMorePosts && !loadPostLoading) {
          dispatch(loadPostRequestAction());
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
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
