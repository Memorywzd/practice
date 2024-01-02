import React from 'react';
import { Layout } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import cs from 'classnames';
import styles from './style/index.module.less';

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props;
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
        数据实时监测与展示系统-前端子系统 ©2024 Created by Memorywzd using Arco Design Pro
    </Layout.Footer>
  );
}

export default Footer;
