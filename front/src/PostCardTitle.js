import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { followRequestAction, unfollowRequestAction } from '../reducers/user';

moment.locale('ko');

const PostCardTitle = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = me && me.Followings.find((v) => v.id === post.User.id);

  const onClick = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction({ userId: post.User.id }));
    } else {
      dispatch(followRequestAction({ userId: post.User.id }));
    }
  }, [isFollowing]);

  if (me && me.id !== post.User.id) {
    return (
      <>
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}
        >
          <div>
            <Link href={`/user/${post.User.id}`}><div>{post.User.nickname}</div></Link>
            <p style={{ color: 'lightgray', padding: 0, margin: 0 }}>{moment(post.createdAt).fromNow()}</p>
          </div>
          <Button
            onClick={onClick}
            loading={followLoading || unfollowLoading}
          >
            {isFollowing ? '언팔로우' : '팔로우'}
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <Link href={`/user/${post.User.id}`}><div>{post.User.nickname}</div></Link>
      <p style={{ color: 'lightgray', padding: 0, margin: 0 }}>{moment(post.createdAt).fromNow()}</p>
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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCardTitle;
