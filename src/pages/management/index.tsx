import React, {useEffect, useState} from 'react';
import store from "@/store";

import {Card, Typography, Form, Input, Select, Button, Space} from '@arco-design/web-react';
import styles from "@/pages/welcome/style/index.module.less";
import useStorage from '@/utils/useStorage';
import axios from "axios";
import {useSelector} from "react-redux";

const FormItem = Form.Item;
const Option = Select.Option;

const api = 'http://bj.memorywzd.tk:9308';

export default function Management() {
    const unit = useSelector((state: any) => state.unit);
    const factor = useSelector((state: any) => state.factor);
    const adder = useSelector((state: any) => state.adder);

    const [u, setU] = useState([unit]);
    const [f, setF] = useState([factor]);
    const [a, setA] = useState([adder]);

    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const userID = useStorage('userId')[0];

    function onSubmit() {
        console.log(u, f, a);
        store.dispatch({
            type: 'update-unit',
            payload: { unit: u },
        });
        store.dispatch({
            type: 'update-factor',
            payload: { factor: f },
        });
        store.dispatch({
            type: 'update-adder',
            payload: { adder: a },
        });
    }

    const getNodes = async (areaID: number) => {
        const response = await axios
            .get(api + '/api/dev/nodeList', {
                params: {
                    areaID: areaID,
                    userID: userID,
                },
            });
        setNodes(response.data);
    }

    // 获取区域号
    useEffect(() => {
        const getAreas = async () => {
            const response = await axios
                .get(api + '/api/dev/areaList', {
                    params: {
                        userID: userID,
                    },
                });
            setAreas(response.data);
        }
        getAreas();
    }, []);

    const handleAreaChange = (value) => {
        setArea(value);
        getNodes(value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography.Text type="secondary">
                    设置设备的监测数据代表的物理意义、单位及相对原值的线性变化参数
                </Typography.Text>
            </div>
            <Card style={{marginTop: 20}}>
                <Form layout='vertical'>
                    <FormItem>
                        <Space>
                            数据1 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[0] = e;setU([...u]);}}
                                   defaultValue={u[0]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[0]} style={{width: 35}}
                                      onChange={(e) => {f[0] = e;setF([...f]);}}/>
                            x+
                            <Input placeholder='b' defaultValue={a[0]} style={{width: 35}}
                                      onChange={(e) => {a[0] = e;setA([...a]);}}/>
                        </Space>
                    </FormItem>

                    <FormItem>
                        <Button type='primary' onClick={onSubmit}>提交</Button>
                    </FormItem>
                </Form>
            </Card>
            <br/>
            <Card title={'向设备发送管理指令'}>
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
                    <Input placeholder='请输入指令'/>
                    <Button type='primary'>执行</Button>
                </Space>
            </Card>
        </div>
    )
}