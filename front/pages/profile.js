import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import AppLayout from '../src/AppLayout';
import FollowList from '../src/FollowList';
import NicknameEditForm from '../src/NicknameEditForm';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me]);

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
          data={me.Followings}
        />
        <FollowList
          header="팔로워 목록"
          data={me.Followers}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
