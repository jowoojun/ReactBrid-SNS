import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import AppLayout from '../src/AppLayout';
import FollowList from '../src/FollowList';
import NicknameEditForm from '../src/NicknameEditForm';

const Profile = () => {
  const { Followings, Followers } = useSelector((state) => state.user.me);
  return (
    <>
      <Head>
        <title>내 프로필 | Rwitter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={Followings}
        />
        <FollowList
          header="팔로워 목록"
          data={Followers}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
