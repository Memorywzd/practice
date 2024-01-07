import React, {useEffect, useState} from 'react';
import {Select, Card, Message, Space, Button, Grid, DatePicker, Radio } from '@arco-design/web-react';
import axios from "axios";

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

    function exportFile (content, customFileName, type) {
        const blob = new Blob([content], {type: type || 'application/vnd.ms-excel'}) // 默认excel
        const filename = content.filename || customFileName
        const URL = window.URL || window.webkitURL
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = objectUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
    }
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
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const filename = 'data.xlsx';
                const a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', filename);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
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
                    <Button onClick={downloadData} type='primary'>下载</Button>
                </Space>
            </Card>
        </div>
    );
}