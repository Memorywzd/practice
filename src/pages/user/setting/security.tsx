import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import cs from 'classnames';
import {Button, Input, Message, Select, Space} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import axios from "axios";

axios.defaults.baseURL = "http://bj.memorywzd.tk:9308";
//axios.defaults.baseURL = 'http://localhost:8080';
const Option = Select.Option;

function Security() {

    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [users, setUsers] = useState([]);

    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const [user, setUser] = useState(1);

    // 获取用户id
    const getUsers = async () => {
        const response = await axios.get('/api/user/userList');
        setUsers(response.data);
    }

    // 获取结点号
    const getNodes = async (areaID: number) => {
        const response = await axios
            .get('/api/dev/nodeList', {
                params: {
                    areaID: areaID,
                },
            });
        setNodes(response.data);
    }

    // 获取区域号
    useEffect(() => {
        const getAreas = async () => {
            const response = await axios.get('/api/dev/areaList');
            setAreas(response.data);
        }
        getAreas();
        getUsers();
    }, []);

    const handleAreaChange = (value) => {
        setArea(value);
        getNodes(value);
        getUsers();
    }

    const allocate = () => {
        axios
            .get('/api/user/allocate', {
                params: {
                    areaID: area,
                    nodeID: node,
                    userID: user,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    Message.success('分配成功');
                } else {
                    Message.error('分配失败');
                }
            })
            .catch(() => {
                Message.error('分配失败');
            });
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
                用户名
                <Select placeholder='选择用户名' onChange={setUser} style={{width: 154}}>
                    {users.map((option) => (
                        <Option key={option.id} value={option.id}>
                            {option.name}
                        </Option>
                    ))}
                </Select>
                <Button type="primary" onClick={allocate}>保存</Button>
            </Space>
        </div>
    );
}

export default Security;
