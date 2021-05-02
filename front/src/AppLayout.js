import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Input, Menu, Row, Col,
} from 'antd';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginFrom from './LoginFrom';

const SearchInput = styled(Input.Search)`
  verticalAlign: "middle"
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginFrom /> }
        </Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}>
          <a href="https://jun0127.tistory.com/" target="_blank" rel="noopener noreferrer">Made by Woojun</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.defaultPropTypes = {
  children: PropTypes.node.isRequired,
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
