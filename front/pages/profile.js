import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../src/AppLayout';
import FollowList from '../src/FollowList';
import NicknameEditForm from '../src/NicknameEditForm';

import { loadFollowersRequestAction, loadFollowingsRequestAction } from '../reducers/user';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(me && me.id)) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch(loadFollowingsRequestAction());
    dispatch(loadFollowersRequestAction());
  }, []);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | Rwitter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          type="followings"
          data={me.Followings}
        />
        <FollowList
          header="팔로워 목록"
          type="followers"
          data={me.Followers}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
