import React, {useEffect, useState} from 'react';

import {Radio, Tabs, Card, Typography, Form, Input, Select, Button, Space} from '@arco-design/web-react';
import styles from "@/pages/welcome/style/index.module.less";
import useStorage from '@/utils/useStorage';
import axios from "axios";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const api = 'http://bj.memorywzd.tk:9308';

export default function Management() {
    // 温度、湿度、大气压、光照强度、二氧化碳浓度、风速、土壤湿度、水质pH值、能见度
    const [temp, setTemp] = useStorage('temperature', 'Celsius');
    const [humidity, setHumidity] = useStorage('humidity', 'percent');
    const [pressure, setPressure] = useStorage('pressure', 'kPa');
    const [light, setLight] = useStorage('light', 'lux');
    const [co2, setCo2] = useStorage('co2', 'ppm');
    const [windSpeed, setWindSpeed] = useStorage('windSpeed', 'm/s');
    const [soilHumidity, setSoilHumidity] = useStorage('soilHumidity', 'percent');
    const [ph, setPh] = useStorage('ph', 'pH');
    const [visibility, setVisibility] = useStorage('visibility', 'm');

    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const [field, setField] = useState(1);

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
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography.Text type="secondary">
                    设置设备的监测数据代表的物理意义和物理量的换算方式
                </Typography.Text>
            </div>
            <Card style={{marginTop: 20}}>
                <Typography.Paragraph>
                    <Form layout={'horizontal'}>
                        <FormItem label='数据1：温度'>
                            <RadioGroup onChange={setTemp} type='button' defaultValue='Celsius'
                                        name='temperature' value={temp}>
                                <Radio value='Celsius'>摄氏度</Radio>
                                <Radio value='Fahrenheit'>华氏度</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据2：湿度'>
                            <RadioGroup onChange={setHumidity} type='button' defaultValue='percent'
                                        name='humidity' value={humidity}>
                                <Radio value='percent'>相对湿度</Radio>
                                <Radio value='g/m3'>绝对湿度</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据3：大气压'>
                            <RadioGroup onChange={setPressure} type='button' defaultValue='kPa'
                                        name='pressure' value={pressure}>
                                <Radio value='kPa'>千帕</Radio>
                                <Radio value='Pa'>帕斯卡</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据4：光照强度'>
                            <RadioGroup onChange={setLight} type='button' defaultValue='lux'
                                        name='light' value={light}>
                                <Radio value='lux'>勒克斯</Radio>
                                <Radio value='cd/m2'>坎德拉/平方米</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据5：二氧化碳浓度'>
                            <RadioGroup onChange={setCo2} type='button' defaultValue='ppm'
                                        name='co2' value={co2}>
                                <Radio value='ppm'>ppm</Radio>
                                <Radio value='ppmv'>ppmv</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据6：风速'>
                            <RadioGroup onChange={setWindSpeed} type='button' defaultValue='m/s'
                                        name='windSpeed' value={windSpeed}>
                                <Radio value='m/s'>米/秒</Radio>
                                <Radio value='km/h'>千米/小时</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据7：土壤湿度'>
                            <RadioGroup onChange={setSoilHumidity} type='button' defaultValue='percent'
                                        name='soilHumidity' value={soilHumidity}>
                                <Radio value='percent'>体积分数</Radio>
                                <Radio value='g/m3'>质量分数</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据8：水质pH值'>
                            <RadioGroup onChange={setPh} type='button' defaultValue='pH'
                                        name='ph' value={ph}>
                                <Radio value='pH'>pH</Radio>
                                <Radio value='mol/L'>摩尔/升</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label='数据9：能见度'>
                            <RadioGroup onChange={setVisibility} type='button' defaultValue='m'
                                        name='visibility' value={visibility}>
                                <Radio value='m'>米</Radio>
                                <Radio value='km'>千米</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Typography.Paragraph>
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