import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { followRequestAction, unfollowRequestAction } from '../reducers/user';

const PostCardTitle = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = me && me.Followings.find((v) => v.id === post.User.id);

  const onClick = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction(post.User));
    } else {
      dispatch(followRequestAction(post.User));
    }
  }, [isFollowing]);

  return (
    <>
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <div>{post.User.nickname}</div>
        {me && <Button onClick={onClick} loading={followLoading || unfollowLoading}>{isFollowing ? '언팔로우' : '팔로우'}</Button>}
      </div>
    </>
  );
};

PostCardTitle.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.shape({}),
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCardTitle;
