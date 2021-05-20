import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Input, Form, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';

import { loginRequestAction } from '../reducers/user';

const ButtonWapper = styled.div`
  margin-top: 10px
`;

const FormWapper = styled(Form)`
  padding: 10px
`;

const LoginFrom = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({
      email,
      password,
    }));
  }, [email, password]);

  return (
    <>
      <FormWapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">아이디</label>
          <br />
          <Input type="email" name="user-email" value={email} onChange={onChangeEmail} requried="true" />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input type="password" name="user-password" value={password} onChange={onChangePassword} requried="true" />
        </div>
        <ButtonWapper>
          <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
          <Link href="/signup"><button type="button">SignUp</button></Link>
        </ButtonWapper>
      </FormWapper>
    </>
  );
};

LoginFrom.propTypes = {

};

export default LoginFrom;
