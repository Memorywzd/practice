import React, {useEffect, useState} from 'react';
import {Select, Card, Space, Button, Typography} from '@arco-design/web-react';
import PeriodLine from '@/components/Chart/period-legend-line';
import axios from 'axios';
import {getUnit} from '@/utils/unitConversion';
import './mock';
import useStorage from "@/utils/useStorage";
import {useSelector} from "react-redux";

axios.defaults.baseURL = 'http://bj.memorywzd.tk:9308';

const Option = Select.Option;

export default function History() {
    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);

    const [chartData, setChartData] = useState([]);
    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const [field, setField] = useState(1);

    const unit = useSelector((state: any) => state.unit);
    const factor = useSelector((state: any) => state.factor);
    const adder = useSelector((state: any) => state.adder);

    const userID = useStorage('userId')[0];

    const getChartData = async () => {
        const response = await axios
            .get('/api/dev/history', {
                params: {
                    areaID : area,
                    nodeID : node,
                    data: field,
                },
            })
        response.data.forEach((item) => {
            item.name = unit[field - 1];
            item.count = getUnit(item.count, factor[field - 1], adder[field - 1]);
        })
        setChartData(response.data);
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
                        {unit.map((option, index) => (
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