import PropTypes from 'prop-types'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { Input, Form, Button } from 'antd'
import styled from '@emotion/styled'


const ButtonWapper = styled.div`
  margin-top: 10px
`

const FormWapper = styled(Form)`
  padding: 10px
`

const LoginFrom = ({ setIsLoggedIn }) => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, [])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [])
 
  const onsubmitForm = useCallback((e) => {
    console.log(id, password)
    setIsLoggedIn(true)
  }, [id, password])
  
  return(
    <FormWapper onFinish={onsubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} requried="true" />
      </div>
      <div>
        <label htmlFor="user-id">비밀번호</label>
        <br />
        <Input type="password" name="user-password" value={password} onChange={onChangePassword} requried="true" />
      </div>
      <ButtonWapper>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><button>SignUp</button></a></Link>
      </ButtonWapper>
    </FormWapper>
  )
}

LoginFrom.propTypes = {
  
}

export default LoginFrom;