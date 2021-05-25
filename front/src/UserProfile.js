import React, { useCallback } from 'react';
import { Button, Card, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card actions={[
      <Link href={`/user/${me.id}`}>
        <div key="tiwt">
          쨱짹
          <br />
          { me.Posts.length}
        </div>
      </Link>,
      <Link href="/profile">
        <div key="followings">
          팔로잉
          <br />
          { me.Followings.length }
        </div>
      </Link>,
      <Link href="/profile">
        <div key="followers">
          팔로워
          <br />
          { me.Followers.length }
        </div>
      </Link>,
    ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
