import React, {useState} from 'react';
import {Select, Card, Message, Space, Button, Grid, DatePicker, Radio } from '@arco-design/web-react';
import PeriodLine from '@/components/Chart/period-legend-line';

const { Row, Col } = Grid;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const areas = ['区域1', '区域2', '区域3', '区域4'];
const nodes = ['结点1', '结点2', '结点3', '结点4'];
const fields = ['温度', '湿度', '大气压', '光照强度', '二氧化碳浓度', '风速', '土壤湿度', '水质pH值', '能见度'];

function onSelect(dateString, date) {
    console.log('onSelect', dateString, date);
}

function onChange(dateString, date) {
    console.log('onChange: ', dateString, date);
}

export default function History() {

    const [chartData, setChartData] = useState([]);
    return (
        <div>
            <Card>
                <Space size='large'>
                    <Select
                        placeholder='选择区域号'
                        style={{width: 154}}
                        onChange={(value) =>
                            Message.info({
                                content: `You select ${value}.`,
                                showIcon: true,
                            })
                        }
                    >
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
                    <RangePicker
                        style={{width: 360}}
                        showTime={{
                            defaultValue: ['00:00', '04:05'],
                            format: 'HH:mm',
                        }}
                        format='YYYY-MM-DD HH:mm'
                        onChange={onChange}
                        onSelect={onSelect}
                    />
                    <Button type='primary'>下载</Button>
                </Space>
            </Card>
        </div>
    );
}