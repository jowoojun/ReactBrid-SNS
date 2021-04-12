import Head from 'next/head'
import { useSelector } from 'react-redux';

import AppLayout from '../src/AppLayout'
import FollowList from '../src/FollowList'
import NicknameEditForm from '../src/NicknameEditForm'

const Profile = () => {
  const { isLoggedIn } = useSelector(state => state.user);

  const followerList = [{nickname: "바보"}, {nickname: "바보"}, {nickname: "바보"}, {nickname: "바보"}]
  const followingList = [{nickname: "바보"}, {nickname: "바보"}, {nickname: "바보"}, {nickname: "바보"}]
  return(
    <>
      <Head>
        <title>내 프로필 | Rwitter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followingList}
        />
        <FollowList
          header="팔로워 목록"
          data={followerList}
        />
      </AppLayout>
    </>
  )
}

export default Profile