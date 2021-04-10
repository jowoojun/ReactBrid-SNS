import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import { Button, Card, Avatar } from 'antd';

const UserProfile = ({setIsLoggedIn}) => {

  const onLogOut = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  return(
    <Card actions={[
      <div key="tiwt">쨱짹<br />0</div>,
      <div key="followings">팔로잉<br />0</div>,
      <div key="followers">팔로워<br />0</div>,
    ]}>
      <Card.Meta
        avatar={<Avatar>JW</Avatar>}
        title="woojun" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  )
}

UserProfile.propTypes = {
  
}

export default UserProfile;