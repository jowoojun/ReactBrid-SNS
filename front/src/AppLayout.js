import react from 'react'
import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Input, Menu, Row, Col } from 'antd'

import UserProfile from './UserProfile'
import LoginFrom from './LoginFrom'

const SearchInput = styled(Input.Search)`
  verticalAlign: "middle"
`

const AppLayout = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6} >
          {isLoggedIn? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginFrom setIsLoggedIn={setIsLoggedIn}/> }
        </Col>
        <Col xs={24} md={12} >{children}</Col>
        <Col xs={24} md={6} >
          <a href="https://jun0127.tistory.com/" target="_blank" rel="norefferer noopener">Made by Woojun</a>
        </Col>
      </Row>
    </div>
  )
}


AppLayout.proTypes = {
  children: PropTypes.node.isRequired
}

export default AppLayout