import React from 'react';
import { Carousel } from '@arco-design/web-react';
import styles from './style/index.module.less';

export default function LoginBanner() {
  return (
      <Carousel className={styles.carousel} animation="fade">
        <div key={`0`}>
          <div className={styles['carousel-item']}>
            <img
                alt="banner-image"
                className={styles['carousel-image']}
                src='http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png'
            />
          </div>
        </div>
      </Carousel>
);
}
