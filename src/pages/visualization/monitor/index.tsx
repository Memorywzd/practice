import {Table, Grid, Switch, Form, Radio} from '@arco-design/web-react';
import React from 'react';
import './mock';
import axios from "axios";
import useStorage from "@/utils/useStorage";

export default function Monitor() {
    const temp = localStorage.getItem('temperature') === 'Celsius' ? '℃' : '℉';
    const humidity = localStorage.getItem('humidity') === 'percent' ? '%' : 'g/m3';
    const pressure = localStorage.getItem('pressure') === 'kPa' ? 'kPa' : 'Pa';
    const light = localStorage.getItem('light') === 'lux' ? 'lux' : 'cd/m2';
    const co2 = localStorage.getItem('co2') === 'ppm' ? 'ppm' : 'mg/m3';
    const windSpeed = localStorage.getItem('windSpeed') === 'm/s' ? 'm/s' : 'km/h';
    const soilHumidity = localStorage.getItem('soilHumidity') === 'percent' ? '%' : 'g/m3';
    const ph = localStorage.getItem('ph') === 'pH' ? 'pH' : 'mol/L';
    const visibility = localStorage.getItem('visibility') === 'm' ? 'm' : 'km';

    const columns = [
        {
            title: '设备ID',
            dataIndex: 'devID',
        },
        {
            title: '区域ID',
            dataIndex: 'areaID',
        },
        {
            title: '结点ID',
            dataIndex: 'nodeID',
        },
        {
            title: '时间',
            dataIndex: 'time',
        },
        {
            title: '温度/' + temp,
            dataIndex: 'temperature',
        },
        {
            title: '湿度/' + humidity,
            dataIndex: 'humidity',
        },
        {
            title: '大气压/' + pressure,
            dataIndex: 'pressure',
        },
        {
            title: '光照强度/' + light,
            dataIndex: 'light',
        },
        {
            title: '二氧化碳浓度/' + co2,
            dataIndex: 'co2',
        },
        {
            title: '风速/' + windSpeed,
            dataIndex: 'windSpeed',
        },
        {
            title: '土壤湿度/' + soilHumidity,
            dataIndex: 'soilHumidity',
        },
        {
            title: '水质pH值/' + ph,
            dataIndex: 'ph',
        },
        {
            title: '能见度/' + visibility,
            dataIndex: 'visibility',
        },
    ];

    //使用 axios.get('/api/datagrams') 传入参数recordID、devID，获取对应的数据
    //每秒刷新一次
    const [data, setData] = React.useState([]);
    const getTableData = async () => {
        const {data} = await axios
            .get('/api/datagrams')
        setData(data);
    }
    React.useEffect(() => {
        getTableData();
        const timer = setInterval(() => {
            getTableData();
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Table
            columns={columns}
            data={data}
            border={true}
            hover={true}
            borderCell={true}
            showHeader={true}
            style={{marginTop: 10,}}
            pagination={{pageSize: 5,}}
        />
    );
}
