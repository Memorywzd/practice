import React, {useEffect, useState} from 'react';
import store from "@/store";

import {Card, Typography, Form, Input, Select, Button, Space} from '@arco-design/web-react';
import styles from "@/pages/welcome/style/index.module.less";
import useStorage from '@/utils/useStorage';
import axios from "axios";
import {useSelector} from "react-redux";

const FormItem = Form.Item;
const Option = Select.Option;

axios.defaults.baseURL = 'http://bj.memorywzd.tk:9308';

export default function Management() {
    const unit = useSelector((state: any) => state.unit);
    const factor = useSelector((state: any) => state.factor);
    const adder = useSelector((state: any) => state.adder);

    const [u, setU] = useState(unit);
    const [f, setF] = useState(factor);
    const [a, setA] = useState(adder);

    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const userID = useStorage('userId')[0];

    const [comm, setComm] = useState('');

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
            .get('/api/dev/nodeList', {
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
                .get('/api/dev/areaList', {
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

    const handleSendComm = async () => {
        const response = await axios
            .get('/api/dev/sendComm', {
                params: {
                    areaID: area,
                    nodeID: node,
                    comm: comm,
                },
            });
        console.log(response);
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
                                      onChange={(e) => {f[0] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[0]} style={{width: 35}}
                                      onChange={(e) => {a[0] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据2 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[1] = e;setU([...u]);}}
                                   defaultValue={u[1]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[1]} style={{width: 35}}
                                      onChange={(e) => {f[1] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[1]} style={{width: 35}}
                                      onChange={(e) => {a[1] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据3 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[2] = e;setU([...u]);}}
                                   defaultValue={u[2]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[2]} style={{width: 35}}
                                      onChange={(e) => {f[2] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[2]} style={{width: 35}}
                                      onChange={(e) => {a[2] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据4 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[3] = e;setU([...u]);}}
                                   defaultValue={u[3]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[3]} style={{width: 35}}
                                      onChange={(e) => {f[3] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[3]} style={{width: 35}}
                                      onChange={(e) => {a[3] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据5 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[4] = e;setU([...u]);}}
                                   defaultValue={u[4]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[4]} style={{width: 35}}
                                      onChange={(e) => {f[4] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[4]} style={{width: 35}}
                                      onChange={(e) => {a[4] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据6 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[5] = e;setU([...u]);}}
                                   defaultValue={u[5]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[5]} style={{width: 35}}
                                      onChange={(e) => {f[5] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[5]} style={{width: 35}}
                                      onChange={(e) => {a[5] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据7 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[6] = e;setU([...u]);}}
                                   defaultValue={u[6]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[6]} style={{width: 35}}
                                      onChange={(e) => {f[6] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[6]} style={{width: 35}}
                                      onChange={(e) => {a[6] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据8 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[7] = e;setU([...u]);}}
                                   defaultValue={u[7]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[7]} style={{width: 35}}
                                      onChange={(e) => {f[7] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[7]} style={{width: 35}}
                                      onChange={(e) => {a[7] = Number(e);setA(a);}}/>
                        </Space>
                    </FormItem>
                    <FormItem>
                        <Space>
                            数据9 单位
                            <Input placeholder='请输入物理量/单位' onChange={(e) => {u[8] = e;setU([...u]);}}
                                   defaultValue={u[8]}/>
                            线性变化 y=
                            <Input placeholder='k' defaultValue={f[8]} style={{width: 35}}
                                      onChange={(e) => {f[8] = Number(e);setF(f);}}/>
                            x +
                            <Input placeholder='b' defaultValue={a[8]} style={{width: 35}}
                                      onChange={(e) => {a[8] = Number(e);setA(a);}}/>
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
                    <Input placeholder='请输入指令' onChange={setComm}/>
                    <Button type='primary'>执行</Button>
                </Space>
            </Card>
        </div>
    )
}