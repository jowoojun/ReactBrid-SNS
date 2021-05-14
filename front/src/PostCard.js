import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined,
} from '@ant-design/icons';
import {
  Card, Button, Avatar, Popover, List, Comment,
} from 'antd';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardTitle from './PostCardTitle';
import PostCardContent from './PostCardContent';

import { removePostRequestAction, likePostRequestAction, unlikePostRequestAction } from '../reducers/post';

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => (state.user.me ? state.user.me.id : null));
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onDeletePost = useCallback(() => {
    dispatch(removePostRequestAction({ postId: post.id }));
  }, []);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(likePostRequestAction({ postId: post.id }));
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch(unlikePostRequestAction({ postId: post.id }));
  }, [id]);

  const liked = post.Liker.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: '20px' }} key={post.id}>
      <Card
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger" onClick={onDeletePost} loading={removePostLoading}>삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={<PostCardTitle post={post} />}
          description={(
            <div>
              <PostCardContent content={post.content} />
              {post.Images[0] && <PostImages images={post.Images} />}
            </div>
          )}
        />
        {}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
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
    Liker: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
