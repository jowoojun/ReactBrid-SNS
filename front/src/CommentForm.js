import { Form, Button, Input } from 'antd';
import React, { useCallback, useState } from 'react';

const CommentForm = () => {
  const [commentText, setCommentText] = useState('');

  const onSubmit = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

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
        >
          삐약!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
