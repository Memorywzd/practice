import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import cs from 'classnames';
import {Button, Input, Select, Space} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import axios from "axios";
const api = 'http://bj.memorywzd.tk:9308';
const Option = Select.Option;

function Security() {

  const [areas, setAreas] = useState([]);
  const [nodes, setNodes] = useState([]);

  const [area, setArea] = useState(1);
  const [node, setNode] = useState(1);
  const getNodes = async (areaID: number) => {
    const response = await axios
        .get(api + '/api/dev/nodeList', {
          params: {
            areaID: areaID,
          },
        });
    setNodes(response.data);
  }

  // 获取区域号
  useEffect(() => {
    const getAreas = async () => {
      const response = await axios.get(api + '/api/dev/areaList');
      setAreas(response.data);
    }
    getAreas();
  }, []);

  const handleAreaChange = (value) => {
    setArea(value);
    getNodes(value);
  }



  return (
    <div className={styles['security']}>
      <Space size='large'>
        区域号
        <Select placeholder='选择区域号' onChange={handleAreaChange} style={{width: 154}}>
          {areas.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
          ))}
        </Select>
        结点号
        <Select placeholder='选择结点号' onChange={setNode} style={{width: 154}}>
          {nodes.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
          ))}
        </Select>
        用户id
        <Input type="text"/>
        <Button type="primary">保存</Button>
        </Space>
    </div>
  );
}

export default Security;
