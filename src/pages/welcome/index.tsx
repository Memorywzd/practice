import React from 'react';
import { Alert, Card, Link, Typography, Tag } from '@arco-design/web-react';
import { IconDoubleRight } from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import styles from './style/index.module.less';
import useStorage from "@/utils/useStorage";

export default function Welcome() {
  const userInfo = useSelector((state: any) => state.userInfo) || {};
  const [userRole] = useStorage('userRole');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          欢迎
        </Typography.Title>
        <Typography.Text type="secondary">
          {userRole === 'admin' ? '管理员' : '普通用户'}用户 {userInfo.name}，欢迎使用智能监测系统！
        </Typography.Text>
      </div>
      <div>
        <Card style={{ marginTop: 20 }} title={"使用"}>
          <Typography.Title heading={6}>
            1. “设备管理”页
          </Typography.Title>
          <Typography.Text>
            设备管理功能包括，设置设备的监测数据代表的物理意义和物理量的换算方式。
          </Typography.Text>

          <Typography.Title heading={6} style={{ marginTop: 20 }}>
            2. “数据可视化”页
          </Typography.Title>
          <Typography.Text>
            <p>1）查看具体设备的实时监测数据，展示数据方式为具体数值；</p>
            <p>2）查看具体设备的历史数据，选择具体设备，具体字段在具体时间段内的监测数据，展示数据方式包括表格展示，折线图表示，直方图表示。</p>
          </Typography.Text>

          <Typography.Title heading={6} style={{ marginTop: 20 }}>
            3. “数据下载”页
          </Typography.Title>
          <Typography.Text>
            以excel文件下载由指定节点、指定时间段产生的数据。
          </Typography.Text>
        </Card>
      </div>
    </div>
  );
}
