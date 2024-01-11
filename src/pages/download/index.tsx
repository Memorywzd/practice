import React, {useEffect, useState} from 'react';
import {Select, Card, Message, Space, Button, Grid, DatePicker, Radio } from '@arco-design/web-react';
import axios from "axios";
import fileDownload from 'js-file-download';
import useStorage from "@/utils/useStorage";

const Option = Select.Option;
const { RangePicker } = DatePicker;

const api = 'http://bj.memorywzd.tk:9308';
export default function History() {

    const [areas, setAreas] = useState([]);
    const [nodes, setNodes] = useState([]);

    const [area, setArea] = useState(1);
    const [node, setNode] = useState(1);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const userID = useStorage('userId')[0];

    const downloadData = async () => {
        const response = await axios
            .get(api + '/api/dev/download', {
                params: {
                    areaID : area,
                    nodeID : node,
                    timeOfStart : startTime,
                    timeOfEnd : endTime,
                },
                responseType: 'blob',
            })
            .then((res) => {
                console.log(res);
                fileDownload(res.data, 'data.csv');
            });
    }
    const downloadData1 = async () => {
        const response = await axios
            .get(api + '/api/dev/download', {
                params: {
                    areaID : area,
                    nodeID : node,
                    timeOfStart : startTime,
                    timeOfEnd : endTime,
                    type: 1,
                },
                responseType: 'blob',
            })
            .then((res) => {
                console.log(res);
                fileDownload(res.data, 'data.xlsx');
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

    const onChange = (date, dateString) => {
        setStartTime(date[0]);
        setEndTime(date[1]);
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
                    <RangePicker
                        style={{width: 360}}
                        showTime={{
                            defaultValue: ['00:00:00', '00:00:00'],
                            format: 'HH:mm:ss',
                        }}
                        format='YYYY-MM-DD HH:mm:ss'
                        onChange={onChange}
                    />
                    <Button onClick={downloadData} type='primary'>下载csv</Button>
                    <Button onClick={downloadData1} type='primary'>下载xlsx</Button>
                </Space>
            </Card>
        </div>
    );
}