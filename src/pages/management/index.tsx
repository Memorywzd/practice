import React from 'react';

import { Radio, Tabs, Input, Card, Checkbox, Typography, Button, Form } from '@arco-design/web-react';
import styles from "@/pages/welcome/style/index.module.less";
import useStorage from '@/utils/useStorage';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const style = {
    textAlign: 'center',
    marginTop: 20,
};
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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography.Text type="secondary">
                    设置设备的监测数据代表的物理意义和物理量的换算方式
                </Typography.Text>
            </div>
            <Card style={{ marginTop: 20 }}>
                <Tabs defaultActiveTab='1'>
                    <TabPane key='1' title='设备 1'>
                        <Typography.Paragraph>
                            <Form layout={'horizontal'}>
                                <FormItem label='温度' >
                                    <RadioGroup onChange={setTemp} type='button' defaultValue='Celsius'
                                                name='temperature' value={temp}>
                                        <Radio value='Celsius'>摄氏度</Radio>
                                        <Radio value='Fahrenheit'>华氏度</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='湿度'>
                                    <RadioGroup onChange={setHumidity} type='button' defaultValue='percent'
                                                name='humidity' value={humidity}>
                                        <Radio value='percent'>百分比</Radio>
                                        <Radio value='g/m3'>克/立方米</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='大气压'>
                                    <RadioGroup onChange={setPressure} type='button' defaultValue='kPa'
                                                name='pressure' value={pressure}>
                                        <Radio value='kPa'>千帕</Radio>
                                        <Radio value='Pa'>帕斯卡</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='光照强度'>
                                    <RadioGroup onChange={setLight} type='button' defaultValue='lux'
                                                name='light' value={light}>
                                        <Radio value='lux'>勒克斯</Radio>
                                        <Radio value='cd/m2'>坎德拉/平方米</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='二氧化碳浓度'>
                                    <RadioGroup onChange={setCo2} type='button' defaultValue='ppm'
                                                name='co2' value={co2}>
                                        <Radio value='ppm'>ppm</Radio>
                                        <Radio value='mg/m3'>毫克/立方米</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='风速'>
                                    <RadioGroup onChange={setWindSpeed} type='button' defaultValue='m/s'
                                                name='windSpeed' value={windSpeed}>
                                        <Radio value='m/s'>米/秒</Radio>
                                        <Radio value='km/h'>千米/小时</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='土壤湿度'>
                                    <RadioGroup onChange={setSoilHumidity} type='button' defaultValue='percent'
                                                name='soilHumidity' value={soilHumidity}>
                                        <Radio value='percent'>百分比</Radio>
                                        <Radio value='g/m3'>克/立方米</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='水质pH值'>
                                    <RadioGroup onChange={setPh} type='button' defaultValue='pH'
                                                name='ph' value={ph}>
                                        <Radio value='pH'>pH</Radio>
                                        <Radio value='mol/L'>摩尔/升</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem label='能见度'>
                                    <RadioGroup onChange={setVisibility} type='button' defaultValue='m'
                                                name='visibility' value={visibility}>
                                        <Radio value='m'>米</Radio>
                                        <Radio value='km'>千米</Radio>
                                    </RadioGroup>
                                </FormItem>
                                {/*<FormItem
                                    wrapperCol={{
                                        offset: 5,
                                    }}
                                >
                                    <Button type='primary' htmlType='submit'>
                                        保存
                                    </Button>
                                </FormItem>*/}
                            </Form>
                        </Typography.Paragraph>
                    </TabPane>
                    {/*<TabPane key='2' title='设备 2'>
                        <Typography.Paragraph>
                            1
                        </Typography.Paragraph>
                    </TabPane>
                    <TabPane key='3' title='设备 3'>
                        <Typography.Paragraph>
                            Content of Tab Panel 3
                        </Typography.Paragraph>
                    </TabPane>*/}
                </Tabs>
            </Card>
        </div>
    )
}