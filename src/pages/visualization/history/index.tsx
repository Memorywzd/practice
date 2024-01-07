import React, {useEffect, useState} from 'react';
import {Select, Tag, Card, Space, Button, Typography} from '@arco-design/web-react';
import PeriodLine from '@/components/Chart/period-legend-line';
import axios from 'axios';
import './mock';

const api = 'http://bj.memorywzd.tk:9308';

const Option = Select.Option;
const fields = ['温度', '湿度', '大气压', '光照强度', '二氧化碳浓度', '风速', '土壤湿度', '水质pH值', '能见度'];

export default function History() {
    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);

    const [chartData, setChartData] = useState([]);
    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const [field, setField] = useState(1);

    const getChartData = async () => {
        const response = await axios
            .get(api + '/api/dev/history', {
                params: {
                    areaID : area,
                    nodeID : node,
                    data: field,
                },
            })
        setChartData(response.data);
    }

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
        <div>
            <Card>
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
                    数据字段
                    <Select placeholder='选择数据字段' onChange={setField} style={{width: 154}}>
                        {fields.map((option, index) => (
                            <Option key={option} value={index + 1}>
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