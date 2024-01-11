import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Tabs } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import InfoHeader from './header';
import InfoForm from './info';
import Security from './security';
import './mock';
import Verified from './verified';

function UserInfo() {
  const userInfo = useSelector((state: any) => state.userInfo);
  const loading = useSelector((state: any) => state.userLoading);
  const [activeTab, setActiveTab] = useState('basic');
  return (
    <div>
      <Card style={{ marginTop: '16px' }}>
        <Tabs activeTab={activeTab} onChange={setActiveTab} type="rounded">
          {/* InfoForm是用户添加板块，Security是设备分配板块，没改名字 */}
          <Tabs.TabPane key="basic" title={'用户添加'}>
            <InfoForm loading={loading} />
          </Tabs.TabPane>
          <Tabs.TabPane key="security" title={'设备分配'}>
            <Security />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default UserInfo;
