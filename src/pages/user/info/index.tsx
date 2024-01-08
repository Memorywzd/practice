import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserInfoHeader from './header';
import './mock';
import { Card } from '@arco-design/web-react';
import {generatePermission} from "@/routes";

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
