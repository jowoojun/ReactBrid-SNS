import React, { useCallback } from 'react';
import { Button, Card, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { logoutAction } from '../reducers/user';

const UserProfile = ({setIsLoggedIn}) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutAction);
  }, []);

  return(
    <Card actions={[
      <div key="tiwt">쨱짹<br />0</div>,
      <div key="followings">팔로잉<br />0</div>,
      <div key="followers">팔로워<br />0</div>,
    ]}>
      <Card.Meta
        avatar={<Avatar>JW</Avatar>}
        title="woojun" />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile;