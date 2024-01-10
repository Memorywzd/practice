import React from 'react';
import { Avatar, Space, Skeleton } from '@arco-design/web-react';
import {
    IconUser, IconCommon,
} from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import {generatePermission} from "@/routes";

interface HeaderProps {
  userInfo?: {
    name?: string;
    avatar?: string;
    role?: string;
    permissions?: object;
    devices?: number[];
  };
  loading?: boolean;
}

function UserInfoHeader(props: HeaderProps) {

  const { userInfo = {}, loading } = props;
  console.log(generatePermission(userInfo.role));
  console.log(userInfo.devices);
  console.log(userInfo.permissions)
  const loadingNode = (
    <Skeleton
      text={{
        rows: 1,
        style: { width: '100px', height: '20px', marginBottom: '-4px' },
        width: ['100%'],
      }}
      animation
    />
  );
  const loadingImgNode = (
    <Skeleton
      text={{ rows: 0 }}
      image={{ style: { width: '64px', height: '64px' }, shape: 'circle' }}
      animation
    />
  );
  return (
    <div className={styles.header}>
      <Space
        size={8}
        direction="vertical"
        align="center"
        className={styles['header-content']}
      >
        {loading ? (
          loadingImgNode
        ) : (
          <Avatar size={64}>
            <img src={userInfo.avatar} />
          </Avatar>
        )}
        <div className={styles.username}>
          {loading ? loadingNode : userInfo.name}
        </div>
        <div className={styles['user-msg']}>
            <Space size={8} align="center">
                <IconUser />用户角色{loading ? loadingNode : userInfo.role}
                <IconCommon />拥有的设备id：{loading ? loadingNode : userInfo.devices}
            </Space>
        </div>
      </Space>
    </div>
  );
}

export default UserInfoHeader;
