import React from 'react';
import { useSelector } from 'react-redux';

import PostForm from '../src/PostForm';
import PostCard from '../src/PostCard';
import AppLayout from '../src/AppLayout';

const Home = () => {
  const { logInDone } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  return (
    <AppLayout>
      {logInDone && <PostForm />}
      {mainPosts.map((post) => {
        return (
          <PostCard key={post.id} post={post} />
        );
      })}
    </AppLayout>
  );
};

export default Home;