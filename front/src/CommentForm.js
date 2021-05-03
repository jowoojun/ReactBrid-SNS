import { Form, Button, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { addCommentRequestAction } from '../reducers/post';

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const id = useSelector((state) => (state.user.me ? state.user.me.id : null));
  const { addPostLoading, addCommentDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(() => {
    dispatch(addCommentRequestAction({
      content: commentText,
      postId: post.id,
      userId: id,
    }));
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmit}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button
          style={{
            position: 'absolute', right: 0, bottom: -40, zIndex: 5000,
          }}
          type="primary"
          htmlType="submit"
          loading={addPostLoading}
        >
          삐약!
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
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

export default CommentForm;
