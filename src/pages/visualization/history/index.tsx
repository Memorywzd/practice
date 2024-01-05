import React, {useState} from 'react';
import {Select, Card, Message, Space, Button, Grid, Typography} from '@arco-design/web-react';
import PeriodLine from '@/components/Chart/period-legend-line';
import axios from 'axios';
import './mock';

const { Row, Col } = Grid;
const Option = Select.Option;
const areas = ['区域1', '区域2', '区域3', '区域4'];
const nodes = ['结点1', '结点2', '结点3', '结点4'];
const fields = ['温度', '湿度', '大气压', '光照强度', '二氧化碳浓度', '风速', '土壤湿度', '水质pH值', '能见度'];

export default function History() {
    const [chartData, setChartData] = useState([]);

    const getChartData = async () => {
        const { data } = await axios
            .get('/api/datagram/history')
        setChartData(data);
    }

    return (
        <div>
            <Card>
                <Space size='large'>
                    <Select placeholder='选择区域号' style={{width: 154}}>
                        {areas.map((option, index) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                    <Select placeholder='选择结点号' style={{width: 154}}>
                        {nodes.map((option, index) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                    <Select placeholder='选择数据字段' style={{width: 154}}>
                        {fields.map((option, index) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                    <Button type='primary' onClick={getChartData}>查询</Button>
                </Space>
            </Card>
            <br/>
            <Card>
                <Typography.Title heading={6}>时段数据分析</Typography.Title>
                <PeriodLine data={chartData} loading={false}/>
            </Card>
        </div>
    );
}