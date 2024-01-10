import React from 'react';
import { useSelector } from 'react-redux';
import UserInfoHeader from './header';
import './mock';

function UserInfo() {
  const userInfo = useSelector((state: any) => state.userInfo);
  const loading = useSelector((state: any) => state.userLoading);

  return (
    <div>
      <UserInfoHeader userInfo={userInfo} loading={loading} />
    </div>
  );
}

export default UserInfo;
